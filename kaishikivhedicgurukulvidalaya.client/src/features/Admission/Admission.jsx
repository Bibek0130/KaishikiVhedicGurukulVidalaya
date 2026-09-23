
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useInView from '../../hooks/useInView';
import useCounter from '../../hooks/useCounter';
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { Eyebrow, STitle, Rule, OrnDivider } from '../../components/OrnamentDivider/OrnamentDivier'
import { T, ADMISSION_STEPS, FAQS, STATS, DAILY_SCHEDULE, DAILY_SCHEDULE_ACTIVITIES, DAILY_SCHEDULE_ACTIVITY_TEXT, ACADEMICS, contactNumber, email, address } from '../../data/constants'
import { Footer } from '../home'
import StatCard from '../../components/Stat/StatCard'
import { useTranslation } from '../../hooks/useTranslation'
import './AdmissionStyle.css'
import AdmissionForm from'../../components/Forms/AdmissionForm'

// Matches the STATS array order in constants.js
const STAT_KEYS = ['students', 'staff', 'cows'];

/* ─────────────────────────────────────────────────────────
   SCHEDULE STRIP — a horizontally scrollable day-strip.
   All 17 real schedule entries stay, but height is bounded to
   one card's worth regardless of count, instead of a vertical
   zigzag that ran several screens long.
───────────────────────────────────────────────────────── */
function ScheduleCard({ item, index }) {
    const [ref, inView] = useInView(0.2);
    return (
        <div
            ref={ref}
            className="tl-card"
            style={{
                borderTopColor: item.color,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity .6s ease ${Math.min(index, 8) * .05}s, transform .6s ease ${Math.min(index, 8) * .05}s`,
            }}
        >
            <div className="tl-card-time" style={{ color: item.color }}>{item.startTime} – {item.endTime}</div>
            <div className="tl-card-icon" aria-hidden="true">{item.icon}</div>
            <div className="tl-card-label">{item.label}</div>
            <p className="tl-card-desc">{item.desc}</p>
        </div>
    );
}

function ScheduleStrip({ items }) {
    return (
        <div className="tl-strip-wrap">
            <div className="tl-strip">
                {items.map((item, i) => (
                    <ScheduleCard key={i} item={item} index={i} />
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────
   ACADEMIC LEVEL — full-width editorial block (not a card;
   ACADEMICS currently holds a single level, so a 1-item grid
   is replaced with one flowing block per level).
───────────────────────────────────────────────────────── */
function AcademicLevel({ item, index, isLast }) {
    const [ref, inView] = useInView(0.12);
    const { t } = useTranslation();
    // ACADEMICS currently holds a single entry (index 0); its human-readable
    // text is translated in parallel at admission.academics.level/.tag/.subjects.
    const level = index === 0 ? t('admission.academics.level') : item.level;
    const tag = index === 0 ? t('admission.academics.tag') : item.tag;
    const subjects = index === 0 ? t('admission.academics.subjects') : item.subjects;
    return (
        <div
            ref={ref}
            style={{
                paddingBottom: isLast ? 0 : "var(--space-6)",
                marginBottom: isLast ? 0 : "var(--space-6)",
                borderBottom: isLast ? "none" : `1px solid ${T.borderSoft}`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(22px)",
                transition: `opacity .75s ease ${index * .1}s, transform .75s ease ${index * .1}s`,
            }}
        >
            <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "var(--space-4)", marginBottom: "var(--space-4)" }}>
                <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: "var(--fs-h3)", fontWeight: 400, color: T.ink, lineHeight: 1.35 }}>
                    {level}
                </h3>
                <span style={{
                    display: "inline-block",
                    background: item.accent,
                    color: T.white,
                    borderRadius: "28px",
                    padding: "4px 14px",
                    fontFamily: "'Hind', sans-serif",
                    fontSize: "var(--fs-eyebrow)", fontWeight: 500, letterSpacing: ".08em",
                    textTransform: "uppercase",
                }}>
                    {tag}
                </span>
            </div>
            <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "var(--fs-body-lg)", color: T.inkMid, lineHeight: 1.9, maxWidth: "62ch" }}>
                {subjects.map((s, j) => (
                    <span key={j}>
                        {s}
                        {j < subjects.length - 1 && (
                            <span aria-hidden="true" style={{ color: item.accent, margin: "0 .6em", opacity: .55 }}>✦</span>
                        )}
                    </span>
                ))}
            </p>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────
   STEP CARD
───────────────────────────────────────────────────────── */
function StepCard({ step, index, isLast }) {
    const [ref, inView] = useInView(0.12);
    const { t } = useTranslation();
    return (
        <div
            ref={ref}
            style={{
                background: "rgba(255,255,255,.07)",
                border: `1px solid rgba(240,223,192,.25)`,
                borderRadius: "6px",
                padding: "var(--space-6) var(--space-4)",
                textAlign: "center",
                position: "relative",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(22px)",
                transition: `opacity .75s ease ${index * .1}s, transform .75s ease ${index * .1}s, background .25s`,
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(196,123,43,.14)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.07)"}
        >
            {/* Step number badge */}
            <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: T.saff,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Hind', sans-serif", fontWeight: 500, fontSize: "var(--fs-eyebrow)",
                color: T.white, margin: "0 auto var(--space-3)",
                boxShadow: `0 2px 10px rgba(196,123,43,.4)`,
                letterSpacing: ".04em",
            }}>
                {step.step}
            </div>
            <div style={{ fontSize: "1.8rem", marginBottom: "var(--space-2)" }} aria-hidden="true">{step.icon}</div>
            <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: "var(--fs-h4)", fontWeight: 400, color: T.saffLt, marginBottom: "var(--space-2)" }}>
                {t(`admission.process.steps.${index}.title`)}
            </h3>
            <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "var(--fs-body-sm)", color: "rgba(240,223,192,.65)", lineHeight: 1.7 }}>
                {t(`admission.process.steps.${index}.desc`)}
            </p>
            {/* Connector arrow */}
            {!isLast && (
                <div aria-hidden="true" style={{
                    position: "absolute", right: "-14px", top: "50%", transform: "translateY(-50%)",
                    color: T.saffLt, fontSize: "1.1rem", opacity: .5, zIndex: 2,
                }}>›</div>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────────────────────── */
function FAQItem({ faq, index }) {
    const [open, setOpen] = useState(false);
    const [ref, inView] = useInView(0.08);
    const { t } = useTranslation();
    const panelId = `faq-panel-${index}`;
    return (
        <div
            ref={ref}
            style={{
                borderBottom: `1px solid ${T.borderSoft}`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-18px)",
                transition: `opacity .75s ease ${index * .07}s, transform .75s ease ${index * .07}s`,
            }}
        >
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: "100%", textAlign: "left",
                    background: "none", border: "none",
                    padding: "var(--space-5) 0",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-4)",
                    cursor: "pointer",
                }}
                aria-expanded={open}
                aria-controls={panelId}
            >
                <span style={{ fontFamily: "'EB Garamond', serif", fontSize: "var(--fs-h4)", fontWeight: 500, color: T.ink, lineHeight: 1.4 }}>
                    {t(`admission.faq.items.${index}.q`)}
                </span>
                <span aria-hidden="true" style={{
                    fontSize: "1.25rem", color: T.saff, flexShrink: 0,
                    transition: "transform .3s",
                    transform: open ? "rotate(45deg)" : "rotate(0)",
                    display: "inline-block",
                }}>+</span>
            </button>
            <div id={panelId} role="region" style={{ maxHeight: open ? "280px" : "0", overflow: "hidden", transition: "max-height .38s ease" }}>
                <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "var(--fs-body)", color: T.inkMid, lineHeight: 1.8, paddingBottom: "var(--space-5)" }}>
                    {t(`admission.faq.items.${index}.a`)}
                </p>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────
   REVEAL WRAPPER
───────────────────────────────────────────────────────── */
function Reveal({ children, style = {}, delay = 0 }) {
    const [ref, inView] = useInView(0.08);
    return (
        <div
            ref={ref}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(22px)",
                transition: `opacity .8s ease ${delay}s, transform .8s ease ${delay}s`,
                ...style,
            }}
        >
            {children}
        </div>
    );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function AdmissionsPage() {
    const { t, language } = useTranslation();
    const [heroVisible, setHeroVisible] = useState(false);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth < 900;

    useEffect(() => {
        const t = setTimeout(() => setHeroVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    /* ── Shared section padding (matches .section) — 8px spacing scale ── */
    const sectionPad = isMobile ? "var(--space-7) 5%" : isTablet ? "var(--space-8) 6%" : "var(--space-9) 7%";

    const buildTimeline = (lang = "en") => {
        return DAILY_SCHEDULE.map((item) => {
            const activity = DAILY_SCHEDULE_ACTIVITIES[item.id];
            const text = DAILY_SCHEDULE_ACTIVITY_TEXT[item.id][lang];

            return {
                startTime: item.start,
                endTime: item.end,
                label: text.label,
                desc: text.desc,
                icon: activity.icon,
                color: activity.color,
            };
        });
    };

    return (
        <>
            {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
            <div style={{
                background: `
          radial-gradient(ellipse 80% 55% at 50% 0%, rgba(196,123,43,.15) 0%, transparent 65%),
          linear-gradient(160deg, #1e0f04 0%, ${T.inkMid} 45%, ${T.bark} 100%)`,
                padding: isMobile ? "var(--space-8) 5% var(--space-9)" : "var(--space-9) 7% 8rem",
                textAlign: "center",
                position: "relative", overflow: "hidden",
            }}>
                <div style={{
                    position: "relative", zIndex: 1, maxWidth: "780px", margin: "0 auto",
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                    transition: "opacity .8s ease, transform .8s ease",
                }}>
                    {/* Badge */}
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "var(--space-2)",
                        background: "rgba(196,123,43,.14)", border: `1px solid rgba(240,223,192,.3)`,
                        borderRadius: "28px", padding: "5px 18px", marginBottom: "var(--space-5)",
                    }}>
                        <span style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: ".82rem", color: T.saffLt, letterSpacing: ".16em" }}>
                            ॐ विद्या ददाति विनयं
                        </span>
                        <span style={{ width: "1px", height: "12px", background: "rgba(240,223,192,.3)" }} />
                        <span style={{ fontFamily: "'Hind', sans-serif", fontSize: "var(--fs-eyebrow)", fontWeight: 500, color: T.saffLt, letterSpacing: ".12em", textTransform: "uppercase" }}>
                            {t('admission.hero.devaGlossLabel')}
                        </span>
                    </div>

                    <h1 style={{
                        fontFamily: "'EB Garamond', serif",
                        fontSize: "var(--fs-h1)",
                        fontWeight: 400, lineHeight: 1.15, color: T.white,
                        marginBottom: "var(--space-5)",
                    }}>
                        {t('admission.hero.title')}{" "}
                        <em style={{ fontStyle: "italic", color: T.saffLt }}>{t('admission.hero.titleEm')}</em>
                    </h1>

                    <p className="measure-body" style={{
                        fontFamily: "'Hind', sans-serif",
                        fontSize: "var(--fs-body-lg)",
                        color: "rgba(240,223,192,.76)",
                        lineHeight: 1.8, maxWidth: "600px",
                        margin: "0 auto var(--space-6)",
                    }}>
                        {t('admission.hero.sub')}
                    </p>

                    <div className="hero-btns" style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center", flexWrap: "wrap" }}>
                        <button className="btn btn-primary" onClick={() => scrollTo("apply")}>
                            {t('admission.hero.ctaApply')}
                        </button>
                        <button className="btn-ghost-light" onClick={() => scrollTo("life")}>
                            {t('admission.hero.ctaExplore')}
                        </button>
                    </div>

                    <div className="float" aria-hidden="true" style={{ marginTop: "var(--space-7)", color: "rgba(240,223,192,.3)", fontSize: "1.3rem" }}>⬇</div>
                </div>
            </div>

            {/* wave separator */}
            <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block", marginTop: "-2px", background: T.cream }}>
                <path d="M0 48V24C360 -8 1080 56 1440 24V48H0Z" fill={T.bark} opacity=".07" />
                <path d="M0 48V32C360 8 1080 64 1440 32V48H0Z" fill={T.saff} opacity=".05" />
            </svg>

            {/* ══════════════════════════════════════════════════════
          PAGE BODY
      ══════════════════════════════════════════════════════ */}
            <div style={{ background: T.cream }}>

                {/* ── STATS ──────────────────────────────────────── */}
                <div style={{ padding: sectionPad, background: T.cream }}>
                    <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
                        <Reveal>
                            <Eyebrow>{t('admission.statsSection.eyebrow')}</Eyebrow>
                            <STitle>{t('admission.statsSection.title')}<em style={{ fontStyle: "italic", color: T.saff }}>{t('admission.statsSection.titleEm')}</em></STitle>
                            <Rule />
                            <p className="measure-body" style={{ fontFamily: "'Hind', sans-serif", fontSize: "var(--fs-body)", color: T.inkSoft, maxWidth: "480px", marginBottom: "var(--space-6)" }}>
                                {t('admission.statsSection.p')}
                            </p>
                        </Reveal>
                        <div className="stats-grid">
                            {STATS.map((s, i) => (
                                <StatCard
                                    key={STAT_KEYS[i]}
                                    stat={{ ...s, label: t(`stats.${STAT_KEYS[i]}.label`), desc: t(`stats.${STAT_KEYS[i]}.desc`) }}
                                    index={i}
                                />
                            ))}
                        </div>
                        <OrnDivider />
                    </div>
                </div>

                {/* ── DAILY TIMELINE ─────────────────────────────── */}
                <div id="life" style={{ padding: sectionPad, background: T.creamDark }}>
                    <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
                        <Reveal>
                            <Eyebrow>{t('admission.timeline.eyebrow')}</Eyebrow>
                            <STitle><em style={{ fontStyle: "italic", color: T.saff }}>{t('admission.timeline.title')}</em>{t('admission.timeline.titleSuffix')}</STitle>
                            <Rule />
                            <p className="measure-body" style={{ fontFamily: "'Hind', sans-serif", fontSize: "var(--fs-body)", color: T.inkSoft, maxWidth: "520px", marginBottom: "var(--space-5)" }}>
                                {t('admission.timeline.p')}
                            </p>
                        </Reveal>

                        <ScheduleStrip items={buildTimeline(language)} />

                        <OrnDivider />
                    </div>
                </div>

                {/* ── ACADEMICS — single full-width editorial block per level,
                     not a card grid: ACADEMICS currently holds one level, and a
                     one-item grid was never a grid to begin with. ── */}
                <div id="academics" style={{ padding: sectionPad, background: T.cream }}>
                    <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
                        <Reveal>
                            <Eyebrow>{t('admission.academics.eyebrow')}</Eyebrow>
                            <STitle>{t('admission.academics.title')}<em style={{ fontStyle: "italic", color: T.saff }}>{t('admission.academics.titleEm')}</em></STitle>
                            <Rule />
                            <p className="measure-body" style={{ fontFamily: "'Hind', sans-serif", fontSize: "var(--fs-body)", color: T.inkSoft, maxWidth: "520px", marginBottom: "var(--space-7)" }}>
                                {t('admission.academics.p')}
                            </p>
                        </Reveal>
                        <div style={{ maxWidth: "820px" }}>
                            {ACADEMICS.map((a, i) => (
                                <AcademicLevel key={i} item={a} index={i} isLast={i === ACADEMICS.length - 1} />
                            ))}
                        </div>
                        <OrnDivider />
                    </div>
                </div>

                {/* ── ADMISSION PROCESS ──────────────────────────── */}
                <div id="process" style={{
                    padding: sectionPad,
                    background: `linear-gradient(135deg, ${T.inkMid} 0%, #1e0f04 100%)`,
                }}>
                    <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
                        <Reveal>
                            <Eyebrow style={{ color: T.saffLt }}>{t('admission.process.eyebrow')}</Eyebrow>
                            <h2 style={{
                                fontFamily: "'EB Garamond', serif",
                                fontSize: "var(--fs-h2)",
                                fontWeight: 400, lineHeight: 1.15, color: T.white,
                                marginBottom: "var(--space-3)",
                            }}>
                                {t('admission.process.title')}<em style={{ fontStyle: "italic", color: T.saffLt }}>{t('admission.process.titleEm')}</em>
                            </h2>
                            <div style={{ width: "34px", height: "1.5px", background: T.saffLt, opacity: .45, borderRadius: "1px", marginBottom: "var(--space-5)" }} />
                            <p className="measure-body" style={{ fontFamily: "'Hind', sans-serif", fontSize: "var(--fs-body)", color: "rgba(240,223,192,.65)", maxWidth: "480px", marginBottom: "var(--space-7)" }}>
                                {t('admission.process.p')}
                            </p>
                        </Reveal>
                        <div className="steps-grid">
                            {ADMISSION_STEPS.map((s, i) => (
                                <StepCard key={i} step={s} index={i} isLast={i === ADMISSION_STEPS.length - 1} />
                            ))}
                        </div>

                        {/* Ornament on dark bg */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-4)", padding: "var(--space-6) 0 0" }}>
                            <div style={{ height: "1px", width: "80px", background: `linear-gradient(90deg,transparent,rgba(240,223,192,.2))` }} />
                            <span style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: "13px", color: T.saffLt, opacity: .35, letterSpacing: ".22em" }}>✦ ॐ ✦</span>
                            <div style={{ height: "1px", width: "80px", background: `linear-gradient(90deg,rgba(240,223,192,.2),transparent)` }} />
                        </div>
                    </div>
                </div>

                {/* ── FAQ ────────────────────────────────────────── */}
                <div id="faq" style={{ padding: sectionPad, background: T.creamDark }}>
                    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
                        <Reveal>
                            <Eyebrow>{t('admission.faq.eyebrow')}</Eyebrow>
                            <STitle>{t('admission.faq.title')}<em style={{ fontStyle: "italic", color: T.saff }}>{t('admission.faq.titleEm')}</em></STitle>
                            <Rule />
                            <p className="measure-body" style={{ fontFamily: "'Hind', sans-serif", fontSize: "var(--fs-body)", color: T.inkSoft, maxWidth: "480px", marginBottom: "var(--space-6)" }}>
                                {t('admission.faq.p')}
                            </p>
                        </Reveal>

                        <div style={{
                            background: T.white,
                            border: `1px solid ${T.border}`,
                            borderRadius: "6px",
                            padding: "0 var(--space-6)",
                            boxShadow: `0 2px 18px ${T.shadow}`,
                        }}>
                            {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
                        </div>
                    </div>
                </div>

                {/* ── BOTTOM CTA ─────────────────────────────────── */}
                <div id="apply" style={{
                    padding: isMobile ? "var(--space-7) 5%" : "var(--space-9) 7%",
                    background: `
            radial-gradient(ellipse 80% 55% at 50% 50%, rgba(196,123,43,.13) 0%, transparent 65%),
            linear-gradient(135deg, ${T.inkMid} 0%, #1e0f04 100%)`,
                    textAlign: "center",
                    position: "relative", overflow: "hidden",
                }}>
                    <Reveal style={{ position: "relative", zIndex: 1, maxWidth: "660px", margin: "0 auto" }}>
                        <Eyebrow style={{ justifyContent: "center" }}>{t('admission.cta.eyebrow')}</Eyebrow>
                        <h2 style={{
                            fontFamily: "'EB Garamond', serif",
                            fontSize: "var(--fs-h2)",
                            fontWeight: 400, lineHeight: 1.15, color: T.white, marginBottom: "var(--space-4)",
                        }}>
                            {t('admission.cta.title')}<br />
                            <em style={{ fontStyle: "italic", color: T.saffLt }}>{t('admission.cta.titleEm')}</em>
                        </h2>
                        <div style={{ width: "34px", height: "1.5px", background: T.saffLt, opacity: .4, borderRadius: "1px", margin: "0 auto var(--space-5)" }} />
                        <p className="measure-body" style={{ fontFamily: "'Hind', sans-serif", fontSize: "var(--fs-body-lg)", color: "rgba(240,223,192,.7)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>
                            {t('admission.cta.p')}
                        </p>

                        <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link to="/admissionForm">
                                <button className="btn btn-primary" style={{ padding: "13px 28px" }}>
                                    {t('admission.cta.ctaApply')}
                                </button>
                            </Link>
                            <a href={`tel:${contactNumber}`}>
                                <button className="btn-ghost-light">
                                    {t('admission.cta.ctaCall')}
                                </button>
                            </a>
                        </div>

                        {/* Contact strip */}
                        <div style={{
                            marginTop: "var(--space-6)", padding: "var(--space-4) var(--space-5)",
                            background: "rgba(255,255,255,.06)",
                            border: `1px solid rgba(240,223,192,.18)`,
                            borderRadius: "6px",
                            display: "flex", gap: "var(--space-5)", justifyContent: "center", flexWrap: "wrap",
                        }}>
                            {[
                                { icon: "📞", text: contactNumber },
                                { icon: "✉️", text: email },
                                { icon: "📍", text: address },
                            ].map((c, i) => (
                                <div key={i} style={{
                                    display: "flex", alignItems: "center", gap: "var(--space-2)",
                                    fontFamily: "'Hind', sans-serif", fontSize: "var(--fs-body-sm)",
                                    color: "rgba(240,223,192,.65)"
                                }}>
                                    <span aria-hidden="true">{c.icon}</span>
                                    <span>{c.text}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>

                <Footer />
            </div>
        </>
    );
}