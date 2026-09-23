/**
 * GurukulJourney.jsx
 * ─────────────────────────────────────────────────────────────────────────
 * The Ashram Journey / history page for Kaushiki Vaidik Gurukul Vidyalaya.
 * Routed at /ashram and /gurukuljourney.
 *
 * Every fact on this page is drawn from src/data/constants.js (STATS,
 * DAILY_SCHEDULE, address) and the institution's own official profile
 * document (Vedic Research Committee, Sept 2026) — real founding/relocation
 * dates and the first batch's real, named outcomes, not invented placeholder
 * history.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useInView from "../../hooks/useInView";
import useCounter from "../../hooks/useCounter";
import { useTranslation } from "../../hooks/useTranslation";
import { Footer } from "../home";
import {
    STATS,
    address,
    DAILY_SCHEDULE,
    DAILY_SCHEDULE_ACTIVITIES,
    DAILY_SCHEDULE_ACTIVITY_TEXT,
} from "../../data/constants";

// ─────────────────────────────────────────────────────────────────────────
// REAL PHOTOGRAPHY — the same Cloudinary assets already used elsewhere in
// src/data/constants.js, chosen here because they illustrate this page's
// specific claims (the temple, the founding fire ritual, student life).
// ─────────────────────────────────────────────────────────────────────────
const HERO_IMAGE =
    "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110968/WhatsApp_Image_2026-06-10_at_10.33.33_PM_udzjqd.jpg";
const FOUNDING_IMAGE =
    "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.34_PM_twmvpl.jpg";
const GROWTH_IMAGE =
    "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110962/WhatsApp_Image_2026-06-10_at_10.33.42_PM_1_bduzhm.jpg";

const COMPARE = {
    before: {
        label: "Then",
        caption: "An earlier photograph of the campus.",
        alt: "An earlier photograph of the gurukul campus buildings.",
        image:
            "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781318785/old_ashram_2_yn8osh.jpg",
    },
    after: {
        label: "Now",
        caption: "The campus today.",
        alt: "A recent photograph of the gurukul campus buildings.",
        image:
            "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781318785/new_ashram_rgwqky.jpg",
    },
};

// A handful of anchor points from the real daily schedule, used to give the
// "daily rhythm" milestone something concrete instead of vague claims.
const GLANCE_IDS = ["WAKE_UP", "VEDIC_STUDIES", "ACADEMICS", "EVENING_PRAYER", "SLEEP"];
// Built inside StorySection (below) with `language` in scope, so the chip
// labels switch with the active language.

// ─────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES — injected once. Colors reference the shared CSS custom
// properties defined in index.css; nothing here hardcodes a hex value.
// ─────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  .jny-root { background: var(--cream); color: var(--ink); font-family: 'Hind', sans-serif; }
  .jny-root img { display: block; }

  .jny-skip-link {
    position: absolute; left: -9999px; top: 0; z-index: 100;
    background: var(--ink); color: var(--cream); padding: 10px 18px;
    font-family: 'Hind', sans-serif; font-size: var(--fs-body-sm); text-decoration: none; border-radius: 0 0 4px 0;
  }
  .jny-skip-link:focus { left: 0; }

  .jny-section { padding: var(--space-9) 7%; }
  .jny-section-inner { max-width: 1100px; margin: 0 auto; }

  .jny-eyebrow {
    font-family: 'Hind', sans-serif; font-size: var(--fs-eyebrow); font-weight: 600;
    letter-spacing: .2em; text-transform: uppercase; color: var(--bark);
    display: flex; align-items: center; gap: 10px; margin-bottom: var(--space-3);
  }
  .jny-eyebrow::before { content: ""; display: block; width: 20px; height: 1px; background: var(--bark-lt); flex-shrink: 0; }
  .jny-h2 {
    font-family: 'EB Garamond', serif; font-weight: 400; font-size: var(--fs-h2);
    line-height: 1.15; color: var(--ink); margin: 0 0 var(--space-3);
  }
  .jny-h2 em { font-style: italic; color: var(--saff); }
  .jny-h2--on-dark { color: var(--cream); }

  .jny-rule { width: 34px; height: 1.5px; background: var(--bark-lt); border-radius: 1px; margin-bottom: var(--space-5); }

  .jny-lede { font-family: 'Hind', sans-serif; font-size: var(--fs-body-lg); color: var(--ink-mid); line-height: 1.7; max-width: 62ch; }
  .jny-prose { font-family: 'Hind', sans-serif; font-size: var(--fs-body); color: var(--ink-mid); line-height: 1.75; max-width: 62ch; }

  .jny-reveal { transition: opacity .75s ease, transform .75s ease; }

  /* ── Hero ── */
  .jny-hero { position: relative; min-height: 78vh; display: flex; align-items: flex-end; overflow: hidden; }
  .jny-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .jny-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(42,28,12,.35) 0%, rgba(42,28,12,.55) 55%, rgba(42,28,12,.92) 100%);
  }
  .jny-hero-content { position: relative; z-index: 1; max-width: 760px; padding: var(--space-9) 7% var(--space-8); }
  .jny-hero-eyebrow {
    font-family: 'Hind', sans-serif; font-size: var(--fs-eyebrow); letter-spacing: .2em; text-transform: uppercase;
    color: rgba(248,243,232,.78); margin-bottom: var(--space-4);
  }
  .jny-hero-title { font-family: 'EB Garamond', serif; font-weight: 400; font-size: var(--fs-h1); line-height: 1.15; color: var(--cream); margin: 0 0 var(--space-5); }
  .jny-hero-title em { font-style: italic; color: var(--saff); }
  .jny-hero-sub { font-family: 'Hind', sans-serif; font-size: var(--fs-body-lg); line-height: 1.7; color: rgba(248,243,232,.85); max-width: 52ch; margin: 0 0 var(--space-6); }
  .jny-hero-cta {
    display: inline-flex; align-items: center; gap: 8px; font-family: 'Hind', sans-serif;
    font-size: var(--fs-body-sm); font-weight: 500; letter-spacing: .05em; color: var(--cream);
    text-decoration: none; border-bottom: 1px solid rgba(248,243,232,.4); padding-bottom: 2px;
  }
  .jny-hero-cta:hover { border-color: var(--saff); color: var(--saff-lt); }

  /* ── Story (numbered index) ── */
  .jny-story-item { display: grid; grid-template-columns: 64px 1fr; gap: var(--space-5); padding: var(--space-7) 0; border-top: 1px solid var(--border); }
  .jny-story-num { font-family: 'EB Garamond', serif; font-size: clamp(2.4rem, 5vw, 3.4rem); line-height: 1; color: var(--ink-soft); opacity: .45; font-weight: 400; }
  .jny-story-body-wrap { display: grid; grid-template-columns: 1.15fr .85fr; gap: var(--space-6); align-items: center; }
  .jny-story-body-wrap--text-only { grid-template-columns: 1fr; max-width: 62ch; }
  .jny-story-when {
    display: inline-block; font-family: 'Hind', sans-serif; font-size: var(--fs-eyebrow); font-weight: 600;
    letter-spacing: .12em; text-transform: uppercase; color: var(--saff); margin-bottom: var(--space-2);
  }
  .jny-story-heading { font-family: 'EB Garamond', serif; font-weight: 400; font-size: var(--fs-h3); line-height: 1.35; color: var(--ink); margin: 0 0 var(--space-3); }
  .jny-story-photo { width: 100%; border-radius: 4px; overflow: hidden; box-shadow: 0 8px 28px var(--shadow, rgba(42,28,12,.14)); }
  .jny-story-photo img { width: 100%; height: 100%; aspect-ratio: 4/3; object-fit: cover; }

  .jny-glance { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-top: var(--space-5); }
  .jny-glance-chip {
    display: flex; align-items: center; gap: var(--space-2); background: var(--cream-dark);
    border: 1px solid var(--border); border-radius: 999px; padding: 6px 14px;
    font-family: 'Hind', sans-serif; font-size: var(--fs-body-sm); color: var(--ink-mid);
  }
  .jny-glance-time { font-weight: 600; color: var(--bark); }

  /* ── Then & Now ── */
  .jny-compare-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: var(--space-7); align-items: center; }
  .jny-compare-track {
    position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden; border-radius: 4px;
    cursor: ew-resize; user-select: none; box-shadow: 0 10px 32px rgba(42,28,12,.18);
  }
  .jny-compare-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .jny-compare-divider { position: absolute; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,.9); pointer-events: none; box-shadow: 0 0 8px rgba(0,0,0,.35); }
  .jny-compare-handle {
    position: absolute; top: 50%; width: 40px; height: 40px; border-radius: 50%; transform: translate(-50%,-50%);
    background: var(--cream); box-shadow: 0 3px 16px rgba(42,28,12,.3), 0 0 0 2.5px rgba(196,123,43,.4);
    display: flex; align-items: center; justify-content: center; gap: 3px; pointer-events: none;
  }
  .jny-compare-handle span { color: var(--saff); font-weight: 700; font-size: 13px; }
  .jny-compare-tag {
    position: absolute; bottom: 12px; background: rgba(42,28,12,.62); color: var(--saff-lt);
    font-family: 'Hind', sans-serif; font-size: 12px; padding: 4px 10px; border-radius: 999px; pointer-events: none;
  }
  .jny-compare-captions { display: flex; justify-content: space-between; gap: var(--space-4); margin-top: var(--space-3); }
  .jny-compare-captions p { font-family: 'Hind', sans-serif; font-size: var(--fs-body-sm); color: var(--ink-mid); margin: 0; }

  /* ── Present day stats ── */
  .jny-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5); }
  .jny-stat-card {
    background: var(--cream); border: 1px solid var(--border); border-radius: 4px;
    padding: var(--space-6) var(--space-5); text-align: center;
  }
  .jny-stat-icon { font-size: 2.2rem; margin-bottom: var(--space-2); }
  .jny-stat-value { font-family: 'EB Garamond', serif; font-size: clamp(2.1rem, 4vw, 3rem); color: var(--saff); line-height: 1; margin-bottom: var(--space-2); }
  .jny-stat-label { font-family: 'EB Garamond', serif; font-size: var(--fs-h4); font-weight: 400; color: var(--ink); margin-bottom: var(--space-1); }
  .jny-stat-desc { font-family: 'Hind', sans-serif; font-size: var(--fs-body-sm); color: var(--ink-mid); }

  /* ── Closing ── */
  .jny-closing { background: var(--ink); text-align: center; }
  .jny-closing-inner { max-width: 620px; margin: 0 auto; }
  .jny-closing-verse { font-family: 'Tiro Devanagari Sanskrit', serif; font-size: clamp(1.3rem, 3vw, 1.7rem); color: var(--saff); line-height: 1.6; margin-bottom: var(--space-2); }
  .jny-closing-gloss { font-family: 'EB Garamond', serif; font-style: italic; font-size: var(--fs-h4); color: rgba(248,243,232,.72); margin-bottom: var(--space-2); }
  .jny-closing-source { font-family: 'Hind', sans-serif; font-size: var(--fs-body-sm); color: rgba(248,243,232,.5); margin-bottom: var(--space-7); }
  .jny-closing-line { font-family: 'Hind', sans-serif; font-size: var(--fs-body-lg); color: rgba(248,243,232,.85); line-height: 1.75; max-width: 46ch; margin: 0 auto var(--space-7); }
  .jny-closing-actions { display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap; }

  .jny-btn {
    display: inline-flex; align-items: center; gap: 8px; font-family: 'Hind', sans-serif;
    font-size: var(--fs-body-sm); font-weight: 600; letter-spacing: .05em; text-transform: uppercase;
    padding: 12px 26px; border-radius: 28px; text-decoration: none; transition: transform .2s ease, background .2s ease, border-color .2s ease;
  }
  .jny-btn-primary { background: var(--saff); color: #fff; border: 1px solid var(--saff); }
  .jny-btn-primary:hover { background: var(--saff-warm); transform: translateY(-1px); }
  .jny-btn-ghost { background: transparent; color: var(--saff-lt); border: 1.5px solid rgba(240,223,192,.4); }
  .jny-btn-ghost:hover { background: rgba(240,223,192,.1); color: #fff; }

  .jny-root a:focus-visible,
  .jny-root button:focus-visible,
  .jny-compare-track:focus-visible {
    outline: 2px solid var(--saff); outline-offset: 3px;
  }

  @media (max-width: 860px) {
    .jny-story-item { grid-template-columns: 40px 1fr; gap: var(--space-4); }
    .jny-story-body-wrap { grid-template-columns: 1fr; }
    .jny-story-photo { order: -1; }
    .jny-compare-grid { grid-template-columns: 1fr; }
    .jny-stats-grid { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .jny-reveal, .jny-btn { transition-duration: .01ms !important; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────
// SHARED: scroll-reveal section wrapper (the one canonical motion treatment)
// ─────────────────────────────────────────────────────────────────────────
function RevealSection({ id, tone, ariaLabelledBy, children }) {
    const [ref, inView] = useInView(0.08);
    const bg = {
        cream: "var(--cream)",
        "cream-dark": "var(--cream-dark)",
        "cream-deep": "var(--cream-deep)",
        ink: "var(--ink)",
    }[tone];

    return (
        <section
            id={id}
            ref={ref}
            aria-labelledby={ariaLabelledBy}
            className={`jny-section jny-reveal${tone === "ink" ? " jny-closing" : ""}`}
            style={{
                background: bg,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(22px)",
            }}
        >
            <div className="jny-section-inner">{children}</div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────
function Hero() {
    const [ref, inView] = useInView(0.1);
    const { t } = useTranslation();
    return (
        <section ref={ref} className="jny-hero" aria-label="Introduction to the ashram's history">
            <img
                src={HERO_IMAGE}
                alt="The temple courtyard at the heart of the ashram campus."
                className="jny-hero-img"
            />
            <div className="jny-hero-overlay" aria-hidden="true" />
            <div
                className="jny-hero-content jny-reveal"
                style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)" }}
            >
                <p className="jny-hero-eyebrow">{t("ashramJourney.hero.eyebrow")}</p>
                <h1 className="jny-hero-title">
                    {t("ashramJourney.hero.title")}<em>{t("ashramJourney.hero.titleEm")}</em>
                </h1>
                <p className="jny-hero-sub">
                    {t("ashramJourney.hero.sub").replace("{address}", t("common.addressFull"))}
                </p>
                <a href="#story" className="jny-hero-cta">
                    {t("ashramJourney.hero.cta")}
                </a>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────
// STORY — a small, honest set of milestones (not a fabricated six-chapter
// saga). Each item is built only from constants.js and the Founder bio.
// ─────────────────────────────────────────────────────────────────────────
function StoryItem({ numeral, when, heading, children, photo, index, isFirst }) {
    const [ref, inView] = useInView(0.1);
    return (
        <div
            ref={ref}
            className="jny-story-item jny-reveal"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(22px)",
                transitionDelay: `${index * 80}ms`,
                ...(isFirst ? { borderTop: "none", paddingTop: 0 } : null),
            }}
        >
            <span className="jny-story-num" aria-hidden="true">{numeral}</span>
            <div className={`jny-story-body-wrap${photo ? "" : " jny-story-body-wrap--text-only"}`}>
                <div>
                    <p className="jny-story-when">{when}</p>
                    <h3 className="jny-story-heading">{heading}</h3>
                    <div className="jny-prose">{children}</div>
                </div>
                {photo && (
                    <div className="jny-story-photo">
                        <img src={photo.src} alt={photo.alt} loading="lazy" />
                    </div>
                )}
            </div>
        </div>
    );
}

function StorySection() {
    const { t, language } = useTranslation();

    const glanceItems = GLANCE_IDS.map((id) => {
        const slot = DAILY_SCHEDULE.find((d) => d.id === id);
        return {
            id,
            start: slot?.start,
            icon: DAILY_SCHEDULE_ACTIVITIES[id]?.icon,
            label: DAILY_SCHEDULE_ACTIVITY_TEXT[id]?.[language]?.label,
        };
    });

    return (
        <RevealSection id="story" tone="cream" ariaLabelledBy="story-heading">
            <p className="jny-eyebrow">{t("ashramJourney.story.eyebrow")}</p>
            <h2 id="story-heading" className="jny-h2">
                {t("ashramJourney.story.title")}<em>{t("ashramJourney.story.titleEm")}</em>
            </h2>
            <div className="jny-rule" />
            <p className="jny-lede" style={{ marginBottom: "var(--space-7)" }}>
                {t("ashramJourney.story.lede")}
            </p>

            <StoryItem
                numeral="I"
                when={t("ashramJourney.story.item1.when")}
                heading={t("ashramJourney.story.item1.heading")}
                index={0}
                isFirst
                photo={{
                    src: FOUNDING_IMAGE,
                    alt: "A priest performs the Agnihotra fire ritual at sunrise, a daily rite kept since the gurukul's founding.",
                }}
            >
                <p>{t("ashramJourney.story.item1.body")}</p>
            </StoryItem>

            <StoryItem
                numeral="II"
                when={t("ashramJourney.story.item2.when")}
                heading={t("ashramJourney.story.item2.heading")}
                index={1}
                photo={{
                    src: GROWTH_IMAGE,
                    alt: "Students seated together reciting Sanskrit verses during morning class.",
                }}
            >
                <p>{t("ashramJourney.story.item2.body")}</p>
            </StoryItem>

            <StoryItem
                numeral="III"
                when={t("ashramJourney.story.item3.when")}
                heading={t("ashramJourney.story.item3.heading")}
                index={2}
            >
                <p>{t("ashramJourney.story.item3.body")}</p>
                <div className="jny-glance">
                    {glanceItems.map((g) => (
                        <span className="jny-glance-chip" key={g.id}>
                            <span aria-hidden="true">{g.icon}</span>
                            <span className="jny-glance-time">{g.start}</span>
                            {g.label}
                        </span>
                    ))}
                </div>
            </StoryItem>

            <StoryItem
                numeral="IV"
                when={t("ashramJourney.story.item4.when")}
                heading={t("ashramJourney.story.item4.heading")}
                index={3}
            >
                <p>{t("ashramJourney.story.item4.body")}</p>
            </StoryItem>
        </RevealSection>
    );
}

// ─────────────────────────────────────────────────────────────────────────
// THEN & NOW — drag-to-compare slider. Kept because it is a genuinely
// distinctive, informative interaction; captioned honestly and generically
// since the exact provenance of the two photos relative to each other
// cannot be verified from context.
// ─────────────────────────────────────────────────────────────────────────
function CompareSlider() {
    const { t } = useTranslation();
    const [pos, setPos] = useState(50);
    const trackRef = useRef(null);
    const dragging = useRef(false);

    const clamp = (v) => Math.min(100, Math.max(0, v));
    const update = useCallback((clientX) => {
        const rect = trackRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPos(clamp(((clientX - rect.left) / rect.width) * 100));
    }, []);

    useEffect(() => {
        const onMove = (e) => { if (dragging.current) update(e.clientX); };
        const onUp = () => { dragging.current = false; };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
    }, [update]);

    return (
        <RevealSection id="then-and-now" tone="cream-dark" ariaLabelledBy="compare-heading">
            <div className="jny-compare-grid">
                <div>
                    <p className="jny-eyebrow">{t("ashramJourney.compare.eyebrow")}</p>
                    <h2 id="compare-heading" className="jny-h2">
                        {t("ashramJourney.compare.title")}<em>{t("ashramJourney.compare.titleEm")}</em>
                    </h2>
                    <div className="jny-rule" />
                    <p className="jny-prose">
                        {t("ashramJourney.compare.p")}
                    </p>
                </div>

                <div>
                    <div
                        ref={trackRef}
                        className="jny-compare-track"
                        role="slider"
                        aria-label="Compare an earlier and a recent photograph of the campus"
                        tabIndex={0}
                        aria-valuenow={Math.round(pos)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
                        onTouchMove={(e) => update(e.touches[0].clientX)}
                        onTouchStart={(e) => update(e.touches[0].clientX)}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowLeft") setPos((p) => clamp(p - 2));
                            if (e.key === "ArrowRight") setPos((p) => clamp(p + 2));
                        }}
                    >
                        <img src={COMPARE.after.image} alt={COMPARE.after.alt} draggable={false} className="jny-compare-img" />
                        <img
                            src={COMPARE.before.image}
                            alt={COMPARE.before.alt}
                            draggable={false}
                            className="jny-compare-img"
                            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                        />
                        <div className="jny-compare-divider" style={{ left: `${pos}%` }} />
                        <div className="jny-compare-handle" style={{ left: `${pos}%` }}>
                            <span>‹</span><span>›</span>
                        </div>
                        <div className="jny-compare-tag" style={{ left: "12px" }}>{t("ashramJourney.compare.beforeLabel")}</div>
                        <div className="jny-compare-tag" style={{ right: "12px" }}>{t("ashramJourney.compare.afterLabel")}</div>
                    </div>
                    <div className="jny-compare-captions">
                        <p>{t("ashramJourney.compare.beforeCaption")}</p>
                        <p>{t("ashramJourney.compare.afterCaption")}</p>
                    </div>
                </div>
            </div>
        </RevealSection>
    );
}

// ─────────────────────────────────────────────────────────────────────────
// PRESENT DAY — the counting-up stat numbers, kept because they demonstrate
// real, specific scale. Sourced entirely from STATS in constants.js.
// ─────────────────────────────────────────────────────────────────────────
function StatCard({ stat, index, active }) {
    const count = useCounter(stat.value, active);
    return (
        <div
            className="jny-stat-card jny-reveal"
            style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${index * 100}ms`,
            }}
        >
            <div className="jny-stat-icon" aria-hidden="true">{stat.icon}</div>
            <div className="jny-stat-value">{count}{stat.suffix}</div>
            <div className="jny-stat-label">{stat.label}</div>
            <div className="jny-stat-desc">{stat.desc}</div>
        </div>
    );
}

const STAT_KEYS = ["students", "staff", "cows"];

function StatsSection() {
    const { t } = useTranslation();
    const [ref, inView] = useInView(0.2);
    const translatedStats = STATS.map((s, i) => ({
        ...s,
        label: t(`stats.${STAT_KEYS[i]}.label`),
        desc: t(`stats.${STAT_KEYS[i]}.desc`),
    }));
    return (
        <section id="present-day" ref={ref} className="jny-section" style={{ background: "var(--cream-deep)" }} aria-labelledby="stats-heading">
            <div className="jny-section-inner">
                <p className="jny-eyebrow">{t("ashramJourney.stats.eyebrow")}</p>
                <h2 id="stats-heading" className="jny-h2">
                    {t("ashramJourney.stats.title")}<em>{t("ashramJourney.stats.titleEm")}</em>
                </h2>
                <div className="jny-rule" />
                <p className="jny-lede" style={{ marginBottom: "var(--space-7)" }}>
                    {t("ashramJourney.stats.lede")}
                </p>
                <div className="jny-stats-grid">
                    {translatedStats.map((s, i) => (
                        <StatCard key={STAT_KEYS[i]} stat={s} index={i} active={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────
// CLOSING — the page's one deliberate dark section. No invented "future
// vision" roadmap, no misattributed quote — just a real, well-known Vedic
// closing invocation and an honest line, with links to real pages.
// ─────────────────────────────────────────────────────────────────────────
function Closing() {
    const { t } = useTranslation();
    return (
        <RevealSection id="closing" tone="ink" ariaLabelledBy="closing-heading">
            <div className="jny-closing-inner">
                <h2 id="closing-heading" className="jny-h2 jny-h2--on-dark" style={{ marginBottom: "var(--space-6)" }}>
                    {t("ashramJourney.closing.title")}<em>{t("ashramJourney.closing.titleEm")}</em>
                </h2>
                <p className="jny-closing-verse">ॐ शान्तिः शान्तिः शान्तिः</p>
                <p className="jny-closing-gloss">{t("ashramJourney.closing.verseGloss")}</p>
                <p className="jny-closing-source">{t("ashramJourney.closing.verseSource")}</p>
                <p className="jny-closing-line">
                    {t("ashramJourney.closing.line")}
                </p>
                <div className="jny-closing-actions">
                    <Link to="/admission" className="jny-btn jny-btn-primary">{t("ashramJourney.closing.ctaAdmission")}</Link>
                    <Link to="/getInvolved" className="jny-btn jny-btn-ghost">{t("ashramJourney.closing.ctaSupport")}</Link>
                </div>
            </div>
        </RevealSection>
    );
}

// ─────────────────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────────────────
export default function GurukulJourney() {
    const { t } = useTranslation();

    useEffect(() => {
        const id = "jny-global-styles";
        if (document.getElementById(id)) return;
        const style = document.createElement("style");
        style.id = id;
        style.textContent = GLOBAL_CSS;
        document.head.appendChild(style);
    }, []);

    return (
        <main id="jny-main" className="jny-root">
            <a href="#jny-main" className="jny-skip-link">{t("ashramJourney.skipLink")}</a>
            <Hero />
            <StorySection />
            <CompareSlider />
            <StatsSection />
            <Closing />
            <Footer />
        </main>
    );
}
