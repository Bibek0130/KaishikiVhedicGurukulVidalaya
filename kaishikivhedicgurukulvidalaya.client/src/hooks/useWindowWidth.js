import { useEffect, useState } from "react"; 
export function useWindowWidth() {
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
    useEffect(() => {
        const h = () => setW(window.innerWidth);
        window.addEventListener("resize", h, { passive: true });
        return () => window.removeEventListener("resize", h);
    }, []);
    return w;
}
