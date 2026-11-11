using KaishikiVhedicGurukulVidalaya.Server.Controllers;
using Microsoft.AspNetCore.RateLimiting;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

// Logs always go to the console (Render's live log view). When an Axiom API token and dataset are set,
// they are also shipped to Axiom, so they outlive Render's short retention and container restarts.
// On Render set: Axiom__ApiToken and Axiom__Dataset (optionally Axiom__Url to override the ingest URL).
builder.Host.UseSerilog((context, services, logger) =>
{
    logger
        .MinimumLevel.Information()
        .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
        .MinimumLevel.Override("System.Net.Http.HttpClient", LogEventLevel.Warning)
        .Enrich.FromLogContext()
        .WriteTo.Console(outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss'Z'} [{Level:u3}] {SourceContext}: {Message:lj}{NewLine}{Exception}", formatProvider: System.Globalization.CultureInfo.InvariantCulture);

    var token = context.Configuration["Axiom:ApiToken"];
    var dataset = context.Configuration["Axiom:Dataset"];
    if (!string.IsNullOrWhiteSpace(token) && !string.IsNullOrWhiteSpace(dataset))
    {
        var url = context.Configuration["Axiom:Url"] ?? "https://api.axiom.co";
        logger.WriteTo.Http(
            requestUri: $"{url.TrimEnd('/')}/v1/datasets/{Uri.EscapeDataString(dataset)}/ingest",
            queueLimitBytes: 10_000_000,
            textFormatter: new Serilog.Formatting.Compact.RenderedCompactJsonFormatter(),
            batchFormatter: new Serilog.Sinks.Http.BatchFormatters.ArrayBatchFormatter(),
            httpClient: new KaishikiVhedicGurukulVidalaya.Server.AxiomHttpClient(token));
    }
});

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpClient("WhatsApp");
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Failed API calls come back as RFC 7807 JSON carrying a traceId, instead of an empty 500.
builder.Services.AddProblemDetails();

// Browsers report their own errors to /api/client-errors. That endpoint is public, so it gets one
// shared budget: a runaway page, or anyone posting junk, cannot flood the log.
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("client-errors", limiter =>
    {
        limiter.PermitLimit = 60;
        limiter.Window = TimeSpan.FromMinutes(1);
        limiter.QueueLimit = 0;
    });
});

var app = builder.Build();

// First in the pipeline so it covers everything below. Unhandled exceptions are written to the log
// (stdout) with their stack trace, and the caller gets a ProblemDetails reply.
app.UseExceptionHandler();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseRateLimiter();

// An oversized error report is refused here with a 413. Left to Kestrel it surfaces as an unhandled
// exception: a 500 and an error-level stack trace for something that is the sender's mistake.
app.Use(async (context, next) =>
{
    if (context.Request.ContentLength > ClientErrorsController.MaxBodyBytes
        && context.Request.Path.StartsWithSegments("/api/client-errors"))
    {
        context.Response.StatusCode = StatusCodes.Status413PayloadTooLarge;
        return;
    }

    await next();
});

app.UseAuthorization();

app.MapControllers();

// An unknown /api route must be a real 404. Without this, the SPA fallback below answers it with
// index.html and a 200, so a broken API call looks like it succeeded and nothing is logged.
app.MapFallback("/api/{**path}", () => Results.Problem(statusCode: StatusCodes.Status404NotFound, title: "Not found"));

app.MapFallbackToFile("/index.html");

app.Run();
