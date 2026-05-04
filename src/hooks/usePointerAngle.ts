import { type RefObject, useEffect, useRef, useState } from "react";

export function usePointerAngle<T extends HTMLElement>(
    ref: RefObject<T | null>,
): number {
    const [angle, setAngle] = useState(0);

    const position = useRef({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        position.current.x = rect.left + rect.width / 2;
        position.current.y = rect.top + rect.height / 2;

        function followMouse(e: MouseEvent) {
            const angle = Math.atan2(
                e.clientY - position.current.y,
                e.clientX - position.current.x,
            );

            // normalize so that +x axis is 0 degrees
            setAngle(angle + Math.PI);
        }
        window.addEventListener("mousemove", followMouse);
        return () => window.removeEventListener("mousemove", followMouse);
    }, [ref]);

    return angle;
}
