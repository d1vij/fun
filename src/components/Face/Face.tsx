import { cn } from "@d1vij/shit-i-always-use";
import { useRef } from "react";
import face from "@/assets/face.svg";
import { usePointerAngle } from "@/hooks/usePointerAngle";
import styles from "./styles.module.css";

const units = 2;
function Eye() {
    const ref = useRef<HTMLDivElement | null>(null);
    const angle = usePointerAngle(ref);

    if (ref.current) {
        const offsetX = Math.cos(angle) * -units;
        const offsetY = Math.sin(angle) * -units;
        ref.current.style.transform = `translate(${offsetX}px,${offsetY}px)`;
    }

    return (
        <div className={cn(styles.eyes, "relative bg-white p-0.5")}>
            <div
                ref={ref}
                className={cn(
                    styles.eyeball,
                    "size-1 origin-center rounded-full bg-black",
                )}
            ></div>
        </div>
    );
}

export default function Head() {
    const headRef = useRef<HTMLButtonElement | null>(null);
    const angle = usePointerAngle(headRef);

    if (headRef.current) {
        const offsetX = Math.cos(angle) * units;
        const offsetY = Math.sin(angle) * units;
        headRef.current.style.transform = `translate(${offsetX}px,${offsetY}px)`;
    }

    function handleClick() {
        const elm = headRef.current;
        if (!elm) return;
        console.log(1);
        elm.classList.add(styles.bouncing);
        elm.addEventListener(
            "animationend",
            () => elm.classList.remove(styles.bouncing),
            {
                once: true,
            },
        );
    }

    return (
        <button
            onClick={handleClick}
            type="button"
            ref={headRef}
            className={cn(["relative size-10 cursor-pointer p-2"])}
        >
            {/*Hair*/}
            <img src={face} alt="face" className={styles.face} />
            {/*Eyes*/}
            <div className="absolute top-5 flex justify-center gap-1">
                <Eye />
                <Eye />
            </div>
        </button>
    );
}
