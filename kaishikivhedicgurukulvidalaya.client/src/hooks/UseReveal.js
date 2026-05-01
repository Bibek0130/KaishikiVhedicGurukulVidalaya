import { useEffect, useRef, useState } from "react";

/**
 * useReveal — triggers a CSS class when an element enters the viewport.
 * Usage:
 *   const { ref, isVisible } = useReveal();
 *   <div ref={ref} className={isVisible ? "reveal visible" : "reveal"} />
 */
export function useReveal(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el); // trigger once
                }
            },
            { threshold: options.threshold ?? 0.07, ...options }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
}

/**
 * useScrollSpy — returns the id of the section currently in view.
 * Usage: const activeId = useScrollSpy(["hero","about","contact"]);
 */
export function useScrollSpy(ids = [], offset = 80) {
    const [activeId, setActiveId] = useState(ids[0] ?? "");

    useEffect(() => {
        const handler = () => {
            let current = ids[0];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - offset) current = id;
            }
            setActiveId(current);
        };

        window.addEventListener("scroll", handler, { passive: true });
        handler(); // run once on mount
        return () => window.removeEventListener("scroll", handler);
    }, [ids, offset]);

    return activeId;
}