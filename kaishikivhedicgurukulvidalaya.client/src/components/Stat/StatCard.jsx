import useInView from '../../hooks/useInView'
import useCounter from '../../hooks/useCounter'
import {T } from '../../data/constants'
/* ─────────────────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────────────────── */
export default function StatCard({ stat, index }) {
    const [ref, inView] = useInView(0.25);
    const count = useCounter(stat.value, inView);
    return (
        <div
            ref={ref}
            style={{
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: "6px",
                padding: "var(--space-6) var(--space-5)",
                textAlign: "center",
                boxShadow: `0 2px 18px ${T.shadow}`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(26px)",
                transition: `opacity .8s ease ${index * .12}s, transform .8s ease ${index * .12}s, box-shadow .25s`,
                cursor: "default",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${T.shadowMd}`; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 2px 18px ${T.shadow}`; e.currentTarget.style.transform = "translateY(0)"; }}
        >
            <div style={{ fontSize: "2.4rem", marginBottom: "var(--space-2)" }}>{stat.icon}</div>
            <div style={{ fontFamily: "'EB Garamond', serif", fontSize: "3rem", fontWeight: 500, color: T.saff, lineHeight: 1 }}>
                {count}{stat.suffix}
            </div>
            <div style={{ fontFamily: "'EB Garamond', serif", fontSize: "var(--fs-h4)", color: T.ink, marginTop: "var(--space-2)", fontWeight: 400, lineHeight: 1.35 }}>
                {stat.label}
            </div>
            <div style={{ fontFamily: "'Hind', sans-serif", fontSize: "var(--fs-body-sm)", color: T.inkSoft, marginTop: "var(--space-1)", lineHeight: 1.5 }}>
                {stat.desc}
            </div>
        </div>
    );
}