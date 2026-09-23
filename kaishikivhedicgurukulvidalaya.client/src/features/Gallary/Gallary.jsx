/**
 * GalleryPage.jsx
 *
 * A Vedic-inspired, cream-toned Gallery page for the ashram.
 * Uses react-image-gallery for the lightbox/slider experience over
 * real Cloudinary photographs of ashram life, with category pills
 * to filter by theme.
 *
 * Import the CSS once in your app entry (main.jsx / App.jsx):
 *   import "react-image-gallery/styles/css/image-gallery.css";
 */

import { useState, useCallback, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "../../../node_modules/react-image-gallery/styles/image-gallery.css";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { useTranslation } from "../../hooks/useTranslation";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
   Aliased onto the site-wide CSS custom properties defined in
   src/index.css, so this page tracks the one shared palette
   instead of carrying its own near-duplicate hex values.
───────────────────────────────────────────── */
const T = {
    cream: "var(--cream)",
    creamDark: "var(--cream-dark)",
    creamDeep: "var(--cream-deep)",
    gold: "var(--saff)",
    brown: "var(--ink)",
    brownLight: "var(--ink-mid)",
    text: "var(--ink)",
    textMuted: "var(--ink-soft)",
    white: "#fff",
    shadow: "rgba(122,84,53,0.10)",
    shadowMd: "rgba(122,84,53,0.16)",
    border: "var(--border)",
};

/* ─────────────────────────────────────────────
   IMAGE DATA — real ashram photography (Cloudinary)
───────────────────────────────────────────── */
const ALL_IMAGES = [
    { id: 1, category: "Meditation", description: "Morning meditation by the sacred river", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110962/WhatsApp_Image_2026-06-10_at_10.33.42_PM_1_bduzhm.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110962/WhatsApp_Image_2026-06-10_at_10.33.42_PM_1_bduzhm.jpg" },

    { id: 2, category: "Events", description: "Annual Diwali celebration at the ashram", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.34_PM_twmvpl.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.34_PM_twmvpl.jpg" },

    { id: 3, category: "Nature", description: "Gardens of serenity in the early dawn", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110968/WhatsApp_Image_2026-06-10_at_10.33.33_PM_udzjqd.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110968/WhatsApp_Image_2026-06-10_at_10.33.33_PM_udzjqd.jpg" },

    { id: 4, category: "Community", description: "Community langar — serving with love", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.33_PM_1_s8rmlm.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.33_PM_1_s8rmlm.jpg" },

    { id: 5, category: "Meditation", description: "Guided yoga at sunrise on the terrace", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.35_PM_c876ni.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.35_PM_c876ni.jpg" },

    { id: 6, category: "Events", description: "Vedic fire ceremony — Agni Hotra", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.33_PM_2_p8iuvi.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.33_PM_2_p8iuvi.jpg" },

    { id: 7, category: "Nature", description: "Sacred lotus pond in full bloom", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110963/WhatsApp_Image_2026-06-10_at_10.33.42_PM_fzekvp.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110963/WhatsApp_Image_2026-06-10_at_10.33.42_PM_fzekvp.jpg" },

    { id: 8, category: "Community", description: "Children's art class — creativity as devotion", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110963/WhatsApp_Image_2026-06-10_at_10.33.39_PM_arbjra.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110963/WhatsApp_Image_2026-06-10_at_10.33.39_PM_arbjra.jpg" },

    { id: 9, category: "Meditation", description: "Silent retreat — the art of inner stillness", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110965/WhatsApp_Image_2026-06-10_at_10.33.37_PM_1_jb8iji.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110965/WhatsApp_Image_2026-06-10_at_10.33.37_PM_1_jb8iji.jpg" },

    { id: 10, category: "Events", description: "Navratri celebrations with the community", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110966/WhatsApp_Image_2026-06-10_at_10.33.36_PM_gc2lfm.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110966/WhatsApp_Image_2026-06-10_at_10.33.36_PM_gc2lfm.jpg" },

    { id: 11, category: "Nature", description: "The Himalayan foothills at dusk", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110966/WhatsApp_Image_2026-06-10_at_10.33.35_PM_1_tgvvdi.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110966/WhatsApp_Image_2026-06-10_at_10.33.35_PM_1_tgvvdi.jpg" },

    { id: 12, category: "Community", description: "Volunteers planting saplings on Earth Day", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110965/WhatsApp_Image_2026-06-10_at_10.33.37_PM_2_i6farf.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110965/WhatsApp_Image_2026-06-10_at_10.33.37_PM_2_i6farf.jpg" },

    { id: 13, category: "Ashram", description: "Temple courtyard atmosphere", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110964/WhatsApp_Image_2026-06-10_at_10.33.40_PM_exrm0a.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110964/WhatsApp_Image_2026-06-10_at_10.33.40_PM_exrm0a.jpg" },

    { id: 14, category: "Nature", description: "Evening forest path near the ashram", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110964/WhatsApp_Image_2026-06-10_at_10.33.40_PM_1_xesbln.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110964/WhatsApp_Image_2026-06-10_at_10.33.40_PM_1_xesbln.jpg" },

    { id: 15, category: "Community", description: "Evening discipline training session", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110964/WhatsApp_Image_2026-06-10_at_10.33.40_PM_2_r3mewj.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110964/WhatsApp_Image_2026-06-10_at_10.33.40_PM_2_r3mewj.jpg" },

    { id: 16, category: "Meditation", description: "Guru guiding spiritual practice", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110963/WhatsApp_Image_2026-06-10_at_10.33.41_PM_1_ybtuvv.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110963/WhatsApp_Image_2026-06-10_at_10.33.41_PM_1_ybtuvv.jpg" },

    { id: 17, category: "Meditation", description: "Evening meditation under temple lamps", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110964/WhatsApp_Image_2026-06-10_at_10.33.38_PM_hz1nlk.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110964/WhatsApp_Image_2026-06-10_at_10.33.38_PM_hz1nlk.jpg" },

    { id: 18, category: "Community", description: "Seva activities by students", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110963/WhatsApp_Image_2026-06-10_at_10.33.38_PM_1_q8lkg6.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110963/WhatsApp_Image_2026-06-10_at_10.33.38_PM_1_q8lkg6.jpg" },
];

const CATEGORIES = ["All", "Events", "Meditation", "Community", "Nature"];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function GalleryPage() {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState("All");
    const [visible, setVisible] = useState(false);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth < 640;

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(timer);
    }, []);

    const filtered =
        activeCategory === "All"
            ? ALL_IMAGES
            : ALL_IMAGES.filter((img) => img.category === activeCategory);

    /* Shape required by react-image-gallery */
    const galleryItems = filtered.map((img) => {
        const description = t(`galleryPage.images.${img.id}`);
        return {
            original: img.original,
            thumbnail: img.thumbnail,
            description,
            originalAlt: description,
            thumbnailAlt: description,
            /* ⚠️  Do NOT use `loading:"lazy"` here — it breaks swipe gestures
                   because lazy slides aren't mounted when the swipe fires.     */
        };
    });

    const handleCategoryChange = useCallback((cat) => {
        setActiveCategory(cat);
    }, []);

    return (
        <>
            <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        #galleryPage {
          background: ${T.cream};
          color: ${T.text};
          font-family: 'Hind', sans-serif;
          -webkit-tap-highlight-color: transparent;
        }

        /* ── Page fade-in ── */
        .gp-page {
          opacity: 0;
          transform: translateY(var(--space-3));
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .gp-page.visible { opacity:1; transform:translateY(0); }

        /* ── Decorative divider ── */
        .gp-divider {
          display: flex; align-items: center; gap: var(--space-3);
          justify-content: center;
          margin: 0 auto var(--space-6);
          max-width: 280px;
        }
        .gp-divider__line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, transparent, ${T.gold}, transparent);
        }
        .gp-divider__sym { color:${T.gold}; font-size:1rem; user-select:none; }

        /* ── Filter pills ── */
        .gp-pill {
          display: inline-flex; align-items: center;
          padding: var(--space-2) var(--space-5);
          border-radius: 999px;
          border: 1.5px solid ${T.border};
          background: transparent;
          color: ${T.brownLight};
          font-family: 'Hind', sans-serif;
          font-weight: 500;
          font-size: var(--fs-body-sm);
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .gp-pill:hover  { background:${T.creamDark}; border-color:${T.gold}; color:${T.brown}; }
        .gp-pill:focus-visible { outline: 2px solid ${T.gold}; outline-offset: 2px; }
        .gp-pill.active { background:${T.gold}; border-color:${T.gold}; color:${T.white}; box-shadow:0 2px 10px ${T.shadow}; }

        /* ═══════════════════════════════════════
           react-image-gallery OVERRIDES
           Key fix: NO overflow:hidden on the root
           wrapper — it clips touch hit areas.
        ═══════════════════════════════════════ */
        .image-gallery {
          border-radius: 14px;
          /* overflow:hidden is intentionally omitted — it breaks swipe */
          box-shadow: 0 6px 36px ${T.shadowMd};
          background: ${T.creamDark};
        }

        /* Slide wrapper: transparent so images show immediately */
        .image-gallery-slide-wrapper {
          background: ${T.creamDark};
          border-radius: 14px 14px 0 0;
          overflow: hidden;          /* clip only the slide area, NOT the whole gallery */
        }

        /* Main image */
        .image-gallery-slide .image-gallery-image {
          width: 100%;
          object-fit: cover;
          display: block;
          /* height is set responsively below */
          max-height: 560px;
          min-height: 220px;
          background: ${T.creamDeep};  /* fallback while loading */
        }

        /* Description overlay */
        .image-gallery-description {
          background: linear-gradient(transparent, rgba(42,28,12,0.68));
          font-family: 'EB Garamond', serif;
          font-style: italic;
          font-size: var(--fs-body);
          letter-spacing: 0.02em;
          padding: var(--space-4) var(--space-5) var(--space-3);
          bottom: 0;
        }

        /* Nav arrows */
        .image-gallery-icon {
          color: ${T.gold} !important;
          filter: drop-shadow(0 1px 3px rgba(42,28,12,0.45));
        }
        .image-gallery-icon:hover { color: ${T.white} !important; }
        .image-gallery-icon:focus-visible { outline: 2px solid ${T.white} !important; outline-offset: 2px; }
        .image-gallery-left-nav  .image-gallery-svg,
        .image-gallery-right-nav .image-gallery-svg { width:40px; height:40px; }

        /* Play / fullscreen buttons */
        .image-gallery-play-button .image-gallery-svg,
        .image-gallery-fullscreen-button .image-gallery-svg { width:28px; height:28px; }

        /* Bullet dots (shown on mobile instead of thumbnails) */
        .image-gallery-bullets { bottom: 48px; }
        .image-gallery-bullet  {
          background: ${T.gold} !important;
          border-color: ${T.gold} !important;
          opacity: 0.4;
          width:8px; height:8px;
          padding:0 !important;
        }
        .image-gallery-bullet.active { opacity:1; transform:scale(1.35); }

        /* Slide index counter */
        .image-gallery-index {
          background: rgba(42,28,12,0.45);
          font-family: 'Hind', sans-serif;
          font-size: var(--fs-body-sm);
          padding: 3px 10px;
          border-radius: 999px;
          top: 10px; right: 10px;
        }

        /* Thumbnails strip */
        .image-gallery-thumbnails-wrapper {
          background: ${T.creamDark};
          padding: var(--space-2) 0 var(--space-2);
          border-radius: 0 0 14px 14px;
        }
        .image-gallery-thumbnail {
          border: 2px solid transparent !important;
          border-radius: 6px !important;
          overflow: hidden;
          opacity: 0.65;
          transition: opacity 0.2s, border-color 0.2s, transform 0.25s !important;
        }
        .image-gallery-thumbnail.active,
        .image-gallery-thumbnail:hover,
        .image-gallery-thumbnail:focus-visible {
          border-color: ${T.gold} !important;
          opacity: 1;
        }
        .image-gallery-thumbnail-image {
          border-radius: 4px;
          transition: transform 0.3s ease;
        }
        .image-gallery-thumbnail:hover .image-gallery-thumbnail-image {
          transform: scale(1.08);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .image-gallery-slide .image-gallery-image { max-height: 420px; }
          .image-gallery-left-nav  .image-gallery-svg,
          .image-gallery-right-nav .image-gallery-svg { width:32px; height:32px; }
        }
        @media (max-width: 640px) {
          .image-gallery-slide .image-gallery-image { max-height: 280px; min-height:180px; }
          .image-gallery-left-nav  .image-gallery-svg,
          .image-gallery-right-nav .image-gallery-svg { width:26px; height:26px; }
          .image-gallery-left-nav  { padding: 0 6px !important; }
          .image-gallery-right-nav { padding: 0 6px !important; }
          .image-gallery-description { font-size: var(--fs-body-sm); padding: var(--space-3) var(--space-3) var(--space-2); }
          .gp-pill { font-size: 12px; padding: 5px var(--space-4); }
        }
        @media (max-width: 400px) {
          .image-gallery-slide .image-gallery-image { max-height: 230px; }
        }
      `}</style>

            {/* ── PAGE ── */}
            <div
                id="galleryPage"
                className={`gp-page${visible ? " visible" : ""}`}
                style={{ minHeight: "100vh", background: T.cream, paddingBottom: "var(--space-8)" }}
            >

                {/* ══════════ HEADER ══════════ */}
                <header style={{
                    textAlign: "center",
                    padding: isMobile ? "var(--space-7) var(--space-4) var(--space-6)" : "var(--space-7) var(--space-5) var(--space-4)",
                    background: `linear-gradient(180deg, ${T.creamDark} 0%, ${T.cream} 100%)`,
                    borderBottom: `1px solid ${T.border}`,
                    marginBottom: isMobile ? "var(--space-6)" : "var(--space-7)",
                }}>
                    <h1 style={{
                        fontFamily: "'EB Garamond', serif",
                        fontWeight: 400,
                        fontSize: "var(--fs-h1)",
                        color: T.brown,
                        lineHeight: 1.15,
                        marginBottom: "var(--space-4)",
                        letterSpacing: "-0.01em",
                    }}>
                        {t("galleryPage.title")}<em style={{ fontStyle: "italic", color: "var(--saff)" }}>{t("galleryPage.titleEm")}</em>
                    </h1>

                    <div className="gp-divider">
                        <div className="gp-divider__line" />
                        <span className="gp-divider__sym">✦</span>
                        <div className="gp-divider__line" />
                    </div>
                </header>

                {/* ══════════ MAIN ══════════ */}
                <main style={{
                    maxWidth: "960px",
                    margin: "0 auto",
                    padding: isMobile ? "0 var(--space-4)" : "0 var(--space-5)",
                }}>

                    {/* ── Category filter pills ── */}
                    <div
                        role="group"
                        aria-label={t("galleryPage.filterAriaLabel")}
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: isMobile ? "var(--space-2)" : "var(--space-3)",
                            marginBottom: isMobile ? "var(--space-5)" : "var(--space-6)",
                        }}
                    >
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                className={`gp-pill${activeCategory === cat ? " active" : ""}`}
                                onClick={() => handleCategoryChange(cat)}
                                aria-pressed={activeCategory === cat}
                            >
                                {t(`galleryPage.categories.${cat.toLowerCase()}`)}
                            </button>
                        ))}
                    </div>

                    {/* ── Photo count ── */}
                    <p style={{
                        textAlign: "center",
                        fontSize: "var(--fs-body-sm)",
                        color: T.textMuted,
                        marginBottom: "var(--space-4)",
                        letterSpacing: "0.04em",
                        fontStyle: "italic",
                    }}>
                        {filtered.length}{" "}
                        {filtered.length === 1 ? t("galleryPage.photoCountSingular") : t("galleryPage.photoCountPlural")}
                        {activeCategory !== "All" ? ` · ${t(`galleryPage.categories.${activeCategory.toLowerCase()}`)}` : ""}
                    </p>

                    {/* ── Gallery ──
              CRITICAL: the container must NOT have overflow:hidden
              because that clips the touch-event hit area for swipe.
              Border-radius is applied only on .image-gallery itself.
          ── */}
                    <div style={{
                        background: T.white,
                        borderRadius: "16px",
                        border: `1px solid ${T.border}`,
                        boxShadow: `0 4px 28px ${T.shadow}`,
                        /* ✅ overflow: visible  — do NOT set overflow:hidden here */
                    }}>
                        {galleryItems.length > 0 ? (
                            <ImageGallery
                                key={activeCategory}       /* reset index on filter change */
                                items={galleryItems}

                                /* ── Controls ── */
                                showPlayButton
                                showFullscreenButton
                                showThumbnails={!isMobile} /* thumbnails → desktop/tablet only */
                                showBullets={isMobile}     /* bullet dots → mobile only */
                                showIndex
                                autoPlay={false}
                                slideInterval={5000}
                                slideDuration={550}

                                /* ── Swipe / touch ──
                                   lazyLoad is intentionally OFF — lazy-mounted slides
                                   aren't in the DOM when a fast swipe fires, so images
                                   appear blank. Eager-load ensures they're always ready. */
                                lazyLoad={false}
                                swipingTransitionDuration={380}
                                swipeThreshold={30}        /* px before swipe commits     */

                                /* ── Fullscreen ──
                                   useBrowserFullscreen:false works on iOS Safari;
                                   true can silently fail there.                           */
                                useBrowserFullscreen={false}

                                additionalClass="vedic-gallery"
                            />
                        ) : (
                            <div style={{
                                padding: "var(--space-8) var(--space-6)",
                                textAlign: "center",
                                color: T.textMuted,
                                fontStyle: "italic",
                            }}>
                                {t("galleryPage.noPhotos")}
                            </div>
                        )}
                    </div>

                    {/* ── Footer note ── */}
                    <div style={{
                        textAlign: "center",
                        marginTop: "var(--space-7)",
                        paddingTop: "var(--space-6)",
                        borderTop: `1px solid ${T.border}`,
                    }}>
                        <div className="gp-divider" style={{ marginBottom: "var(--space-4)" }}>
                            <div className="gp-divider__line" />
                            <span className="gp-divider__sym">✦</span>
                            <div className="gp-divider__line" />
                        </div>
                        <p style={{
                            fontSize: "var(--fs-body-sm)",
                            color: T.textMuted,
                            fontStyle: "italic",
                            letterSpacing: "0.03em",
                        }}>
                            <span style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif", fontStyle: "normal" }}>
                                सर्वे भवन्तु सुखिनः
                            </span>{" "}
                            — {t("galleryPage.footerGloss")}
                        </p>
                    </div>

                </main>
            </div>
        </>
    );
}
