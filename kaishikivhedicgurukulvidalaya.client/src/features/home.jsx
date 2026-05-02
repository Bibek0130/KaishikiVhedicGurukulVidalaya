/**
 * sections.jsx — All content sections except Hero, Gallery, GetInvolved.
 * Each section is a named export so the main App can import selectively.
 */

import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import {
    ACTIVITIES, BELIEFS, RESOURCES,
    ASHRAM_FEATURES, ASHRAM_TAGS, CONTACT_DETAILS,
} from "../data/constants";
import "./home.css"
/*
*//* ══════════════════════════════════════════
   ABOUT
══════════════════════════════════════════ *//*
export function About() {
    const { ref, isVisible } = useReveal();
    return (
        <section id="about" className="section" style={{ background: "var(--cream)" }}>
            <div className="s-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

                {*//* SVG Illustration *//*}
                <div ref={ref} className={isVisible ? "reveal visible" : "reveal"} style={{ position: "relative" }}>
                    <div style={{
                        position: "absolute", inset: "-10px 10px 10px -10px",
                        border: "1px solid var(--cream-deep)", borderRadius: 4, zIndex: 0,
                    }} />
                    <div style={{
                        position: "relative", zIndex: 1,
                        aspectRatio: "5/4",
                        borderRadius: 4,
                        border: "1px solid var(--border)",
                        overflow: "hidden",
                        background: "linear-gradient(145deg, var(--saff-lt), var(--earth-lt), var(--cream-dark))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <AshramIllustration />
                    </div>
                </div>

                {*//* Text *//*}
                <div className={`${isVisible ? "reveal visible" : "reveal"} reveal-delay-1`}>
                    <div className="s-eyebrow">About the Ashram</div>
                    <h2 className="s-title">Rooted in the<br /><em>Hillside</em>, Open to All</h2>
                    <div className="rule" />
                    <p style={{ fontSize: 15.5, color: "var(--ink-mid)", lineHeight: 1.9, marginBottom: 14 }}>
                        Kaushike Vaidik Gurukul Vidyalaya rests on a gentle hill overlooking an ancient Shiva temple near Sankhu. The forest above and the stream below are our eternal companions. We follow the unbroken tradition of the gurukul — where teacher and student live, learn, and grow together.
                    </p>
                    <p style={{ fontSize: 15.5, color: "var(--ink-mid)", lineHeight: 1.9 }}>
                        Education here is completely free of charge. Students are received not as pupils but as children of the ashram — nourished, taught, and guided without any fees.
                    </p>

                    <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
                        {[
                            { deva: "ज्ञ", title: "Free Sanskrit Education", desc: "From beginner Devanagari to advanced Vedic recitation — all without charge." },
                            { deva: "तप", title: "Disciplined Ashram Life", desc: "Early rising, nature connection, and structured daily sadhana build character." },
                            { deva: "पूज", title: "Rituals & Sacred Services", desc: "The ashram performs a full range of Vedic pujas and rituals for families." },
                        ].map(({ deva, title, desc }) => (
                            <div key={title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                                <div style={{
                                    width: 36, height: 36, flexShrink: 0,
                                    background: "var(--saff-pale)", borderRadius: "50%", border: "1px solid var(--saff-lt)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 14, color: "var(--saff)",
                                }}>{deva}</div>
                                <div>
                                    <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 19, fontWeight: 500, color: "var(--ink)", marginBottom: 2 }}>{title}</div>
                                    <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.75 }}>{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

*//* Small hillside SVG used in About *//*
function AshramIllustration() {
    return (
        <svg viewBox="0 0 400 320" width="88%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FDEBD0" /><stop offset="100%" stopColor="#F8F3E8" /></linearGradient>
                <linearGradient id="hillG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6B8C56" /><stop offset="100%" stopColor="#4A6B38" /></linearGradient>
                <linearGradient id="hill2G" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#90AF78" /><stop offset="100%" stopColor="#5C7A4A" /></linearGradient>
            </defs>
            <rect width="400" height="320" fill="url(#skyG)" />
            <circle cx="200" cy="90" r="38" fill="#F2C96E" opacity=".45" />
            <circle cx="200" cy="90" r="26" fill="#E8A830" opacity=".65" />
            <ellipse cx="200" cy="290" rx="230" ry="120" fill="url(#hillG)" opacity=".6" />
            <ellipse cx="200" cy="320" rx="210" ry="95" fill="url(#hill2G)" />
            <g transform="translate(164,85)">
                <rect x="26" y="8" width="20" height="6" fill="#D08030" opacity=".8" />
                <rect x="22" y="14" width="28" height="7" fill="#C07020" opacity=".8" />
                <rect x="16" y="21" width="40" height="8" fill="#B86020" opacity=".8" />
                <rect x="8" y="29" width="56" height="9" fill="#D08030" opacity=".75" />
                <rect x="2" y="38" width="68" height="6" fill="#C07020" opacity=".7" />
                <rect x="8" y="44" width="56" height="56" fill="#E0C090" opacity=".8" />
                <rect x="28" y="62" width="16" height="24" rx="1" fill="#8B6030" opacity=".55" />
                <line x1="36" y1="0" x2="36" y2="14" stroke="#C07020" strokeWidth="1.5" opacity=".7" />
                <polygon points="36,0 46,5 36,10" fill="#C07020" opacity=".7" />
            </g>
            <g transform="translate(48,168)">
                <polygon points="0,30 38,0 76,30" fill="#B89060" opacity=".7" />
                <rect x="6" y="30" width="64" height="34" fill="#D4B080" opacity=".8" />
                <rect x="28" y="38" width="18" height="26" rx="1" fill="#906828" opacity=".5" />
            </g>
            <g opacity=".8">
                <rect x="98" y="155" width="5" height="38" fill="#5C3D18" /><ellipse cx="100" cy="143" rx="17" ry="22" fill="#4A6B38" />
                <rect x="308" y="158" width="4" height="32" fill="#5C3D18" /><ellipse cx="310" cy="147" rx="14" ry="18" fill="#5C7A4A" />
            </g>
            <path d="M152,320 Q188,240 200,200 Q212,240 248,320" stroke="#C8A878" strokeWidth="2.5" fill="none" opacity=".4" />
        </svg>
    );
}

*//* ══════════════════════════════════════════
   ACTIVITIES
══════════════════════════════════════════ *//*
const ACCENT_STYLES = {
    saff: { border: "var(--saff)", bg: "#C47B2B" },
    earth: { border: "var(--earth)", bg: "#5A7845" },
    bark: { border: "var(--bark)", bg: "#7A5435" },
};

export function Activities() {
    const { ref, isVisible } = useReveal();
    return (
        <section id="activities" className="section" style={{ background: "var(--saff-pale)", borderTop: "1px solid var(--border-soft)", borderBottom: "1px solid var(--border-soft)" }}>
            <div className="s-inner">
                <div ref={ref} className={isVisible ? "reveal visible" : "reveal"} style={{ maxWidth: 600, marginBottom: 52 }}>
                    <div className="s-eyebrow">What We Do</div>
                    <h2 className="s-title">Activities &amp; <em>Programs</em></h2>
                    <div className="rule" />
                    <p style={{ fontSize: 15.5, color: "var(--ink-mid)", lineHeight: 1.9 }}>From dawn prayers to Vedic recitation, ashram life weaves learning, ritual, and nature into a single unbroken thread.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
                    {ACTIVITIES.map((act, i) => {
                        const delay = ["", "reveal-delay-1", "reveal-delay-2"][i % 3];
                        return (
                            <div
                                key={act.title}
                                className={`${isVisible ? "reveal visible" : "reveal"} ${delay}`}
                                style={{
                                    background: "var(--cream)", border: "1px solid var(--border)",
                                    borderRadius: 6, padding: "28px 24px",
                                    position: "relative", overflow: "hidden",
                                    transition: `transform .25s, box-shadow .25s`,
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(42,28,12,.08)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                            >
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: ACCENT_STYLES[act.accent].bg, opacity: 0.55 }} />
                                <div style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 27, color: "var(--saff)", opacity: 0.65, marginBottom: 10, display: "block" }}>{act.deva}</div>
                                <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 21, fontWeight: 500, color: "var(--ink)", marginBottom: 8 }}>{act.title}</div>
                                <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.8 }}>{act.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

*//* ══════════════════════════════════════════
   BELIEVES
══════════════════════════════════════════ *//*
export function Believes() {
    const { ref, isVisible } = useReveal();
    return (
        <section id="believes" className="section" style={{ background: "var(--ink)" }}>
            <div className="s-inner" ref={ref}>
                <div className={isVisible ? "reveal visible" : "reveal"} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 64, alignItems: "end" }}>
                    <div>
                        <div className="s-eyebrow" style={{ color: "var(--saff-lt)" }}>Our Philosophy</div>
                        <h2 className="s-title" style={{ color: "var(--cream)" }}>What We <em style={{ color: "var(--saff-warm)" }}>Believe</em></h2>
                        <div className="rule" style={{ background: "var(--saff-warm)" }} />
                    </div>
                    <p style={{ fontSize: 15.5, color: "rgba(255,255,255,.5)", lineHeight: 1.95, maxWidth: 460 }}>
                        Our teachings are rooted in timeless principles that have guided Vedic civilisation for thousands of years — shaping every moment of ashram life from the first prayer at dawn to the last lamp at dusk.
                    </p>
                </div>

                <div className={`${isVisible ? "reveal visible" : "reveal"} reveal-delay-1`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
                    {BELIEFS.map(({ num, title, text }) => (
                        <div key={num} style={{ borderLeft: "2px solid var(--saff-warm)", paddingLeft: 26 }}>
                            <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 13, color: "rgba(255,255,255,.25)", letterSpacing: ".12em", marginBottom: 8 }}>{num}</div>
                            <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 22, fontWeight: 500, color: "var(--cream)", marginBottom: 10 }}>{title}</div>
                            <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.5)", lineHeight: 1.85 }}>{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

*//* ══════════════════════════════════════════
   RESOURCES
══════════════════════════════════════════ *//*
const TYPE_BG = { saff: "var(--saff)", earth: "var(--earth)", bark: "var(--bark)" };

export function Resources() {
    const { ref, isVisible } = useReveal();
    const [hovered, setHovered] = useState(null);

    return (
        <section id="resources" style={{ background: "var(--cream)", display: "grid", gridTemplateColumns: "300px 1fr" }}>
            {*//* Sidebar *//*}
            <div style={{ background: "var(--earth)", padding: "100px 44px 100px 7%" }}>
                <div className="s-eyebrow" style={{ color: "rgba(255,255,255,.55)" }}>Knowledge Vault</div>
                <h2 className="s-title" style={{ color: "#fff", fontSize: 40 }}>Resources</h2>
                <div className="rule" style={{ background: "rgba(255,255,255,.35)" }} />
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.6)", lineHeight: 1.85, marginTop: 16 }}>
                    A growing library of Vedic texts, audio recordings, study guides, and video lectures — freely available to all seekers of knowledge.
                </p>
            </div>

            {*//* List *//*}
            <div ref={ref} className={isVisible ? "reveal visible" : "reveal"} style={{ padding: "100px 7% 100px 56px" }}>
                {RESOURCES.map((r, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex", alignItems: "center", gap: 22,
                            padding: "20px 14px",
                            borderBottom: "1px solid var(--border-soft)",
                            borderTop: i === 0 ? "1px solid var(--border-soft)" : "none",
                            background: hovered === i ? "var(--saff-pale)" : "transparent",
                            transition: "background .2s", borderRadius: 4,
                        }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <span style={{
                            fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
                            color: "#fff", padding: "3px 10px", borderRadius: 3,
                            background: TYPE_BG[r.typeColor] ?? "var(--earth)",
                            whiteSpace: "nowrap", flexShrink: 0,
                        }}>{r.type}</span>
                        <span style={{ fontFamily: "'EB Garamond',serif", fontSize: 19, fontWeight: 500, color: "var(--ink)", flex: 1 }}>{r.title}</span>
                        <a href="#" style={{ fontSize: 12.5, fontWeight: 600, color: "var(--saff)", textDecoration: "none", whiteSpace: "nowrap" }}>{r.link}</a>
                    </div>
                ))}
            </div>
        </section>
    );
}

*//* ══════════════════════════════════════════
   THE ASHRAM
══════════════════════════════════════════ *//*
export function TheAshram() {
    const { ref, isVisible } = useReveal();
    return (
        <section id="the-ashram" className="section" style={{ background: "var(--earth-pale)", borderTop: "1px solid rgba(90,120,69,.12)" }}>
            <div className="s-inner">
                <div ref={ref} className={isVisible ? "reveal visible" : "reveal"} style={{ maxWidth: 600, marginBottom: 52 }}>
                    <div className="s-eyebrow">Sacred Space</div>
                    <h2 className="s-title">The <em>Ashram</em></h2>
                    <div className="rule" />
                    <p style={{ fontSize: 15.5, color: "var(--ink-mid)", lineHeight: 1.9 }}>
                        Located on a sacred hill near Bhramakhel, Sankhu, our ashram is both a place of deep learning and a sanctuary of inner peace. The ancient temple beside us has stood for centuries — a silent witness to lives transformed.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
                    <div className={isVisible ? "reveal visible" : "reveal"}>
                        {*//* Photo placeholder *//*}
                        <div style={{
                            aspectRatio: "3/2", background: "linear-gradient(145deg, var(--earth-lt), var(--cream-dark))",
                            borderRadius: 6, border: "1px solid var(--border)",
                            display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                        }}>
                            <span style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 64, color: "var(--earth)", opacity: 0.35 }}>ॐ</span>
                        </div>

                        {*//* Quote *//*}
                        <div style={{ marginTop: 24, background: "var(--cream)", border: "1px solid var(--border)", borderLeft: "3px solid var(--saff)", borderRadius: "0 6px 6px 0", padding: "22px 20px" }}>
                            <blockquote style={{ fontFamily: "'EB Garamond',serif", fontSize: 19, fontStyle: "italic", color: "var(--bark)", lineHeight: 1.65, marginBottom: 8 }}>
                                "The forest is our classroom, the stars our textbook, and the guru's word our greatest inheritance."
                            </blockquote>
                            <cite style={{ fontSize: 12, color: "var(--ink-soft)", letterSpacing: ".08em", textTransform: "uppercase", fontStyle: "normal" }}>— Taittiriya Upanishad</cite>
                        </div>
                    </div>

                    <div className={`${isVisible ? "reveal visible" : "reveal"} reveal-delay-1`}>
                        <ul style={{ listStyle: "none" }}>
                            {ASHRAM_FEATURES.map((f) => (
                                <li key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "13px 0", borderBottom: "1px solid var(--border-soft)", fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.65 }}>
                                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--saff)", flexShrink: 0, marginTop: 7, opacity: 0.65 }} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 10 }}>
                            {ASHRAM_TAGS.map(({ label }) => (
                                <span key={label} style={{ background: "var(--saff-pale)", border: "1px solid var(--saff-lt)", color: "var(--saff)", fontSize: 12.5, padding: "5px 13px", borderRadius: 14 }}>{label}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

*//* ══════════════════════════════════════════
   FOUNDER
══════════════════════════════════════════ *//*
export function Founder() {
    const { ref, isVisible } = useReveal();
    return (
        <section id="founder" className="section" style={{ background: "var(--saff-pale)", borderTop: "1px solid var(--border-soft)" }}>
            <div className="s-inner">
                <div ref={ref} style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 72, alignItems: "center" }}>

                    {*//* Portrait *//*}
                    <div className={isVisible ? "reveal visible" : "reveal"} style={{ textAlign: "center" }}>
                        <div style={{
                            width: 200, height: 260, margin: "0 auto 20px",
                            background: "linear-gradient(155deg, var(--saff-lt), var(--cream-dark))",
                            border: "2px solid var(--saff-lt)", borderRadius: 6,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 52, color: "var(--saff)", opacity: 0.8,
                            position: "relative", overflow: "hidden",
                        }}>
                            {*//* Replace with: <img src="/founder.jpg" alt="Acharya" style={{width:"100%",height:"100%",objectFit:"cover"}} /> *//*}
                            गु
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: "linear-gradient(90deg,var(--saff),var(--saff-lt))" }} />
                        </div>
                        <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 22, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>Ram Chandra Timalsina</div>
                        <div style={{ fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--saff)" }}>Founder &amp; Head Acharya</div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, background: "var(--earth-pale)", border: "1px solid var(--earth-lt)", borderRadius: 16, padding: "5px 14px", fontSize: 12.5, color: "var(--earth)" }}>
                            🌿 35+ Years of Teaching
                        </div>
                        <div style={{ marginTop: 18, background: "white", border: "1px solid var(--border)", borderRadius: 5, padding: "16px", fontSize: 13.5, color: "var(--ink-mid)", lineHeight: 1.85, textAlign: "left" }}>
                            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 8 }}>Lineage &amp; Training</div>
                            Nepal Bedh Bidhya Ashram<br />Nepal Sanskrit University
                        </div>
                    </div>

                    {*//* Bio *//*}
                    <div className={`${isVisible ? "reveal visible" : "reveal"} reveal-delay-1`}>
                        <div className="s-eyebrow">The Guiding Light</div>
                        <h2 className="s-title">Our <em>Founder</em></h2>
                        <div className="rule" />

                        <p style={{ fontFamily: "'EB Garamond',serif", fontSize: 22, fontStyle: "italic", color: "var(--bark)", lineHeight: 1.65, borderLeft: "3px solid var(--saff-lt)", paddingLeft: 22, marginBottom: 24 }}>
                            "I did not build this ashram — the ashram built itself through the grace of the Vedas and the sincerity of each student who came."
                        </p>

                        {[
                            "Acharya Ram Chandra Timalsina has devoted over three decades to the study, practice, and teaching of Vedic sciences. Born into a traditional brahmin family in Nepal, he received his training in the ancient gurukul tradition before pursuing formal studies in Sanskrit.",
                            "Inspired by the vision of making Vedic education freely accessible to every child, he returned to Kaishake and established this ashram on a hilltop near the ancient Shiva temple, with nothing but faith, dedication, and a handful of devoted students.",
                            "Today, the Acharya continues to teach, perform Vedic rituals for the community, and guide the ashram's work — rising before dawn each day, leading morning prayers at the temple, and teaching through the morning.",
                        ].map((para, i) => (
                            <p key={i} style={{ fontSize: 15.5, color: "var(--ink-mid)", lineHeight: 1.95, marginBottom: 14 }}>{para}</p>
                        ))}

                        <div style={{ marginTop: 24, padding: "20px 22px", background: "white", border: "1px solid var(--border)", borderLeft: "3px solid var(--earth)", borderRadius: "0 5px 5px 0" }}>
                            <p style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 16, color: "var(--earth)", lineHeight: 1.8, marginBottom: 8 }}>
                                गुरुर्ब्रह्मा गुरुर्विष्णुर्गुरुर्देवो महेश्वरः ।<br />
                                गुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः ॥
                            </p>
                            <p style={{ fontSize: 13.5, color: "var(--ink-soft)", fontStyle: "italic" }}>
                                "The Guru is Brahma, Vishnu, Maheshwara; the Guru is the Supreme Brahman itself. We bow to that sacred Guru."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

*//* ══════════════════════════════════════════
   CONTACT
══════════════════════════════════════════ *//*
export function Contact() {
    const { ref, isVisible } = useReveal();
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", purpose: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const update = (k) => (e) => setFormData((p) => ({ ...p, [k]: e.target.value }));

    const handleSubmit = () => {
        if (!formData.name || !formData.email) { alert("Please fill in your name and email."); return; }
        setSubmitted(true);
    };

    return (
        <section id="contact" className="section" style={{ padding: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

                {*//* Info side *//*}
                <div ref={ref} style={{
                    background: "var(--ink)", padding: "96px 7%",
                    color: "white",
                }}>
                    <div className="s-eyebrow" style={{ color: "var(--saff-lt)" }}>Get in Touch</div>
                    <h2 className="s-title" style={{ color: "var(--cream)" }}>Contact <em style={{ color: "var(--saff-warm)" }}>Us</em></h2>
                    <div className="rule" style={{ background: "var(--saff-warm)" }} />
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,.52)", lineHeight: 1.9, marginBottom: 36 }}>
                        We prefer letters written by hand. But for those who are far away, we respond to messages during morning hours. Come visit — the ashram is always open to sincere seekers.
                    </p>

                    {CONTACT_DETAILS.map(({ icon, label, value, sub }) => (
                        <div key={label} style={{ display: "flex", gap: 14, marginBottom: 24, alignItems: "flex-start" }}>
                            <div style={{ width: 38, height: 38, flexShrink: 0, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{icon}</div>
                            <div>
                                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 3 }}>{label}</div>
                                <div style={{ fontSize: 15, color: "rgba(255,255,255,.82)", whiteSpace: "pre-line" }}>{value}</div>
                                {sub && <div style={{ fontSize: 13, color: "rgba(255,255,255,.35)", marginTop: 2 }}>{sub}</div>}
                            </div>
                        </div>
                    ))}

                    {*//* Map placeholder *//*}
                    <div style={{
                        marginTop: 28, height: 180,
                        background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
                        borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                        flexDirection: "column", gap: 8,
                        fontSize: 13, color: "rgba(255,255,255,.3)", textAlign: "center", padding: "0 20px",
                    }}>
                        {*//* Replace with: <iframe src="https://maps.google.com/..." width="100%" height="180" style={{border:0}} /> *//*}
                        <span style={{ fontSize: 28, opacity: 0.3 }}>🗺️</span>
                        <div>Google Maps — Embed your iframe here</div>
                        <div style={{ fontSize: 12, opacity: 0.6 }}>Replace this placeholder with a Google Maps &lt;iframe&gt;</div>
                    </div>
                </div>

                {*//* Form side *//*}
                <div className={isVisible ? "reveal visible" : "reveal"} style={{ background: "var(--saff-pale)", padding: "96px 7%" }}>
                    <div className="s-eyebrow">Send a Message</div>
                    <h2 style={{ fontFamily: "'EB Garamond',serif", fontSize: 30, color: "var(--ink)", marginBottom: 8, fontWeight: 400 }}>
                        We'd love to<br /><em style={{ color: "var(--saff)" }}>hear from you</em>
                    </h2>
                    <div className="rule" />
                    <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.85, marginBottom: 28 }}>
                        Whether you are seeking admission, requesting a puja, or simply wishing to connect — write from the heart.
                    </p>

                    {!submitted ? (
                        <>
                            <div className="f-group">
                                <label className="f-label">Your Full Name</label>
                                <input className="f-input" placeholder="e.g. Sita Devi Sharma" value={formData.name} onChange={update("name")} />
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                <div className="f-group">
                                    <label className="f-label">Email Address</label>
                                    <input type="email" className="f-input" placeholder="your@email.com" value={formData.email} onChange={update("email")} />
                                </div>
                                <div className="f-group">
                                    <label className="f-label">Phone (optional)</label>
                                    <input className="f-input" placeholder="+977 ..." value={formData.phone} onChange={update("phone")} />
                                </div>
                            </div>
                            <div className="f-group">
                                <label className="f-label">Purpose of Contact</label>
                                <select className="f-input" style={{ cursor: "pointer" }} value={formData.purpose} onChange={update("purpose")}>
                                    <option value="">Select a purpose...</option>
                                    <option>Admission Inquiry</option>
                                    <option>Puja / Ritual Request</option>
                                    <option>Get Involved / Donation</option>
                                    <option>Visit to the Ashram</option>
                                    <option>Resource / Study Material</option>
                                    <option>General Inquiry</option>
                                </select>
                            </div>
                            <div className="f-group">
                                <label className="f-label">Your Message</label>
                                <textarea className="f-input" placeholder="Write freely. There is no wrong way to reach out to the ashram." value={formData.message} onChange={update("message")} />
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ width: "100%", justifyContent: "center", borderRadius: 5, fontSize: 14, padding: 14 }}
                                onClick={handleSubmit}
                            >
                                🙏 Send Message
                            </button>
                        </>
                    ) : (
                        <div style={{ textAlign: "center", padding: "36px 24px", background: "var(--earth-pale)", border: "1px solid var(--earth-lt)", borderRadius: 6 }}>
                            <div style={{ fontSize: 36, marginBottom: 12 }}>🙏</div>
                            <p style={{ fontFamily: "'EB Garamond',serif", fontSize: 19, color: "var(--earth)", lineHeight: 1.6, marginBottom: 10 }}>
                                Pranam! Your message has reached the ashram.<br />We will reply within 3–5 working days.
                            </p>
                            <div style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 18, color: "var(--earth)", marginTop: 12, opacity: 0.65 }}>शुभमस्तु</div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

*//* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ *//*
export function Footer() {
    return (
        <footer style={{ background: "var(--ink)", color: "rgba(255,255,255,.32)", padding: "28px 7%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 13, letterSpacing: ".03em" }}>
            <div style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 19, color: "rgba(196,123,43,.5)", letterSpacing: ".1em" }}>
                ॐ शान्तिः शान्तिः शान्तिः
            </div>
            <div>© 2026 Kaushike Vaidik Gurukul Vidyalaya · Sankhu, Nepal</div>
            <div style={{ display: "flex", gap: 12 }}>
                {["#contact", "#get-involved", "#gallery", "#resources"].map((href) => (
                    <a key={href} href={href} style={{ color: "rgba(196,123,43,.55)", textDecoration: "none" }}>
                        {href.replace("#", "").replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </a>
                ))}
            </div>
        </footer>
    );
}
*/

/*import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import {
    ACTIVITIES, BELIEFS, RESOURCES,
    ASHRAM_FEATURES, ASHRAM_TAGS, CONTACT_DETAILS,
} from "../data/content";
import "./sections.css";*/

/* ══════════════════════════════════════════
   ABOUT
══════════════════════════════════════════ */
export function About() {
    const { ref, isVisible } = useReveal();
    const v = (d = "") => `${isVisible ? "reveal visible" : "reveal"} ${d}`.trim();

    return (
        <section id="about" className="section" style={{ background: "var(--cream)" }}>
            <div className="s-inner about-grid">
                <div ref={ref} className={v()}>
                    <div className="about-img-wrap">
                        <div className="about-img-frame" />
                        <div className="about-photo"><AshramSVG /></div>
                    </div>
                </div>

                <div className={v("reveal-delay-1")}>
                    <div className="s-eyebrow">About the Ashram</div>
                    <h2 className="s-title">Rooted in the<br /><em>Hillside</em>, Open to All</h2>
                    <div className="rule" />
                    <p className="body-p">
                        Kaushike Vaidik Gurukul Vidyalaya rests on a gentle hill overlooking an ancient Shiva
                        temple near Sankhu. The forest above and the stream below are our eternal companions.
                        We follow the unbroken tradition of the gurukul — where teacher and student live, learn,
                        and grow together.
                    </p>
                    <p className="body-p mt14">
                        Education here is completely free of charge. Students are received not as pupils but
                        as children of the ashram — nourished, taught, and guided without any fees.
                    </p>
                    <div className="about-values">
                        {[
                            { deva: "ज्ञ", title: "Free Sanskrit Education", desc: "From beginner Devanagari to advanced Vedic recitation — all without charge." },
                            { deva: "तप", title: "Disciplined Ashram Life", desc: "Early rising, nature connection, and structured daily sadhana build character." },
                            { deva: "पूज", title: "Rituals & Sacred Services", desc: "The ashram performs a full range of Vedic pujas and rituals for families." },
                        ].map(({ deva, title, desc }) => (
                            <div key={title} className="val-row">
                                <div className="val-icon">{deva}</div>
                                <div><div className="val-title">{title}</div><div className="val-desc">{desc}</div></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function AshramSVG() {
    return (
        <svg viewBox="0 0 400 320" width="88%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FDEBD0" /><stop offset="100%" stopColor="#F8F3E8" /></linearGradient>
                <linearGradient id="hG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6B8C56" /><stop offset="100%" stopColor="#4A6B38" /></linearGradient>
                <linearGradient id="h2G" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#90AF78" /><stop offset="100%" stopColor="#5C7A4A" /></linearGradient>
            </defs>
            <rect width="400" height="320" fill="url(#sG)" />
            <circle cx="200" cy="90" r="38" fill="#F2C96E" opacity=".45" />
            <circle cx="200" cy="90" r="26" fill="#E8A830" opacity=".65" />
            <ellipse cx="200" cy="290" rx="230" ry="120" fill="url(#hG)" opacity=".6" />
            <ellipse cx="200" cy="320" rx="210" ry="95" fill="url(#h2G)" />
            <g transform="translate(164,85)">
                <rect x="26" y="8" width="20" height="6" fill="#D08030" opacity=".8" />
                <rect x="22" y="14" width="28" height="7" fill="#C07020" opacity=".8" />
                <rect x="16" y="21" width="40" height="8" fill="#B86020" opacity=".8" />
                <rect x="8" y="29" width="56" height="9" fill="#D08030" opacity=".75" />
                <rect x="2" y="38" width="68" height="6" fill="#C07020" opacity=".7" />
                <rect x="8" y="44" width="56" height="56" fill="#E0C090" opacity=".8" />
                <rect x="28" y="62" width="16" height="24" rx="1" fill="#8B6030" opacity=".55" />
                <line x1="36" y1="0" x2="36" y2="14" stroke="#C07020" strokeWidth="1.5" opacity=".7" />
                <polygon points="36,0 46,5 36,10" fill="#C07020" opacity=".7" />
            </g>
            <g transform="translate(48,168)">
                <polygon points="0,30 38,0 76,30" fill="#B89060" opacity=".7" />
                <rect x="6" y="30" width="64" height="34" fill="#D4B080" opacity=".8" />
                <rect x="28" y="38" width="18" height="26" rx="1" fill="#906828" opacity=".5" />
            </g>
            <g opacity=".8">
                <rect x="98" y="155" width="5" height="38" fill="#5C3D18" />
                <ellipse cx="100" cy="143" rx="17" ry="22" fill="#4A6B38" />
                <rect x="308" y="158" width="4" height="32" fill="#5C3D18" />
                <ellipse cx="310" cy="147" rx="14" ry="18" fill="#5C7A4A" />
            </g>
            <path d="M152,320 Q188,240 200,200 Q212,240 248,320" stroke="#C8A878" strokeWidth="2.5" fill="none" opacity=".4" />
        </svg>
    );
}

/* ══════════════════════════════════════════
   ACTIVITIES
══════════════════════════════════════════ */
const ACCENT_BG = { saff: "#C47B2B", earth: "#5A7845", bark: "#7A5435" };

export function Activities() {
    const { ref, isVisible } = useReveal();
    const v = (d = "") => `${isVisible ? "reveal visible" : "reveal"} ${d}`.trim();
    return (
        <section id="activities" className="section act-section">
            <div className="s-inner">
                <div ref={ref} className={v()} style={{ maxWidth: 600, marginBottom: 52 }}>
                    <div className="s-eyebrow">What We Do</div>
                    <h2 className="s-title">Activities &amp; <em>Programs</em></h2>
                    <div className="rule" />
                    <p className="body-p">From dawn prayers to Vedic recitation, ashram life weaves learning, ritual, and nature into a single unbroken thread.</p>
                </div>
                <div className="act-grid">
                    {ACTIVITIES.map((act, i) => (
                        <div key={act.title} className={`act-card ${v(["", "reveal-delay-1", "reveal-delay-2"][i % 3])}`}>
                            <div className="act-bar" style={{ background: ACCENT_BG[act.accent] }} />
                            <span className="act-deva">{act.deva}</span>
                            <div className="act-title">{act.title}</div>
                            <p className="act-desc">{act.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   BELIEVES
══════════════════════════════════════════ */
export function Believes() {
    const { ref, isVisible } = useReveal();
    const v = (d = "") => `${isVisible ? "reveal visible" : "reveal"} ${d}`.trim();
    return (
        <section id="believes" className="section" style={{ background: "var(--ink)" }}>
            <div className="s-inner" ref={ref}>
                <div className={`${v()} believes-head`}>
                    <div>
                        <div className="s-eyebrow" style={{ color: "var(--saff-lt)" }}>Our Philosophy</div>
                        <h2 className="s-title" style={{ color: "var(--cream)" }}>What We <em style={{ color: "var(--saff-warm)" }}>Believe</em></h2>
                        <div className="rule" style={{ background: "var(--saff-warm)" }} />
                    </div>
                    <p className="believes-intro">Our teachings are rooted in timeless principles that have guided Vedic civilisation for thousands of years — shaping every moment of ashram life.</p>
                </div>
                <div className={`${v("reveal-delay-1")} beliefs-grid`}>
                    {BELIEFS.map(({ num, title, text }) => (
                        <div key={num} className="belief-item">
                            <div className="belief-num">{num}</div>
                            <div className="belief-title">{title}</div>
                            <p className="belief-text">{text}</p>
                        </div>
                    ))}
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
    const { ref, isVisible } = useReveal();
    const [hovered, setHovered] = useState(null);
    return (
        <section id="resources" className="resources-layout">
            <div className="res-sidebar">
                <div className="s-eyebrow" style={{ color: "rgba(255,255,255,.55)" }}>Knowledge Vault</div>
                <h2 className="s-title" style={{ color: "#fff", fontSize: "clamp(26px,3.5vw,40px)" }}>Resources</h2>
                <div className="rule" style={{ background: "rgba(255,255,255,.35)" }} />
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.6)", lineHeight: 1.85, marginTop: 16 }}>A growing library of Vedic texts, audio recordings, study guides, and video lectures — freely available to all.</p>
            </div>
            <div ref={ref} className={`res-content ${isVisible ? "reveal visible" : "reveal"}`}>
                {RESOURCES.map((r, i) => (
                    <div key={i} className="res-row" style={{ background: hovered === i ? "var(--saff-pale)" : "transparent" }}
                        onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                        <span className="res-type-badge" style={{ background: TYPE_BG[r.typeColor] ?? "var(--earth)" }}>{r.type}</span>
                        <span className="res-name">{r.title}</span>
                        <a href="#" className="res-link">{r.link}</a>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   THE ASHRAM
══════════════════════════════════════════ */
export function TheAshram() {
    const { ref, isVisible } = useReveal();
    const v = (d = "") => `${isVisible ? "reveal visible" : "reveal"} ${d}`.trim();
    return (
        <section id="the-ashram" className="section" style={{ background: "var(--earth-pale)", borderTop: "1px solid rgba(90,120,69,.12)" }}>
            <div className="s-inner">
                <div ref={ref} className={v()} style={{ maxWidth: 600, marginBottom: 52 }}>
                    <div className="s-eyebrow">Sacred Space</div>
                    <h2 className="s-title">The <em>Ashram</em></h2>
                    <div className="rule" />
                    <p className="body-p">Located on a sacred hill near Bhramakhel, Sankhu, our ashram is both a place of deep learning and a sanctuary of inner peace. The ancient temple beside us has stood for centuries.</p>
                </div>
                <div className="ashram-grid">
                    <div className={v()}>
                        <div className="ashram-photo">
                            <span style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 64, color: "var(--earth)", opacity: .35 }}>ॐ</span>
                        </div>
                        <div className="ashram-quote">
                            <blockquote>"The forest is our classroom, the stars our textbook, and the guru's word our greatest inheritance."</blockquote>
                            <cite>— Taittiriya Upanishad</cite>
                        </div>
                    </div>
                    <div className={v("reveal-delay-1")}>
                        <ul className="ashram-list">
                            {ASHRAM_FEATURES.map(f => (
                                <li key={f}><div className="ashram-bullet" />{f}</li>
                            ))}
                        </ul>
                        <div className="ashram-tags">
                            {ASHRAM_TAGS.map(({ label }) => (
                                <span key={label} className="ashram-tag">{label}</span>
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
    const { ref, isVisible } = useReveal();
    const v = (d = "") => `${isVisible ? "reveal visible" : "reveal"} ${d}`.trim();
    return (
        <section id="founder" className="section" style={{ background: "var(--saff-pale)", borderTop: "1px solid var(--border-soft)" }}>
            <div className="s-inner">
                <div ref={ref} className="founder-grid">
                    <div className={`${v()} founder-portrait`}>
                        <div className="founder-img">
                            <span>गु</span>
                            <div className="founder-img-bar" />
                        </div>
                        <div className="founder-name">Ram Chandra Timalsina</div>
                        <div className="founder-role">Founder &amp; Head Acharya</div>
                        <div className="founder-badge">🌿 35+ Years of Teaching</div>
                        <div className="founder-lineage">
                            <div className="founder-lineage-label">Lineage &amp; Training</div>
                            Nepal Bedh Bidhya Ashram<br />Nepal Sanskrit University
                        </div>
                    </div>
                    <div className={v("reveal-delay-1")}>
                        <div className="s-eyebrow">The Guiding Light</div>
                        <h2 className="s-title">Our <em>Founder</em></h2>
                        <div className="rule" />
                        <p className="founder-pull">"I did not build this ashram — the ashram built itself through the grace of the Vedas and the sincerity of each student who came."</p>
                        {[
                            "Acharya Ram Chandra Timalsina has devoted over three decades to the study, practice, and teaching of Vedic sciences. Born into a traditional brahmin family in Nepal, he received his training in the ancient gurukul tradition before pursuing formal studies in Sanskrit.",
                            "Inspired by the vision of making Vedic education freely accessible to every child, he returned to Kaishake and established this ashram on a hilltop near the ancient Shiva temple, with nothing but faith, dedication, and a handful of devoted students.",
                            "Today, the Acharya continues to teach, perform Vedic rituals for the community, and guide the ashram's work — rising before dawn each day, leading morning prayers at the temple, and teaching through the morning.",
                        ].map((p, i) => <p key={i} className="founder-bio">{p}</p>)}
                        <div className="founder-verse">
                            <p className="founder-verse-deva">गुरुर्ब्रह्मा गुरुर्विष्णुर्गुरुर्देवो महेश्वरः ।<br />गुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः ॥</p>
                            <p className="founder-verse-en">"The Guru is Brahma, Vishnu, Maheshwara; the Guru is the Supreme Brahman itself. We bow to that sacred Guru."</p>
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
    const { ref, isVisible } = useReveal();
    const v = (d = "") => `${isVisible ? "reveal visible" : "reveal"} ${d}`.trim();
    const [form, setForm] = useState({ name: "", email: "", phone: "", purpose: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const upd = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
    const submit = () => {
        if (!form.name || !form.email) { alert("Please fill in your name and email."); return; }
        setSubmitted(true);
    };

    return (
        <section id="contact" style={{ padding: 0, width: "100%" }}>
            <div className="contact-layout">
                <div ref={ref} className="contact-info-side">
                    <div className="s-eyebrow" style={{ color: "var(--saff-lt)" }}>Get in Touch</div>
                    <h2 className="s-title" style={{ color: "var(--cream)" }}>Contact <em style={{ color: "var(--saff-warm)" }}>Us</em></h2>
                    <div className="rule" style={{ background: "var(--saff-warm)" }} />
                    <p className="contact-intro">We prefer letters written by hand. But for those who are far away, we respond to messages during morning hours. The ashram is always open to sincere seekers.</p>
                    {CONTACT_DETAILS.map(({ icon, label, value, sub }) => (
                        <div key={label} className="c-detail">
                            <div className="c-icon">{icon}</div>
                            <div>
                                <div className="c-label">{label}</div>
                                <div className="c-val">{value}</div>
                                {sub && <div className="c-sub">{sub}</div>}
                            </div>
                        </div>
                    ))}
                    <div className="map-placeholder">
                        {/* Replace with: <iframe src="https://maps.google.com/..." width="100%" height="180" style={{border:0}} /> */}
                        <span style={{ fontSize: 28, opacity: .3 }}>🗺️</span>
                        <div>Google Maps — Embed your iframe here</div>
                        <div style={{ fontSize: 12, opacity: .6 }}>Replace this placeholder with a Google Maps &lt;iframe&gt;</div>
                    </div>
                </div>

                <div className={`contact-form-side ${v("reveal-delay-1")}`}>
                    <div className="s-eyebrow">Send a Message</div>
                    <h2 className="contact-form-title">We'd love to<br /><em style={{ color: "var(--saff)" }}>hear from you</em></h2>
                    <div className="rule" />
                    <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.85, marginBottom: 28 }}>Whether you are seeking admission, requesting a puja, or simply wishing to connect — write from the heart.</p>

                    {!submitted ? (
                        <>
                            <div className="f-group">
                                <label className="f-label">Your Full Name</label>
                                <input className="f-input" placeholder="e.g. Sita Devi Sharma" value={form.name} onChange={upd("name")} />
                            </div>
                            <div className="f-row-2">
                                <div className="f-group" style={{ marginBottom: 0 }}>
                                    <label className="f-label">Email Address</label>
                                    <input type="email" className="f-input" placeholder="your@email.com" value={form.email} onChange={upd("email")} />
                                </div>
                                <div className="f-group" style={{ marginBottom: 0 }}>
                                    <label className="f-label">Phone (optional)</label>
                                    <input className="f-input" placeholder="+977 ..." value={form.phone} onChange={upd("phone")} />
                                </div>
                            </div>
                            <div className="f-group" style={{ marginTop: 18 }}>
                                <label className="f-label">Purpose of Contact</label>
                                <select className="f-input" style={{ cursor: "pointer" }} value={form.purpose} onChange={upd("purpose")}>
                                    <option value="">Select a purpose...</option>
                                    <option>Admission Inquiry</option>
                                    <option>Puja / Ritual Request</option>
                                    <option>Get Involved / Donation</option>
                                    <option>Visit to the Ashram</option>
                                    <option>Resource / Study Material</option>
                                    <option>General Inquiry</option>
                                </select>
                            </div>
                            <div className="f-group">
                                <label className="f-label">Your Message</label>
                                <textarea className="f-input" placeholder="Write freely. There is no wrong way to reach out to the ashram." value={form.message} onChange={upd("message")} />
                            </div>
                            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", borderRadius: 5, fontSize: 14, padding: 14 }} onClick={submit}>
                                🙏 Send Message
                            </button>
                        </>
                    ) : (
                        <div className="contact-success">
                            <div style={{ fontSize: 36, marginBottom: 12 }}>🙏</div>
                            <p>Pranam! Your message has reached the ashram.<br />We will reply within 3–5 working days.</p>
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
    return (
        <footer className="site-footer">
            <div className="footer-om">ॐ शान्तिः शान्तिः शान्तिः</div>
            <div>© 2026 Kaushike Vaidik Gurukul Vidyalaya · Sankhu, Nepal</div>
            <div className="footer-links">
                {[["#contact", "Contact"], ["#get-involved", "Get Involved"], ["#gallery", "Gallery"], ["#resources", "Resources"]].map(([href, label]) => (
                    <a key={href} href={href} className="footer-link">{label}</a>
                ))}
            </div>
        </footer>
    );
}