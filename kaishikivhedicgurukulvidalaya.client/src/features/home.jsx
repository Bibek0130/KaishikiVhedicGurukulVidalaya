/**
 * home.jsx — All content sections except Hero, Gallery, GetInvolved.
 * Each section is a named export so the main App can import selectively.
 */

import { useState } from "react";
import useInView from "../hooks/useInView";
import { Link } from "react-router-dom";
import {
    ACTIVITIES, BELIEFS, RESOURCES,
    ASHRAM_FEATURES, ASHRAM_TAGS, CONTACT_DETAILS,
    mapUrl, GALLERY_ITEMS,
} from "../data/constants";
import GoogleMap from "../components/Map";
import { sendWhatsAppMessage } from "../api/whatsapp";
import { useTranslation } from "../hooks/useTranslation";
import { translations } from "../i18n/translations";
import "./home.css"

// Real ashram photography, sourced from the gallery data — no decorative
// placeholders. Two distinct shots so About and The Ashram don't repeat.
const ABOUT_IMAGE = GALLERY_ITEMS.find((g) => g.id === 5);   // Temple courtyard
const ASHRAM_IMAGE = GALLERY_ITEMS.find((g) => g.id === 3);  // Agnihotra fire ritual

const ACT_ACCENT = { saff: "var(--saff)", earth: "var(--earth)", bark: "var(--bark)" };

// Single-glyph Devanagari icons for the About "values" row — authentic
// Sanskrit, not translated copy, so these stay hardcoded per index.
const ABOUT_VALUES_DEVA = ["ज्ञ", "तप", "पूज"];

// ACTIVITIES (constants.js) and translations.activities.items are both
// ordered sanskrit / vedic / puja / yoga / research / seva — map by index.
const ACTIVITY_KEYS = ["sanskrit", "vedic", "puja", "yoga", "research", "seva"];

// CONTACT_DETAILS (constants.js) is ordered address / email / phone / puja.
const CONTACT_LABELS = ["address", "email", "phone", "puja"];

/* ══════════════════════════════════════════
   ABOUT
══════════════════════════════════════════ */
export function About() {
    const [ref, inView] = useInView();
    const v = (d = "") => `${inView ? "reveal visible" : "reveal"} ${d}`.trim();
    const { t, language } = useTranslation();
    const tr = translations[language] || translations.en;

    return (
        <section id="about" className="section" style={{ background: "var(--cream)" }}>
            <div className="s-inner about-grid">
                <div ref={ref} className={v()}>
                    <div className="about-img-wrap">
                        <div className="about-img-frame" />
                        <div className="about-photo">
                            <img
                                src={ABOUT_IMAGE.src}
                                alt={ABOUT_IMAGE.caption}
                                className="about-photo-img"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                <div className={v("reveal-delay-1")}>
                    <div className="s-eyebrow">{t("about.eyebrow")}</div>
                    <h2 className="s-title">{t("about.title")}<br /><em>{t("about.titleEm")}</em>{t("about.titleSuffix")}</h2>
                    <div className="rule" />
                    <p className="body-p measure-body">{t("about.p1")}</p>
                    <p className="body-p mt14 measure-body">{t("about.p2")}</p>
                    <div className="about-values">
                        {(tr.about.values || []).map(({ title, desc }, i) => (
                            <div key={title} className="val-row">
                                <div className="val-icon">{ABOUT_VALUES_DEVA[i]}</div>
                                <div><div className="val-title">{title}</div><div className="val-desc">{desc}</div></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   ACTIVITIES — a running index of practices,
   not a card grid.
══════════════════════════════════════════ */
export function Activities() {
    const [ref, inView] = useInView();
    const v = (d = "") => `${inView ? "reveal visible" : "reveal"} ${d}`.trim();
    const { t, language } = useTranslation();
    const tr = translations[language] || translations.en;
    return (
        <section id="activities" className="section act-section">
            <div className="s-inner">
                <div ref={ref} className={v()} style={{ maxWidth: 600, marginBottom: 52 }}>
                    <div className="s-eyebrow">{t("activities.eyebrow")}</div>
                    <h2 className="s-title">{t("activities.title")}<em>{t("activities.titleEm")}</em></h2>
                    <div className="rule" />
                    <p className="body-p">{t("activities.intro")}</p>
                </div>
                <div className="act-list">
                    {ACTIVITIES.map((act, i) => {
                        const item = tr.activities.items[ACTIVITY_KEYS[i]] || {};
                        return (
                            <div key={act.title} className={`act-row ${v(["", "reveal-delay-1", "reveal-delay-2"][i % 3])}`}>
                                <span className="act-deva-lg" style={{ color: ACT_ACCENT[act.accent] }}>{act.deva}</span>
                                <div className="act-copy">
                                    <div className="act-title">{item.title}</div>
                                    <p className="act-desc measure-body">{item.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   BELIEVES — single-column, manuscript-style
   list with one continuous rule down the left.
══════════════════════════════════════════ */
export function Believes() {
    const [ref, inView] = useInView();
    const v = (d = "") => `${inView ? "reveal visible" : "reveal"} ${d}`.trim();
    const { t, language } = useTranslation();
    const tr = translations[language] || translations.en;
    return (
        <section id="believes" className="section" style={{ background: "var(--ink)" }}>
            <div className="s-inner" ref={ref}>
                <div className={`${v()} believes-head`}>
                    <div>
                        <div className="s-eyebrow" style={{ color: "var(--saff-lt)" }}>{t("believes.eyebrow")}</div>
                        <h2 className="s-title" style={{ color: "var(--cream)" }}>{t("believes.title")}<em style={{ color: "var(--saff-warm)" }}>{t("believes.titleEm")}</em></h2>
                        <div className="rule" style={{ background: "var(--saff-warm)" }} />
                    </div>
                    <p className="believes-intro">{t("believes.intro")}</p>
                </div>
                <div className={`${v("reveal-delay-1")} believes-list`}>
                    {BELIEFS.map(({ num }, i) => {
                        const item = tr.believes.items[i] || {};
                        return (
                            <div key={num} className="belief-row">
                                <span className="belief-num">{num}</span>
                                <div className="belief-copy">
                                    <div className="belief-title">{item.title}</div>
                                    <p className="belief-text measure-body">{item.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   RESOURCES
══════════════════════════════════════════ */
const TYPE_BG = { saff: "var(--saff)", earth: "var(--earth)", bark: "var(--bark)" };

export function Resources() {
    const [ref, inView] = useInView();
    const [hovered, setHovered] = useState(null);
    const { t, language } = useTranslation();
    const tr = translations[language] || translations.en;
    return (
        <section id="resources" className="resources-layout">
            <div className="res-sidebar">
                <div className="s-eyebrow" style={{ color: "rgba(255,255,255,.55)" }}>{t("resources.eyebrow")}</div>
                <h2 className="s-title" style={{ color: "#fff" }}>{t("resources.title")}</h2>
                <div className="rule" style={{ background: "rgba(255,255,255,.35)" }} />
                <p className="res-sidebar-p">{t("resources.sidebarP")}</p>
            </div>
            <div ref={ref} className={`res-content ${inView ? "reveal visible" : "reveal"}`}>
                {RESOURCES.map((r, i) => {
                    const title = tr.resources.items[i]?.title || r.title;
                    return (
                        <div key={i} className="res-row" style={{ background: hovered === i ? "var(--saff-pale)" : "transparent" }}
                            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                            <span className="res-type-badge" style={{ background: TYPE_BG[r.typeColor] ?? "var(--earth)" }}>{r.type}</span>
                            <span className="res-name">{title}</span>
                            <a href={r.href} className="res-link" target="_blank" rel="noopener noreferrer">{t("common.downloadArrow")}</a>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   THE ASHRAM
══════════════════════════════════════════ */
export function TheAshram() {
    const [ref, inView] = useInView();
    const v = (d = "") => `${inView ? "reveal visible" : "reveal"} ${d}`.trim();
    const { t, language } = useTranslation();
    const tr = translations[language] || translations.en;
    return (
        <section id="the-ashram" className="section" style={{ background: "var(--earth-pale)", borderTop: "1px solid rgba(90,120,69,.12)" }}>
            <div className="s-inner">
                <div ref={ref} className={v()} style={{ maxWidth: 600, marginBottom: 52 }}>
                    <div className="s-eyebrow">{t("theAshram.eyebrow")}</div>
                    <h2 className="s-title">{t("theAshram.title")}<em>{t("theAshram.titleEm")}</em></h2>
                    <div className="rule" />
                    <p className="body-p">{t("theAshram.intro")}</p>
                </div>
                <div className="ashram-grid">
                    <div className={v()}>
                        <div className="ashram-photo">
                            <img
                                src={ASHRAM_IMAGE.src}
                                alt={ASHRAM_IMAGE.caption}
                                className="ashram-photo-img"
                                loading="lazy"
                            />
                        </div>
                        <div className="ashram-quote">
                            <blockquote className="measure-quote">{t("theAshram.quote")}</blockquote>
                            <cite>— {t("theAshram.quoteCite")}</cite>
                        </div>
                    </div>
                    <div className={v("reveal-delay-1")}>
                        <ul className="ashram-list">
                            {ASHRAM_FEATURES.map((f, i) => (
                                <li key={f}><div className="ashram-bullet" />{tr.theAshram.features[i] ?? f}</li>
                            ))}
                        </ul>
                        <div className="ashram-tags">
                            {ASHRAM_TAGS.map((tag, i) => (
                                <span key={tag.label} className="ashram-tag">{tr.theAshram.tags[i] ?? tag.label}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   FOUNDER
══════════════════════════════════════════ */
export function Founder() {
    const [ref, inView] = useInView();
    const v = (d = "") => `${inView ? "reveal visible" : "reveal"} ${d}`.trim();
    const { t, language } = useTranslation();
    const tr = translations[language] || translations.en;
    return (
        <section id="founder" className="section" style={{ background: "var(--saff-pale)", borderTop: "1px solid var(--border-soft)" }}>
            <div className="s-inner">
                <div ref={ref} className="founder-grid">
                    <div className={`${v()} founder-portrait`}>
                        <div className="founder-img">
                            <img
                                src="https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781426103/ram_chandra_timalsin_manxy9.jpg"
                                alt="Acharya Ram Chandra Timalsina, founder of the gurukul"
                                className="founder-photo-img"
                                loading="lazy"
                            />
                            <div className="founder-img-bar" />
                        </div>
                        <div className="founder-name">{t("founder.name")}</div>
                        <div className="founder-role">{t("founder.role")}</div>
                        <div className="founder-badge">{t("founder.badge")}</div>
                        <div className="founder-lineage">
                            <div className="founder-lineage-label">{t("founder.lineageLabel")}</div>
                            {t("founder.lineageLine1")}<br />{t("founder.lineageLine2")}
                        </div>
                    </div>
                    <div className={v("reveal-delay-1")}>
                        <div className="s-eyebrow">{t("founder.eyebrow")}</div>
                        <h2 className="s-title">{t("founder.title")}<em>{t("founder.titleEm")}</em></h2>
                        <div className="rule" />
                        <p className="founder-pull measure-quote">{t("founder.pullQuote")}</p>
                        {(tr.founder.bio || []).map((p, i) => <p key={i} className="founder-bio measure-body">{p}</p>)}
                        <div className="founder-verse">
                            <p className="founder-verse-deva">गुरुर्ब्रह्मा गुरुर्विष्णुर्गुरुर्देवो महेश्वरः ।<br />गुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः ॥</p>
                            <p className="founder-verse-en">{t("founder.verseTranslation")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   CONTACT
══════════════════════════════════════════ */
export function Contact() {
    const [ref, inView] = useInView();
    const v = (d = "") => `${inView ? "reveal visible" : "reveal"} ${d}`.trim();
    const { t, language } = useTranslation();
    const tr = translations[language] || translations.en;
    const [form, setForm] = useState({ name: "", email: "", phone: "", purpose: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const upd = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
    const submit = async () => {
        if (!form.name || !form.email) { alert(t("contact.validationAlert")); return; }
        try {
            await sendWhatsAppMessage(
                `Hi, I am ${form.name}. I would like to inquire about ${form.purpose}.` +
                `\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`
            );
            setSubmitted(true);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <section id="contact" style={{ padding: 0, width: "100%" }}>
            <div className="contact-layout">
                <div ref={ref} className="contact-info-side">
                    <div className="s-eyebrow" style={{ color: "var(--saff-lt)" }}>{t("contact.eyebrow")}</div>
                    <h2 className="s-title" style={{ color: "var(--cream)" }}>{t("contact.title")}<em style={{ color: "var(--saff-warm)" }}>{t("contact.titleEm")}</em></h2>
                    <div className="rule" style={{ background: "var(--saff-warm)" }} />
                    <p className="contact-intro measure-body">{t("contact.intro")}</p>
                    {CONTACT_DETAILS.map(({ icon, value, sub }, i) => {
                        const key = CONTACT_LABELS[i];
                        const label = t(`contact.details.${key}.label`);
                        const displayValue = key === "address" ? t("contact.details.address.value") : value;
                        const displaySub = sub ? t(`contact.details.${key}.sub`) : null;
                        return (
                            <div key={label} className="c-detail">
                                <div className="c-icon">{icon}</div>
                                <div>
                                    <div className="c-label">{label}</div>
                                    <div className="c-val">{displayValue}</div>
                                    {displaySub && <div className="c-sub">{displaySub}</div>}
                                </div>
                            </div>
                        );
                    })}
                    {/*  Google maps section*/}
                    <GoogleMap />
                    <a
                        href={mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-gold"
                        style={{ display: "block", textAlign: "center", marginTop: "var(--space-4)", textDecoration: "none" }}
                    >
                        {t("contact.openInMaps")}
                    </a>
                </div>

                <div className={`contact-form-side ${v("reveal-delay-1")}`}>
                    <div className="s-eyebrow">{t("contact.formEyebrow")}</div>
                    <h2 className="contact-form-title">{t("contact.formTitle")}<br /><em style={{ color: "var(--saff)" }}>{t("contact.formTitleEm")}</em></h2>
                    <div className="rule" />
                    <p className="contact-form-intro">{t("contact.formIntro")}</p>

                    {!submitted ? (
                        <>
                            <div className="f-group">
                                <label className="f-label">{t("contact.labelName")}</label>
                                <input className="f-input" placeholder={t("contact.placeholderName")} value={form.name} onChange={upd("name")} />
                            </div>
                            <div className="f-row-2">
                                <div className="f-group" style={{ marginBottom: 0 }}>
                                    <label className="f-label">{t("contact.labelEmail")}</label>
                                    <input type="email" className="f-input" placeholder={t("contact.placeholderEmail")} value={form.email} onChange={upd("email")} />
                                </div>
                                <div className="f-group" style={{ marginBottom: 0 }}>
                                    <label className="f-label">{t("contact.labelPhone")}</label>
                                    <input className="f-input" placeholder={t("contact.placeholderPhone")} value={form.phone} onChange={upd("phone")} />
                                </div>
                            </div>
                            <div className="f-group" style={{ marginTop: 18 }}>
                                <label className="f-label">{t("contact.labelPurpose")}</label>
                                <select className="f-input" style={{ cursor: "pointer" }} value={form.purpose} onChange={upd("purpose")}>
                                    <option value="">{t("contact.purposeSelect")}</option>
                                    {(tr.contact.purposeOptions || []).map((opt) => (
                                        <option key={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="f-group">
                                <label className="f-label">{t("contact.labelMessage")}</label>
                                <textarea className="f-input" placeholder={t("contact.placeholderMessage")} value={form.message} onChange={upd("message")} />
                            </div>
                            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", borderRadius: 5, fontSize: 14, padding: 14 }} onClick={submit}>
                                {t("contact.submit")}
                            </button>
                        </>
                    ) : (
                        <div className="contact-success">
                            <div style={{ fontSize: 36, marginBottom: 12 }}>🙏</div>
                            <p>{t("contact.successLine1")}<br />{t("contact.successLine2")}</p>
                            <div style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 18, color: "var(--earth)", marginTop: 12, opacity: .65 }}>शुभमस्तु</div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
export function Footer() {
    const { t } = useTranslation();
    const FOOTER_LINKS = [
        ["/contact", "contact"],
        ["/getInvolved", "getInvolved"],
        ["/gallery", "gallery"],
        ["/resources", "resources"],
    ];
    return (
        <footer className="site-footer">
            <div className="footer-om">ॐ शान्तिः शान्तिः शान्तिः</div>
            <div>{t("footer.copyright")}</div>
            <div className="footer-links">
                {FOOTER_LINKS.map(([href, key]) => (
                    <Link key={href} to={href} className="footer-link">{t(`footer.links.${key}`)}</Link>
                ))}
            </div>
        </footer>
    );
}
