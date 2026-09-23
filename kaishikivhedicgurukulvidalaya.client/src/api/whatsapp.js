export async function sendWhatsAppMessage(message) {
    const response = await fetch('/api/whatsapp/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.detail || error?.error || 'Unable to send the WhatsApp message.');
    }
}