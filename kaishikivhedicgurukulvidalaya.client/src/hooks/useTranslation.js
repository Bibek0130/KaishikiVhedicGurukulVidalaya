import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

/**
 * t("admission.hero.title") walks the dot-separated path into the active
 * language's tree in src/i18n/translations.js. Falls back to English if a
 * key is missing in the current language, then to the key itself if it's
 * missing everywhere — so a gap in translation coverage degrades to
 * visible-but-wrong text rather than a crash.
 */
function resolve(dict, path) {
    return path.split(".").reduce((node, segment) => (node && node[segment] !== undefined ? node[segment] : undefined), dict);
}

export function useTranslation() {
    const { language, setLanguage, toggleLanguage } = useLanguage();
    const active = translations[language] || translations.en;

    function t(path) {
        const value = resolve(active, path);
        if (value !== undefined) return value;
        const fallback = resolve(translations.en, path);
        if (fallback !== undefined) return fallback;
        return path;
    }

    return { t, language, setLanguage, toggleLanguage };
}
