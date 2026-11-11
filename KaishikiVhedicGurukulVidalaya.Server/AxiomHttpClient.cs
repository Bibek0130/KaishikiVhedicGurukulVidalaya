using System.Net.Http.Headers;
using Serilog.Sinks.Http;

namespace KaishikiVhedicGurukulVidalaya.Server;

/// <summary>
/// Posts batches of log events to Axiom's ingest API, authenticating with an API token.
/// Used by the Serilog HTTP sink (see Program.cs).
/// </summary>
internal sealed class AxiomHttpClient(string apiToken) : IHttpClient
{
    private readonly HttpClient _client = new() { Timeout = TimeSpan.FromSeconds(15) };

    public void Configure(IConfiguration configuration)
    {
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiToken);
    }

    public async Task<HttpResponseMessage> PostAsync(string requestUri, Stream contentStream, CancellationToken cancellationToken)
    {
        using var content = new StreamContent(contentStream);
        content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
        return await _client.PostAsync(requestUri, content, cancellationToken);
    }

    public void Dispose() => _client.Dispose();
}
