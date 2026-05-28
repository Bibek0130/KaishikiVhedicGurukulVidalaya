import { useState, useCallback, useRef, useEffect } from "react";
import { GALLERY_ITEMS, GALLERY_TABS } from "../../data/constants";
import { useReveal } from "../../hooks/UseReveal";
import   "./Gallary.css";

/* ── Lightbox ────────────────────────────── */
function Lightbox({ item, onClose, onPrev, onNext }) {
    if (!item) return null;
    return (
        <div className="lightboxOverlay" onClick={onClose}>
            {/* Removed styles. prefix */}
            <button className="lbClose" onClick={onClose} aria-label="Close">✕</button>
            <button className="lbPrev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">‹</button>
            <div className="lbContent" onClick={(e) => e.stopPropagation()}>
                {item.type === "photo" ? (
                    <img src={item.src} alt={item.caption} className="lbImg" />
                ) : (
                    <video
                        src={item.src}
                        controls
                        autoPlay
                        className="lbVideo"
                        poster={item.thumb}
                    />
                )}
                <div className="lbCaption">{item.caption}</div>
            </div>
            <button className="lbNext" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">›</button>
        </div>
    );
}

/* ── Video Thumb ─────────────────────────── */
function VideoThumb({ item, onClick }) {
    return (
        <div className="videoThumb" onClick={onClick}>
            <img src={item.thumb} alt={item.caption} className="thumbImg" />
            <div className="playOverlay">
                <div className="playBtn">▶</div>
                <div className="videoDuration">{item.duration}</div>
            </div>
            <div className="itemCaption">{item.caption}</div>
        </div>
    );
}

/* ── Photo Card ──────────────────────────── */
function PhotoCard({ item, onClick }) {
    return (
        <div
            // Using template literals for dynamic classes
            className={`photoCard ${item.span === "wide" ? "spanWide" : ""} ${item.span === "tall" ? "spanTall" : ""}`}
            onClick={onClick}
        >
            <img src={item.src} alt={item.caption} className="photoImg" loading="lazy" />
            <div className="photoOverlay">
                <span className="photoZoom">⤢</span>
                <div className="itemCaption">{item.caption}</div>
            </div>
        </div>
    );
}
/* ── Facebook page plugin ─────────────────────── */
 function FacebookPage() {
     return (
         <>
          <div>
                 <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fram.chandra.timalsina.630659%2Fposts%2Fpfbid0PS1x2QZYLQ9zPfXbZF5TdH4552toPapaTtti8WNjb9mXvdcajTFsbTBDybtD9vCTl&show_text=false&width=500" width="300" height="300" style={{border:"none", overflow:"hidden", paddingTop: "1%"}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>        

         </div>
         </>
    )
}
/* ── Gallery Section ─────────────────────── */
/*export default function Gallery() {
    const [activeTab, setActiveTab] = useState("All");
    const [lightboxItem, setLightboxItem] = useState(null);
    const { ref, isVisible } = useReveal();

    const filtered = activeTab === "All"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(
            (item) => item.tab === activeTab || (activeTab === "Videos" && item.type === "video")
        );

    const openLightbox = useCallback((item) => setLightboxItem(item), []);
    const closeLightbox = useCallback(() => setLightboxItem(null), []);

    const navigate = useCallback((dir) => {
        const idx = filtered.findIndex((i) => i.id === lightboxItem?.id);
        const next = (idx + dir + filtered.length) % filtered.length;
        setLightboxItem(filtered[next]);
    }, [filtered, lightboxItem]);

    return (
        <>
          
            <section
                id="gallery"
                className="section"
                style={{ background: "var(--cream-dark)", borderTop: "1px solid var(--border-soft)" }}
            >
                <div className="s-inner">
                    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
                        <div className="s-eyebrow">Glimpses of Ashram Life</div>
                        <h2 className="s-title">
                            Gallery — <em>Photos &amp; Videos</em>
                        </h2>
                        <div className="rule" />
                        <p style={{ fontSize: "15.5px", color: "var(--ink-mid)", lineHeight: 1.9, maxWidth: 580, marginBottom: 40 }}>
                            Moments from the ashram — dawn prayers, students at study, fire rituals, and the sacred hill that is home to us all.
                        </p>
                    </div>

                 {*//*   //* Updated Tabs className logic *//*}
                    <div className="tabs">
                        {GALLERY_TABS.map((tab) => (
                            <button
                                key={tab}
                                className={`tab ${activeTab === tab ? "tabActive" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === "Videos" && "🎬 "}{tab}
                            </button>
                        ))}
                    </div>

                    <div className="grid">
                        {filtered.map((item) =>
                            item.type === "video" ? (
                                <VideoThumb
                                    key={item.id}
                                    item={item}
                                    onClick={() => openLightbox(item)}
                                />
                            ) : (
                                <PhotoCard
                                    key={item.id}
                                    item={item}
                                    onClick={() => openLightbox(item)}
                                />
                            )
                        )}
                    </div>

                    <div style={{ textAlign: "center", marginTop: 32 }}>
                        <span style={{
                            fontSize: 13, color: "var(--ink-soft)",
                            background: "var(--cream)", border: "1px solid var(--border)",
                            padding: "6px 18px", borderRadius: 20,
                        }}>
                            Showing {filtered.length} of {GALLERY_ITEMS.length} items
                        </span>
                    </div>
                </div>
            </section>

            <Lightbox
                item={lightboxItem}
                onClose={closeLightbox}
                onPrev={() => navigate(-1)}
                onNext={() => navigate(1)}
            />
            <FacebookPage />
        </>
    );
}*/

/**
* GalleryPage.jsx
*
* A Vedic-inspired, cream-toned Gallery page for an organization/ashram website.
* Uses react-image-gallery for the lightbox/slider experience.
*
* Install dependencies before use:
*   npm install react-image-gallery
*
* Import the CSS once in your app entry (main.jsx / App.jsx):
*   import "react-image-gallery/styles/css/image-gallery.css";
*/
//-------------------------------------------------------------------------------------------------------------------//


//import { useState, useEffect, useCallback } from "react";
import ImageGallery from "react-image-gallery";
//import "react-image-gallery/styles/css/image-gallery.css";
import "../../../node_modules/react-image-gallery/styles/image-gallery.css";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const T = {
    cream: "#f8f1e7",
    creamDark: "#f0e6d2",
    creamDeep: "#e8d9c0",
    gold: "#b08d57",
    goldDark: "#8a6a38",
    brown: "#5c3d1e",
    brownLight: "#9c7b55",
    text: "#3b2a1a",
    textMuted: "#8a7260",
    white: "#fffdf8",
    shadow: "rgba(90,58,18,0.10)",
    shadowMd: "rgba(90,58,18,0.16)",
    border: "rgba(176,141,87,0.28)",
};

/* ─────────────────────────────────────────────
   IMAGE DATA  (replace URLs with your own)
───────────────────────────────────────────── */
const ALL_IMAGES = [
    { id: 1, category: "Meditation", description: "Morning meditation by the sacred river", original: "https://picsum.photos/seed/ash1/1200/800", thumbnail: "https://picsum.photos/seed/ash1/300/200" },
    { id: 2, category: "Events", description: "Annual Diwali celebration at the ashram", original: "https://picsum.photos/seed/ash2/1200/800", thumbnail: "https://picsum.photos/seed/ash2/300/200" },
    { id: 3, category: "Nature", description: "Gardens of serenity in the early dawn", original: "https://picsum.photos/seed/ash3/1200/800", thumbnail: "https://picsum.photos/seed/ash3/300/200" },
    { id: 4, category: "Community", description: "Community langar — serving with love", original: "https://picsum.photos/seed/ash4/1200/800", thumbnail: "https://picsum.photos/seed/ash4/300/200" },
    { id: 5, category: "Meditation", description: "Guided yoga at sunrise on the terrace", original: "https://picsum.photos/seed/ash5/1200/800", thumbnail: "https://picsum.photos/seed/ash5/300/200" },
    { id: 6, category: "Events", description: "Vedic fire ceremony — Agni Hotra", original: "https://picsum.photos/seed/ash6/1200/800", thumbnail: "https://picsum.photos/seed/ash6/300/200" },
    { id: 7, category: "Nature", description: "Sacred lotus pond in full bloom", original: "https://picsum.photos/seed/ash7/1200/800", thumbnail: "https://picsum.photos/seed/ash7/300/200" },
    { id: 8, category: "Community", description: "Children's art class — creativity as devotion", original: "https://picsum.photos/seed/ash8/1200/800", thumbnail: "https://picsum.photos/seed/ash8/300/200" },
    { id: 9, category: "Meditation", description: "Silent retreat — the art of inner stillness", original: "https://picsum.photos/seed/ash9/1200/800", thumbnail: "https://picsum.photos/seed/ash9/300/200" },
    { id: 10, category: "Events", description: "Navratri celebrations with the community", original: "https://picsum.photos/seed/ash10/1200/800", thumbnail: "https://picsum.photos/seed/ash10/300/200" },
    { id: 11, category: "Nature", description: "The Himalayan foothills at dusk", original: "https://picsum.photos/seed/ash11/1200/800", thumbnail: "https://picsum.photos/seed/ash11/300/200" },
    { id: 12, category: "Community", description: "Volunteers planting saplings on Earth Day", original: "https://picsum.photos/seed/ash12/1200/800", thumbnail: "https://picsum.photos/seed/ash12/300/200" },
    
    { id: 12, category: "Shoes", description: "test", original: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1779906521/gurukul_rbqt7g.jpg", thumbnail: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1779906521/gurukul_rbqt7g.jpg" },

];

const CATEGORIES = ["All", "Events", "Meditation", "Community", "Nature"];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useWindowWidth() {
    const [width, setWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1024
    );
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handler, { passive: true });
        return () => window.removeEventListener("resize", handler);
    }, []);
    return width;
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [visible, setVisible] = useState(false);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth < 900;

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const filtered =
        activeCategory === "All"
            ? ALL_IMAGES
            : ALL_IMAGES.filter((img) => img.category === activeCategory);

    /* Shape required by react-image-gallery */
    const galleryItems = filtered.map((img) => ({
        original: img.original,
        thumbnail: img.thumbnail,
        description: img.description,
        originalAlt: img.description,
        thumbnailAlt: img.description,
        /* ⚠️  Do NOT use `loading:"lazy"` here — it breaks swipe gestures
               because lazy slides aren't mounted when the swipe fires.     */
    }));

    const handleCategoryChange = useCallback((cat) => {
        setActiveCategory(cat);
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        
         #galleryPage {
          background: ${T.cream};
          color: ${T.text};
          font-family: 'EB Garamond', Georgia, serif;
          -webkit-tap-highlight-color: transparent;
        }

        /* ── Page fade-in ── */
        .gp-page {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .gp-page.visible { opacity:1; transform:translateY(0); }

        /* ── Decorative divider ── */
        .gp-divider {
          display: flex; align-items: center; gap: 12px;
          justify-content: center;
          margin: 0 auto 2rem;
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
          padding: 6px 18px;
          border-radius: 999px;
          border: 1.5px solid ${T.border};
          background: transparent;
          color: ${T.brownLight};
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 0.92rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .gp-pill:hover  { background:${T.creamDark}; border-color:${T.gold}; color:${T.brown}; }
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
          border-radius: 14px;
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
          background: linear-gradient(transparent, rgba(28,16,4,0.68));
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 1rem;
          letter-spacing: 0.03em;
          padding: 14px 18px 12px;
          bottom: 0;
        }

        /* Nav arrows */
        .image-gallery-icon {
          color: ${T.gold} !important;
          filter: drop-shadow(0 1px 3px rgba(28,16,4,0.45));
        }
        .image-gallery-icon:hover { color: ${T.white} !important; }
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
          background: rgba(28,16,4,0.45);
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 0.85rem;
          padding: 3px 10px;
          border-radius: 999px;
          top: 10px; right: 10px;
        }

        /* Thumbnails strip */
        .image-gallery-thumbnails-wrapper {
          background: ${T.creamDark};
          padding: 8px 0 6px;
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
        .image-gallery-thumbnail:hover {
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
          .image-gallery-description { font-size:0.88rem; padding:10px 12px 8px; }
          .gp-pill { font-size:0.82rem; padding:5px 13px; }
        }
        @media (max-width: 400px) {
          .image-gallery-slide .image-gallery-image { max-height: 230px; }
        }
      `}</style>

            {/* ── PAGE ── */}
            <div
                id="galleryPage"
                className={`gp-page${visible ? " visible" : ""}`}
                style={{ minHeight: "100vh", background: T.cream, paddingBottom: "5rem" }}
            >

                {/* ══════════ HEADER ══════════ */}
                <header style={{
                    textAlign: "center",
                    padding: isMobile ? "3rem 1.25rem 2rem" : "3rem 1.5rem 1rem",
                    background: `linear-gradient(180deg, ${T.creamDark} 0%, ${T.cream} 100%)`,
                    borderBottom: `1px solid ${T.border}`,
                    marginBottom: isMobile ? "1.8rem" : "2.8rem",
                }}>
                    {/* <p style={{
                        fontSize: isMobile ? "0.95rem" : "1.05rem",
                        letterSpacing: "0.18em",
                        color: T.gold,
                        marginBottom: "0.9rem",
                        fontStyle: "italic",
                    }}>
                        ॐ शान्तिः शान्तिः शान्तिः
                    </p>*/}

                    <h1 style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 600,
                        fontSize: isMobile ? "2rem" : isTablet ? "2.8rem" : "3.5rem",
                        color: T.brown,
                        lineHeight: 1.15,
                        marginBottom: "1rem",
                        letterSpacing: "-0.01em",
                    }}>
                        Moments of the Ashram
                    </h1>

                    <div className="gp-divider">
                        <div className="gp-divider__line" />
                        <span className="gp-divider__sym">✦</span>
                        <div className="gp-divider__line" />
                    </div>

                  {/*  <p style={{
                        fontSize: isMobile ? "0.98rem" : "1.1rem",
                        fontStyle: "italic",
                        color: T.textMuted,
                        maxWidth: "520px",
                        margin: "0 auto",
                        lineHeight: 1.75,
                        padding: "0 0.5rem",
                    }}>
                        "Through sacred gatherings, quiet mornings, and the grace of nature,
                        every moment here is a gentle step toward the Self."
                    </p>*/}
                </header>

                {/* ══════════ MAIN ══════════ */}
                <main style={{
                    maxWidth: "960px",
                    margin: "0 auto",
                    padding: isMobile ? "0 1rem" : "0 1.5rem",
                }}>

                    {/* ── Category filter pills ── */}
                    <div
                        role="group"
                        aria-label="Filter gallery by category"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: isMobile ? "8px" : "10px",
                            marginBottom: isMobile ? "1.5rem" : "2rem",
                        }}
                    >
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                className={`gp-pill${activeCategory === cat ? " active" : ""}`}
                                onClick={() => handleCategoryChange(cat)}
                                aria-pressed={activeCategory === cat}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* ── Photo count ── */}
                    <p style={{
                        textAlign: "center",
                        fontSize: "0.88rem",
                        color: T.textMuted,
                        marginBottom: "1.25rem",
                        letterSpacing: "0.04em",
                        fontStyle: "italic",
                    }}>
                        {filtered.length}{" "}
                        {filtered.length === 1 ? "photograph" : "photographs"}
                        {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
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
                                padding: "4rem 2rem",
                                textAlign: "center",
                                color: T.textMuted,
                                fontStyle: "italic",
                            }}>
                                No photographs in this category.
                            </div>
                        )}
                    </div>

                    {/* ── Footer note ── */}
                    <div style={{
                        textAlign: "center",
                        marginTop: "3rem",
                        paddingTop: "2.25rem",
                        borderTop: `1px solid ${T.border}`,
                    }}>
                        <div className="gp-divider" style={{ marginBottom: "1rem" }}>
                            <div className="gp-divider__line" />
                            <span className="gp-divider__sym">✦</span>
                            <div className="gp-divider__line" />
                        </div>
                        <p style={{
                            fontSize: "0.92rem",
                            color: T.textMuted,
                            fontStyle: "italic",
                            letterSpacing: "0.03em",
                        }}>
                            "सर्वे भवन्तु सुखिनः" — May all beings be happy.
                        </p>
                    </div>

                </main>
            </div>
        </>
    );
}
