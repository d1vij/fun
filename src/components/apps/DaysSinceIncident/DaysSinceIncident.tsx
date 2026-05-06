import { cn } from "@d1vij/shit-i-always-use";
import { Link } from "@tanstack/react-router";
import styles from "./styles.module.css";

function Borders() {
    return (
        <>
            <div className={styles.sideLine}></div>
            <div className={cn(styles.sideLine, styles.vertical)}></div>
            <div
                className={cn(styles.sideLine, styles.vertical, styles.right)}
            ></div>
        </>
    );
}

export default function DaysSinceIncident() {
    return (
        <div className="relative min-h-dvh w-full bg-[#ffc21c] md:p-12 p-8 font-[Iosevka_Charon]">
            <Borders />
            <div className="p-2">
                <div className="w-fit hover:scale-103">
                    <Link className="font-logo text-4xl" to="/">
                        DIVIJ.FUN
                    </Link>
                </div>
            </div>

            {/*Logo*/}
            <div className="mt-12 flex items-center justify-center">
                <div className="h-40 w-70 -rotate-2 rounded-lg border-3 bg-white p-2 md:h-50 md:w-100 md:scale-120 scale-110">
                    <div className="relative flex size-full items-center justify-center rounded-xl border-3 bg-white p-4">
                        <div className="absolute top-2 left-2 size-2.5 rounded-full bg-black"></div>
                        <div className="absolute top-2 right-2 size-2.5 rounded-full bg-black"></div>
                        <div className="absolute bottom-2 left-2 size-2.5 rounded-full bg-black"></div>
                        <div className="absolute right-2 bottom-2 size-2.5 rounded-full bg-black"></div>

                        <h1 className="flex flex-col gap-1 text-center">
                            <span className="font-black text-4xl italic md:text-6xl">
                                Days Since
                            </span>
                            <span className="font-black text-5xl italic md:text-7xl">
                                Incident
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            {/*TODO: add more events*/}
            <div className="mt-20 w-full md:max-w-200 mx-auto space-y-10">
                <Counter
                    count={"XXXXXXX0"}
                    eventName="Earthquake"
                    event="Earthquake"
                    eventOccurance="29 km SSW of Nanwalek, Alaska about 13 minutes ago"
                />

                <Counter
                    count={"XXXXXXX2"}
                    event="Geomagnetic Storm"
                    eventName="Geomagnetic Storm"
                    eventOccurance="detected on May 4, 2026"
                />

                <Counter
                    count={"XXXXXXX2"}
                    eventName="Interplanetary Shock"
                    event="Interplanetary Shock"
                    eventOccurance="detected on May 4, 2026"
                />

                <Counter
                    count={"XXXXXXX2"}
                    eventName="Magnitude 6.0 Earthquake"
                    event="Magnitude 6.0 Earthquake"
                    eventOccurance="5 km WNW of Nera, Philippines on May 4, 2026"
                />

                <Counter
                    count={"XXXXXXX2"}
                    event="Solar Flare"
                    eventName="Class M1.8 solar flare"
                    eventOccurance="on May 4, 2026"
                />

                <Counter
                    count={"XXXXXX16"}
                    eventName="Magnitude 7.0 Earthquake"
                    event="Magnitude 7.0 Earthquake"
                    eventOccurance="100 km ENE of Miyako, Japan on Apr 20, 2026"
                />
                <Counter
                    count={"XXXXXX34"}
                    event="Tsunami"
                    eventName="0.75m high tsunami"
                    eventOccurance="in Molucca sa on Apr 2, 2026"
                />

                <Counter
                    count={"XXXXXX37"}
                    event="Class X1 Solar Flare"
                    eventName="Class X1.4 solar flare"
                    eventOccurance="on Mar 30, 2026"
                />

                <Counter
                    count={"XXXXXX47"}
                    event="Strong Geomagnetic Storm"
                    eventName="Strong Geomagnetic Storm"
                    eventOccurance="detected on Mar 20, 2026"
                />

                <Counter
                    count={"XXXXXX57"}
                    event="Volcanic Eruption"
                    eventName="Whakaari/White Isaland eruption"
                    eventOccurance="in New Zealand on Mar 10, 2026"
                />

                <Counter
                    count={"XXXXX107"}
                    event="Severe Geomagnetic Storm"
                    eventName="Severe Geomagnetic Storm"
                    eventOccurance="detected on Jan 19, 2026"
                />

                <Counter
                    count={"XXXXX164"}
                    event="Typhoon"
                    eventName="Typhoon Koto"
                    eventOccurance="started on Nov 23, 2025"
                />

                <Counter
                    count={"XXXXX176"}
                    event="Class X5 Solar Flare"
                    eventName="Class X5.1 solar flare"
                    eventOccurance="on Nov 11, 2025"
                />
            </div>
        </div>
    );
}

type CounterProps = {
    count: string;
    event: string;
    eventName: string;
    eventOccurance: string;
};
function Counter({ count, event, eventName, eventOccurance }: CounterProps) {
    if (count.length !== 8) throw new Error("Count length must be 8");
    const numbers = count.split("").map((n, idx) => (
        <div
            key={idx.toString()}
            className={cn(
                styles.segmentDisplay,
                "text-black w-full flex justify-center items-center  text-4xl md:text-6xl border-black",
                n === "X" && "text-gray-400/40",
            )}
        >
            <span>{n === "X" ? 0 : n}</span>
        </div>
    ));

    return (
        <div className="w-full">
            <div className="bg-black p-3 rounded-t-lg relative ">
                <div className={cn(styles.light, styles.l)}></div>
                <div className={cn(styles.light, styles.r)}></div>
                <h2 className="text-center md:text-xl font-semibold">
                    <span className="text-gray-400">Days since</span>
                    <span className="text-white"> {event}</span>
                </h2>
            </div>
            <div className="md:h-28 h-24 bg-white flex">{numbers}</div>
            <div className="bg-[#ffc21c] p-4 border-2 border-t-0 rounded-b flex justify-center gap-2 flex-wrap">
                <span className="text-gray-600">Last:</span>
                <span className="underline underline-offset-3 cursor-pointer">
                    {eventName}
                </span>
                <span> {eventOccurance}</span>
            </div>
        </div>
    );
}
