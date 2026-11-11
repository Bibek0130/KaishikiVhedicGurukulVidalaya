import { Component, useEffect, useState } from 'react';
import { reportError } from '../../api/errorLogger';

/**
 * Catches errors thrown while rendering, so a broken page shows a message and a way out instead of a
 * blank screen, and sends the error to the server log.
 *
 * Its wording is kept here on purpose, not in translations.js: this has to keep working even when the
 * thing that crashed is the translation system. It reuses the .not-found styles from App.css.
 */
const COPY = {
    en: {
        text: 'Something went wrong while showing this page.',
        reload: 'Reload this page',
        home: 'Return to the Gurukul home',
    },
    ne: {
        text: 'यो पृष्ठ देखाउँदा केही समस्या आयो।',
        reload: 'यो पृष्ठ पुनः लोड गर्नुहोस्',
        home: 'गुरुकुलको गृहपृष्ठमा फर्कनुहोस्',
    },
};

// Follows <html lang>, which LanguageProvider keeps up to date, so the message switches when the visitor
// uses the navbar's language toggle. Deliberately not React context: this must also work outside the
// provider, and when the provider is what crashed.
function useDocumentLanguage() {
    const [lang, setLang] = useState(() => document.documentElement.lang);
    useEffect(() => {
        const observer = new MutationObserver(() => setLang(document.documentElement.lang));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
        return () => observer.disconnect();
    }, []);
    return lang;
}

function Fallback() {
    const copy = useDocumentLanguage() === 'ne' ? COPY.ne : COPY.en;
    return (
        <div className="not-found section" role="alert">
            <span className="not-found-mark" aria-hidden="true">ॐ</span>
            <p className="not-found-text">{copy.text}</p>
            {/* Plain links on purpose: a full page load clears whatever state caused the crash. */}
            <a className="not-found-link" href={window.location.pathname}>{copy.reload}</a>
            <a className="not-found-link" href="/home">{copy.home}</a>
        </div>
    );
}

export default class ErrorBoundary extends Component {
    state = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error, info) {
        reportError(error, { kind: 'react', componentStack: info?.componentStack });
    }

    componentDidUpdate(prevProps) {
        // Moving to another page (resetKey changes) gives the boundary a fresh start.
        if (this.state.failed && prevProps.resetKey !== this.props.resetKey) {
            this.setState({ failed: false });
        }
    }

    render() {
        return this.state.failed ? <Fallback /> : this.props.children;
    }
}
