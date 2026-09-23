import { useState, useEffect } from 'react';

/**
 * useCounter — canonical count-up hook for stat numbers.
 * Animates from 0 to `target` over `duration` ms (eased ease-out-cubic)
 * once `active` becomes true. Returns the current integer value.
 *
 * Usage:
 *   const [ref, inView] = useInView();
 *   const count = useCounter(50, inView);
 */
function useCounter(target, active, duration = 1800) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!active) return;
        let start = null;
        let frame;
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [active, target, duration]);

    return value;
}

export default useCounter;
