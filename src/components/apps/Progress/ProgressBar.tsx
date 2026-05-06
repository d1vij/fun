import { cn } from "@d1vij/shit-i-always-use";
import type { StateSetterFunction } from "@d1vij/shit-i-always-use/react";
import { motion } from "motion/react";
import { round } from "radashi";
import { useEffect, useRef, useState } from "react";

/**
 * A function that drives progress bar state.
 * Calls `setProgress` and `setMax` to update the bar.
 * Optionally returns a cleanup function (e.g. to clear timers or intervals).
 *
 * Progress percentage is automatically caclulated with the help of set progress and max values,
 *  and the transition between values is tweened as well.
 */
export type ProgressFunction = (
    setProgress: StateSetterFunction<number>,
    setMax: StateSetterFunction<number>,
) => undefined | (() => void);

type ProgressBarProps = {
    fn: ProgressFunction;
    title: string;
    emoji: string;
    remainingLabel: string;
};

/**
 * An animated progress bar driven by an external `ProgressFunction`.
 */
export default function ProgressBar(props: ProgressBarProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [max, setMax] = useState(progress);

    useEffect(() => {
        return props.fn(setProgress, setMax);
    }, [props.fn]);

    const percent = (progress / max) * 100;

    return (
        <div>
            <div className="mb-2 flex w-full items-center justify-between font-semibold text-xl md:text-2xl">
                <h2 className="flex gap-4">
                    {props.emoji} {props.title}
                </h2>

                <span className="flex w-ull gap-2">
                    <span>{round(Math.max(max - progress, 0), 0)}</span>
                    <span>{props.remainingLabel}</span>
                </span>
            </div>
            <div
                ref={wrapperRef}
                className={cn(
                    "h-11 w-full overflow-clip rounded bg-neutral-100",
                )}
            >
                <motion.div
                    className="h-full w-0 bg-emerald-500"
                    animate={{
                        width: `${percent || 1}%`,
                        transition: {
                            duration: 0.2,
                        },
                    }}
                ></motion.div>
            </div>
        </div>
    );
}
