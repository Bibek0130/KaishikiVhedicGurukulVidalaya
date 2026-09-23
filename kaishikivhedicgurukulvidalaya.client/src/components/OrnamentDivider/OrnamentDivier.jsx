/**
 * OrnamentDivider — the Sanskrit-pattern divider used between sections.
 * Props:
 *   text    — Devanagari / Sanskrit text to show in the centre (default: "ॐ तत् सत् ॐ")
 *   bg      — background colour (CSS value, default transparent)
 *   padding — vertical padding (default "0")
 */
import { T } from '../../data/constants';
export default function OrnamentDivier({
    text = "ॐ तत् सत् ॐ",
    bg = "transparent",
    padding = "0",
}) {
    return (
        <div
            className="orn-divider"
            style={{ background: bg, padding: `${padding} 0` }}
        >
            <div className="orn-line" />
            <span className="orn-mark">{text}</span>
            <div className="orn-line r" />
        </div>
    );
}

export function OrnDivider() {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-3)", padding: "var(--space-5) 0" }}>
            <div style={{ height: "1px", width: "80px", background: `linear-gradient(90deg, transparent, ${T.creamDeep})` }} />
            <span style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: "13px", color: T.saff, opacity: .5, letterSpacing: ".22em" }}>
                ✦ ॐ ✦
            </span>
            <div style={{ height: "1px", width: "80px", background: `linear-gradient(90deg, ${T.creamDeep}, transparent)` }} />
        </div>
    );
}

export function Eyebrow({ children }) {
    return (
        <div style={{
            display: "flex", alignItems: "center", gap: "var(--space-3)",
            fontSize: "var(--fs-eyebrow)", fontWeight: 500, letterSpacing: ".2em",
            textTransform: "uppercase", color: T.saff, marginBottom: "var(--space-4)",
        }}>
            <span style={{ display: "block", width: "20px", height: "1px", background: T.saff, opacity: .6, flexShrink: 0 }} />
            {children}
        </div>
    );
}

/* Section title  (matches .s-title) */
export  function STitle({ children }) {
    return (
        <h2 style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "var(--fs-h2)",
            fontWeight: 400, lineHeight: 1.15, color: T.ink, marginBottom: "var(--space-4)",
        }}>
            {children}
        </h2>
    );
}

/* Rule bar  (matches .rule) */
export  function Rule() {
    return <div style={{ width: "34px", height: "1.5px", background: T.saff, opacity: .5, borderRadius: "1px", marginBottom: "var(--space-5)" }} />;
}