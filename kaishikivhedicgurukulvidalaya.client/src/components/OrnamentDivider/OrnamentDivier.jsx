/**
 * OrnamentDivider — the Sanskrit-pattern divider used between sections.
 * Props:
 *   text    — Devanagari / Sanskrit text to show in the centre (default: "ॐ तत् सत् ॐ")
 *   bg      — background colour (CSS value, default transparent)
 *   padding — vertical padding (default "0")
 */
export default function OrnamentDivider({
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