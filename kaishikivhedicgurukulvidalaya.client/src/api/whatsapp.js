import { reportError } from './errorLogger';

const ENDPOINT = '/api/whatsapp/messages';

export async function sendWhatsAppMessage(message) {
    let response;
    try {
        response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
    } catch (error) {
        // The request never reached the server (offline, server down). The form still shows its alert.
        reportError(error, { kind: 'api', source: `POST ${ENDPOINT}` });
        throw error;
    }

    if (!response.ok) {
        const error = await response.json().catch(() => null);
        const failure = new Error(error?.detail || error?.error || 'Unable to send the WhatsApp message.');
        // Only the status is reported, never the message the visitor typed.
        reportError(failure, { kind: 'api', source: `POST ${ENDPOINT} -> ${response.status}` });
        throw failure;
    }
}
