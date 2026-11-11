using System.Globalization;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace KaishikiVhedicGurukulVidalaya.Server.Controllers;

/// <summary>
/// Receives errors that happen in visitors' browsers (uncaught exceptions, a React crash, a photo that
/// fails to load, a rejected Google Maps key, a failed API call) and writes them to the application log,
/// so they appear next to the server's own errors in the host's log viewer. Reports carry no form
/// contents and no personal data.
/// </summary>
[ApiController]
[Route("api/client-errors")]
public sealed class ClientErrorsController : ControllerBase
{
    // Also enforced up front in Program.cs, which turns a too-big request into a clean 413.
    internal const int MaxBodyBytes = 16 * 1024;

    // A short, dedicated category makes these lines easy to find: search the log for "ClientError".
    private readonly ILogger _logger;

    public ClientErrorsController(ILoggerFactory loggerFactory)
    {
        _logger = loggerFactory.CreateLogger("ClientError");
    }

    [HttpPost]
    [EnableRateLimiting("client-errors")]
    [RequestSizeLimit(MaxBodyBytes)]
    public IActionResult Report([FromBody] ClientErrorReport report)
    {
        // Everything in the report is text typed by an unknown browser and is about to land in a log:
        // cap each field and flatten line breaks, so one report can never forge extra log lines.
        var kind = Clean(report.Kind, 24).ToLowerInvariant();
        var level = kind is "error" or "unhandledrejection" or "react" ? LogLevel.Error : LogLevel.Warning;

        _logger.Log(
            level,
            "[{Kind}] {Message} | page={Page} lang={Lang} viewport={Viewport} source={Source} ua={UserAgent} stack={Stack}",
            kind.Length == 0 ? "unknown" : kind,
            Clean(report.Message, 500),
            Clean(report.Page, 200),
            Clean(report.Lang, 12),
            Clean(report.Viewport, 24),
            Clean(report.Source, 300),
            Clean(report.UserAgent, 300),
            Clean(report.Stack, 3000, lineBreak: " | "));

        return NoContent();
    }

    private static string Clean(string? value, int max, string lineBreak = " ")
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return "";
        }

        // Line breaks become the separator; any other control character (tab, ANSI escape, Unicode
        // line/paragraph separator ...) becomes a plain space.
        var lines = value.Split(['\r', '\n'], StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        var builder = new StringBuilder();
        foreach (var ch in string.Join(lineBreak, lines))
        {
            if (builder.Length >= max)
            {
                builder.Append('…');
                break;
            }

            var invisible = char.IsControl(ch)
                || char.GetUnicodeCategory(ch) is UnicodeCategory.LineSeparator or UnicodeCategory.ParagraphSeparator;
            builder.Append(invisible ? ' ' : ch);
        }

        return builder.ToString();
    }
}

// Every field is optional: a partial report is still worth logging.
public sealed record ClientErrorReport(
    string? Kind,
    string? Message,
    string? Stack,
    string? Source,
    string? Page,
    string? Lang,
    string? Viewport,
    string? UserAgent);
