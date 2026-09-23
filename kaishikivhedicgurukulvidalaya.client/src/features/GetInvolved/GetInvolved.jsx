import { useState } from "react";
import { INVOLVEMENT_SCHEMES, email } from "../../data/constants";
import useInView from "../../hooks/useInView";
import { sendWhatsAppMessage } from "../../api/whatsapp";
import { useTranslation } from "../../hooks/useTranslation";
import { translations } from "../../i18n/translations";
import "./GetInvolved.css";

/* Maps constants.js scheme.id (snake_case) -> translations.js getInvolvedPage.schemes key (camelCase) */
const SCHEME_KEY = {
    birthday: "birthday",
    guardian: "guardian",
    vastra: "vastra",
    goseva: "goseva",
    festival: "festival",
    brahman_bhojan: "brahmanBhojan",
};

/* ── Booking Modal ───────────────────────── */
function BookingModal({ scheme, onClose }) {
    const { t, language } = useTranslation();
    const tr = translations[language] || translations.en;
    const copy = tr.getInvolvedPage.schemes[SCHEME_KEY[scheme.id]];

    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

    const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

    const handleSubmit = async () => {
        if (!form.name || !form.email) {
            alert(t("getInvolvedPage.modal.validationNameEmail"));
            return;
        }
        else if (!form.phone) {
            alert(t("getInvolvedPage.modal.validationPhone"));
            return;
        }
        try {
            await sendWhatsAppMessage(
                `Hi, I am ${form.name}. I would like to inquire about ${scheme.title}.` +
                `\nEmail: ${form.email}\nPhone / WhatsApp: ${form.phone}\nMessage: ${form.message}`
            );
            setSubmitted(true);
        } catch (error) {
            alert(error.message);
        }
    };

    const successTitle = t("getInvolvedPage.modal.successTitle").replace("{name}", form.name);
    const [successBodyBefore, successBodyAfter] = t("getInvolvedPage.modal.successBody").split("{email}");

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${copy.title} — seva enrolment`}>
                <button className="modalClose" onClick={onClose} aria-label={t("getInvolvedPage.modal.close")}>✕</button>

                {!submitted ? (
                    <>
                        <div className="modalIcon">{scheme.icon}</div>
                        <div className="modalTitle">{copy.title}</div>
                        <p className="modalSub">
                            {t("getInvolvedPage.modal.subtitle")}
                        </p>

                        <div className="f-group">
                            <label className="f-label" htmlFor="gi-name">{t("getInvolvedPage.modal.labelName")}</label>
                            <input id="gi-name" className="f-input" placeholder={t("getInvolvedPage.modal.placeholderName")} value={form.name} onChange={update("name")} />
                        </div>
                        <div className="f-group">
                            <label className="f-label" htmlFor="gi-email">{t("getInvolvedPage.modal.labelEmail")}</label>
                            <input id="gi-email" type="email" className="f-input" placeholder={t("getInvolvedPage.modal.placeholderEmail")} value={form.email} onChange={update("email")} />
                        </div>
                        <div className="f-group">
                            <label className="f-label" htmlFor="gi-phone">{t("getInvolvedPage.modal.labelPhone")}</label>
                            <input id="gi-phone" className="f-input" placeholder={t("getInvolvedPage.modal.placeholderPhone")} value={form.phone} onChange={update("phone")} />
                        </div>
                        <div className="f-group">
                            <label className="f-label" htmlFor="gi-message">{t("getInvolvedPage.modal.labelMessage")}</label>
                            <textarea
                                id="gi-message"
                                className="f-input"
                                placeholder={t("getInvolvedPage.modal.placeholderMessage")}
                                value={form.message}
                                onChange={update("message")}
                            />
                        </div>

                        <button
                            className="btn btn-primary giSubmit"
                            onClick={handleSubmit}
                        >
                            {t("getInvolvedPage.modal.submit")}
                        </button>
                        <p className="danaNote">
                            {t("getInvolvedPage.modal.danaNote")}
                        </p>
                    </>
                ) : (
                    <div className="modalSuccess">
                        <div className="modalSuccessMark">🙏</div>
                        <h3 className="successTitle">{successTitle}</h3>
                        <p>{successBodyBefore}<strong>{form.email}</strong>{successBodyAfter}</p>
                        <div className="successDeva">शुभमस्तु · सर्वे भवन्तु सुखिनः</div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ── Scheme Card ─────────────────────────── */
function SchemeCard({ scheme, openModal }) {
    const { t, language } = useTranslation();
    const tr = translations[language] || translations.en;
    const copy = tr.getInvolvedPage.schemes[SCHEME_KEY[scheme.id]];

    return (
        <div className={`card card_${scheme.badgeColor}`}>
            {/* Badge */}
            <div className={`badge badge_${scheme.badgeColor}`}>
                {copy.badge}
            </div>

            {/* Head */}
            <div className="cardHead">
                <div className="cardIcon">{scheme.icon}</div>
                <div className="cardDeva">{scheme.deva}</div>
                <h3 className="cardTitle">{copy.title}</h3>
                <p className="cardTagline">{copy.tagline}</p>
            </div>

            {/* Divider */}
            <div className="cardRule" />

            {/* Description */}
            <p className="cardDesc">{copy.desc}</p>

            {/* CTA — always active; the ashram discusses the amount when contacted */}
            <button
                className={`btn giCta ${scheme.badgeColor === "earth" ? "btn-earth" : "btn-primary"}`}
                onClick={() => openModal(scheme)}
            >
                {scheme.icon} {t("getInvolvedPage.participateIn").replace("{name}", copy.title.split(" ")[0])}
            </button>
        </div>
    );
}

/* ── GetInvolved Section ─────────────────── */
export default function GetInvolved() {
    const [ref, inView] = useInView();
    const [activeScheme, setActiveScheme] = useState(null);
    const { t } = useTranslation();

    return (
        <section
            id="get-involved"
            className="section giSection"
        >
            <div className="s-inner">
                {/* Header */}
                <div
                    ref={ref}
                    className={`involvedHeader reveal ${inView ? "visible" : ""}`}
                >
                    <div className="s-eyebrow">{t("getInvolvedPage.eyebrow")}</div>
                    <h2 className="s-title">
                        {t("getInvolvedPage.title")}<em>{t("getInvolvedPage.titleEm")}</em>
                    </h2>
                    <div className="rule" />
                    <p className="involvedIntro measure-body">
                        {t("getInvolvedPage.intro")}
                    </p>
                    <div className="statsRow">
                        {[
                            { num: "200+", key: "students" },
                            { num: "20+", key: "years" },
                            { num: "₹0", key: "free" },
                        ].map(({ num, key }) => (
                            <div key={key} className="stat">
                                <span className="statNum">{num}</span>
                                <span className="statLabel">{t(`getInvolvedPage.stats.${key}`)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cards grid */}
                <div className="cardsGrid">
                    {INVOLVEMENT_SCHEMES.map((scheme, i) => {
                        const row = Math.floor(i / 2);
                        const delayClass = row === 0 ? "" : `reveal-delay-${Math.min(row, 3)}`;
                        return (
                            <div
                                key={scheme.id}
                                className={["reveal", delayClass, inView ? "visible" : ""].filter(Boolean).join(" ")}
                            >
                                <SchemeCard scheme={scheme} openModal={setActiveScheme} />
                            </div>
                        );
                    })}
                </div>

                {activeScheme && (
                    <BookingModal
                        scheme={activeScheme}
                        onClose={() => setActiveScheme(null)}
                    />
                )}

                {/* Bottom note */}
                <div className="bottomNote">
                    <span className="bottomNoteDeva">
                        सर्वे भवन्तु सुखिनः
                    </span>
                    <p>
                        {t("getInvolvedPage.bottomNote")}
                    </p>
                    <a
                        href={`mailto:${email}`}
                        className="btn btn-outline giOtherWays"
                    >
                        {t("getInvolvedPage.otherWaysToSupport")}
                    </a>
                </div>
            </div>
        </section>
    );
}
