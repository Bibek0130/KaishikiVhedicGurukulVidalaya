using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace KaishikiVhedicGurukulVidalaya.Server.Controllers;

[ApiController]
[Route("api/whatsapp")]
public sealed class WhatsAppController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;
    private readonly ILogger<WhatsAppController> _logger;

    public WhatsAppController(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        ILogger<WhatsAppController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpPost("messages")]
    public async Task<IActionResult> SendMessage([FromBody] WhatsAppMessageRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Message) || request.Message.Length > 4096)
        {
            return BadRequest(new { error = "Message must contain between 1 and 4096 characters." });
        }

        var phoneNumberId = _configuration["WhatsApp:PhoneNumberId"];
        var accessToken = _configuration["WhatsApp:AccessToken"];
        var recipientNumber = _configuration["WhatsApp:RecipientNumber"];
        var apiVersion = _configuration["WhatsApp:ApiVersion"] ?? "v23.0";

        if (string.IsNullOrWhiteSpace(phoneNumberId) ||
            string.IsNullOrWhiteSpace(accessToken) ||
            string.IsNullOrWhiteSpace(recipientNumber))
        {
            return Problem(
                detail: "WhatsApp API is not configured on the server.",
                statusCode: StatusCodes.Status503ServiceUnavailable);
        }

        // Free-form text is only delivered inside the 24-hour customer-service window
        // (error 131047 otherwise). When a template is configured, send it instead:
        // approved templates are delivered at any time.
        var templateName = _configuration["WhatsApp:TemplateName"];
        string payload;
        if (string.IsNullOrWhiteSpace(templateName))
        {
            payload = JsonSerializer.Serialize(new
            {
                messaging_product = "whatsapp",
                recipient_type = "individual",
                to = recipientNumber,
                type = "text",
                text = new
                {
                    preview_url = false,
                    body = request.Message,
                },
            });
        }
        else
        {
            // Template variables may not contain newlines, tabs or 4+ consecutive spaces.
            var flattened = Regex.Replace(request.Message.Trim(), @"\s*[\r\n\t]+\s*", " | ");
            flattened = Regex.Replace(flattened, @" {2,}", " ");
            if (flattened.Length > 1000)
            {
                flattened = flattened[..1000];
            }

            payload = JsonSerializer.Serialize(new
            {
                messaging_product = "whatsapp",
                recipient_type = "individual",
                to = recipientNumber,
                type = "template",
                template = new
                {
                    name = templateName,
                    language = new { code = _configuration["WhatsApp:TemplateLanguage"] ?? "en" },
                    components = new[]
                    {
                        new
                        {
                            type = "body",
                            parameters = new[] { new { type = "text", text = flattened } },
                        },
                    },
                },
            });
        }

        var client = _httpClientFactory.CreateClient("WhatsApp");
        using var httpRequest = new HttpRequestMessage(
            HttpMethod.Post,
            $"https://graph.facebook.com/{apiVersion}/{phoneNumberId}/messages");
        httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        httpRequest.Content = new StringContent(payload, Encoding.UTF8, "application/json");

        try
        {
            using var response = await client.SendAsync(httpRequest, cancellationToken);
            if (!response.IsSuccessStatusCode)
            {
                // Meta's error body never contains the token; log it so the cause
                // (e.g. 131030 recipient not allow-listed) is visible server-side.
                var body = await response.Content.ReadAsStringAsync(cancellationToken);
                _logger.LogWarning("WhatsApp API rejected the message ({Status}): {Body}", (int)response.StatusCode, body);
                return Problem(
                    detail: "WhatsApp could not accept the message.",
                    statusCode: StatusCodes.Status502BadGateway);
            }
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Could not reach the WhatsApp API.");
            return Problem(
                detail: "WhatsApp could not be reached. Please try again shortly.",
                statusCode: StatusCodes.Status502BadGateway);
        }

        return Ok(new { sent = true });
    }
}

public sealed record WhatsAppMessageRequest(string Message);