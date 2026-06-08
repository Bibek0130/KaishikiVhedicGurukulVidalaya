import useInView from './useInView';
import useCounter from './useCounter';

function StatCounter ({ value, label, suffix = "" }) 
{
    const [ref, inView] = useInView(0.2);
    const count = useCounter(value, inView);
    return (
        <div ref={ref} style={{
            textAlign: "center", padding: "24px 16px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
            <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "3.5rem", fontWeight: 300,
                color: "#c8892a", lineHeight: 1,
                textShadow: "0 0 30px rgba(200,137,42,0.3)",
            }}>{count.toLocaleString()}{suffix}</div>
            <div style={{
                fontSize: "0.8rem", letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#8b6340",
                marginTop: 8, fontWeight: 500,
            }}>{label}</div>
        </div>
    );
}

export default StatCounter;



              