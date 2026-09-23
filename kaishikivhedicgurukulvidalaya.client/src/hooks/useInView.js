import { useRef, useEffect, useState } from 'react';

/**
 * useInView — canonical scroll-reveal hook.
 * Observes the returned ref and flips `inView` to true the first time the
 * element crosses `threshold` of visibility, then stops observing.
 *
 * Usage:
 *   const [ref, inView] = useInView(0.12);
 *   <div ref={ref} className={inView ? "reveal visible" : "reveal"} />
 */
function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    obs.disconnect();
                }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);

    return [ref, inView];
}

export default useInView;
