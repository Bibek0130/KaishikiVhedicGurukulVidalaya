using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace KaishikiVhedicGurukulVidalaya.Server.Controllers;

[ApiController]
[Route("api/whatsapp")]
public sealed class WhatsAppController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public WhatsAppController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
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

        var payload = JsonSerializer.Serialize(new
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

        var client = _httpClientFactory.CreateClient("WhatsApp");
        using var httpRequest = new HttpRequestMessage(
            HttpMethod.Post,
            $"https://graph.facebook.com/{apiVersion}/{phoneNumberId}/messages");
        httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        httpRequest.Content = new StringContent(payload, Encoding.UTF8, "application/json");

        using var response = await client.SendAsync(httpRequest, cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            return Problem(
                detail: "WhatsApp could not accept the message.",
                statusCode: StatusCodes.Status502BadGateway);
        }

        return Ok(new { sent = true });
    }
}

public sealed record WhatsAppMessageRequest(string Message);