import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "kvg-language";
const LanguageContext = createContext(null);

function readStoredLanguage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === "np" || stored === "en" ? stored : "en";
    } catch {
        return "en";
    }
}

/**
 * Wraps the app once (in main.jsx) and holds the single source of truth
 * for which language is active. Defaults to English; persists the user's
 * choice in localStorage so it survives a reload, but never a server
 * round-trip or full page navigation — switching is instant everywhere.
 */
export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(readStoredLanguage);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, language);
        } catch {
            // Private browsing / storage disabled — language still works
            // for this session, it just won't persist across reloads.
        }
        document.documentElement.lang = language === "np" ? "ne" : "en";
    }, [language]);

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            toggleLanguage: () => setLanguage((l) => (l === "en" ? "np" : "en")),
        }),
        [language]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return ctx;
}
