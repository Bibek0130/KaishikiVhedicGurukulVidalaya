/**
 * Browser-side error reporting.
 *
 * Anything that goes wrong in a visitor's browser (an uncaught exception, a rejected promise, a React
 * render crash, a photo that will not load, a rejected Google Maps key, a failed API call) is posted to
 * /api/client-errors. The server writes it to its log, next to the server's own errors.
 *
 * A report holds the error text, the page path, language, viewport size and browser string. It never
 * holds form contents or anything a visitor typed.
 */

const ENDPOINT = '/api/client-errors';

// Per page load: plenty to diagnose a problem, too few for a stuck page to flood the server.
const MAX_REPORTS = 10;

// Browser noise that is not a bug in this site.
const IGNORED_MESSAGES = [
    /ResizeObserver loop/i,
    /^(Uncaught )?Script error\.?$/i, // cross-origin script: the browser withholds the details
    /^(Uncaught )?AbortError/i,       // a request the page cancelled on purpose
];
const EXTENSION_URL = /(chrome|moz|safari|safari-web)-extension:/i; // errors thrown by the visitor's browser extensions

// A failed image or script is only worth a report when it is ours or comes from Cloudinary.
const TRUSTED_HOSTS = new Set([location.hostname, 'res.cloudinary.com']);

const sentFingerprints = new Set();
let sentCount = 0;
let busy = false;

const clip = (value, max) => {
    const text = String(value ?? '');
    return text.length > max ? `${text.slice(0, max)}…` : text;
};

function describe(error) {
    if (error instanceof Error) return { message: error.message || error.name, stack: error.stack || '' };
    if (typeof error === 'string') return { message: error, stack: '' };
    try {
        return { message: JSON.stringify(error) ?? String(error), stack: '' };
    } catch {
        return { message: String(error), stack: '' };
    }
}

/**
 * Sends one error to the server log. Safe to call from anywhere: it never throws, ignores known
 * browser noise, sends each distinct error once per page load, and stops after MAX_REPORTS.
 *
 * context.kind: 'error' | 'unhandledrejection' | 'react' | 'resource' | 'api' | 'maps'
 */
export function reportError(error, context = {}) {
    if (busy) return;
    busy = true;
    try {
        const { message, stack } = describe(error);
        const kind = context.kind || 'error';
        const source = context.source || '';

        if (IGNORED_MESSAGES.some((pattern) => pattern.test(message))) return;
        if (EXTENSION_URL.test(source) || EXTENSION_URL.test(stack)) return;

        const fingerprint = `${kind}|${message}|${source}`;
        if (sentFingerprints.has(fingerprint) || sentCount >= MAX_REPORTS) return;
        sentFingerprints.add(fingerprint);
        sentCount += 1;

        const fullStack = [stack, context.componentStack && `Component stack:${context.componentStack}`]
            .filter(Boolean)
            .join('\n');

        const body = JSON.stringify({
            kind,
            message: clip(message, 500),
            stack: clip(fullStack, 3000),
            source: clip(source, 300),
            page: location.pathname,
            lang: document.documentElement.lang,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            userAgent: navigator.userAgent,
        });

        // keepalive lets the report finish even if the visitor navigates away or closes the tab.
        fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
            keepalive: true,
        }).catch(() => { /* the server may be the thing that is down */ });
    } catch {
        // Reporting must never be the thing that breaks the page.
    } finally {
        busy = false;
    }
}

function reportFailedResource(element) {
    const tag = element.tagName.toLowerCase();
    if (tag !== 'img' && tag !== 'script' && tag !== 'link') return;

    let url;
    try {
        url = new URL(element.currentSrc || element.src || element.href || '', location.href);
    } catch {
        return;
    }
    if (!TRUSTED_HOSTS.has(url.hostname)) return;

    // Origin and path only: a query string could carry anything.
    reportError(new Error(`Failed to load <${tag}>`), { kind: 'resource', source: `${url.origin}${url.pathname}` });
}

/** Call once at startup, before the app renders. */
export function initErrorLogging() {
    // Capture phase on purpose: a failed <img> or <script> fires `error` on the element itself and the
    // event does not bubble up to window.
    window.addEventListener('error', (event) => {
        const element = event.target;
        if (element && element !== window && element.nodeType === 1) {
            reportFailedResource(element);
            return;
        }
        reportError(event.error ?? event.message, {
            kind: 'error',
            source: event.filename ? `${event.filename}:${event.lineno}:${event.colno}` : '',
        });
    }, true);

    window.addEventListener('unhandledrejection', (event) => {
        reportError(event.reason, { kind: 'unhandledrejection' });
    });

    // Google Maps calls this global when it rejects the API key (wrong website, billing off, restricted).
    window.gm_authFailure = () => {
        reportError(new Error('Google Maps rejected the API key: check its allowed websites and billing'), { kind: 'maps' });
    };
}
