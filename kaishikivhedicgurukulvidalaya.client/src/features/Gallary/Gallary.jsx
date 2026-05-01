import { useState, useCallback } from "react";
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

/* ── Gallery Section ─────────────────────── */
export default function Gallery() {
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

                    {/* Updated Tabs className logic */}
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
        </>
    );
}