import "./style.css";
import { Link } from "@tanstack/react-router";
import { parseDuration, round } from "radashi";
import { Temporal } from "temporal-polyfill";
import type { ProgressFunction } from "./ProgressBar";
import ProgressBar from "./ProgressBar";

const NOW = Temporal.Now.zonedDateTimeISO();

const minuteProgress: ProgressFunction = (setProgress, setMax) => {
    setMax(60);
    setProgress(NOW.second);
    const id = setInterval(() => {
        setProgress((v) => {
            if (v++ >= 60) return 1;
            return v++;
        });
    }, parseDuration("1 second"));
    return () => clearInterval(id);
};

const hourProgress: ProgressFunction = (setProgress, setMax) => {
    setMax(60);
    setProgress(NOW.minute);
    const id = setInterval(() => {
        setProgress((v) => {
            if (v++ >= 60) return 1;
            return v++;
        });
    }, parseDuration("1 minute"));
    return () => clearInterval(id);
};
const dayProgress: ProgressFunction = (setProgress, setMax) => {
    setMax(24);
    setProgress(NOW.hour);
    const id = setInterval(() => {
        setProgress((v) => {
            if (v++ >= 24) return 1;
            return v++;
        });
    }, parseDuration("1 hour"));
    return () => clearInterval(id);
};
const monthProgress: ProgressFunction = (setProgress, setMax) => {
    const daysInMonth = NOW.daysInMonth;
    setMax(daysInMonth);
    setProgress(NOW.day);
    const id = setInterval(() => {
        setProgress((v) => {
            // broken logic, but who cares, no one is gonna sit an wait for the day to change
            if (v++ >= daysInMonth) return 1;
            return v++;
        });
    }, parseDuration("1 day"));
    return () => clearInterval(id);
};

const yearProgress: ProgressFunction = (setProgress, setMax) => {
    setMax(NOW.daysInYear);
    setProgress(NOW.dayOfYear);
    const id = setInterval(() => {
        setProgress((v) => {
            // broken logic, but who cares, no one is gonna sit an wait for the day to change
            if (v++ >= NOW.daysInYear) return 1;
            return v++;
        });
    }, parseDuration("1 day"));
    return () => clearInterval(id);
};

/**
 * Returns a {@link ProgressFunction} for showing days until `event` param
 * @param event a {@link Temporal.ZonedDateTime} instance of target date
 * @returns {@link ProgressFunction}
 */
function eventProgress(event: Temporal.ZonedDateTime): ProgressFunction {
    return (setProgress, setMax) => {
        let lastEvent = Temporal.ZonedDateTime.from({
            year: NOW.year,
            month: event.month,
            day: event.day,
            timeZone: event.timeZoneId,
        });

        // if the event hasnt happend this yet this year, consider the last year's event date
        if (Temporal.ZonedDateTime.compare(lastEvent, NOW) > 0) {
            lastEvent = lastEvent.with({ year: NOW.year - 1 });
        }

        const nextEvent = lastEvent.with({
            year: lastEvent.year + 1,
        });

        const total = lastEvent.until(nextEvent, {
            largestUnit: "day",
        }).days;
        const elapsed = lastEvent.until(NOW, { largestUnit: "day" }).days;
        setMax(total);
        setProgress(elapsed + 1);
        const id = setInterval(() => {
            setProgress((v) => (v + 1 >= total ? 0 : v + 1));
        }, parseDuration("1 day"));
        return () => clearInterval(id);
    };
}

const valentinesProgress = eventProgress(
    Temporal.ZonedDateTime.from({
        day: 14,
        month: 2,
        year: NOW.year,
        timeZone: NOW.timeZoneId,
    }),
);

const firstOfJune = Temporal.ZonedDateTime.from({
    year: NOW.year,
    month: 6,
    day: 1,
    timeZone: NOW.timeZoneId,
});
const fathersDay = firstOfJune.add({
    days: (7 - firstOfJune.dayOfWeek) % 7,
    weeks: 2,
});
const fathersDayProgress = eventProgress(fathersDay);

const firstOfMay = Temporal.ZonedDateTime.from({
    year: NOW.year,
    month: 5,
    day: 1,
    timeZone: NOW.timeZoneId,
});
const mothersDay = firstOfMay.add({
    days: (7 - firstOfMay.dayOfWeek) % 7,
    weeks: 1,
});
const mothersDayProgress = eventProgress(mothersDay);

const firstOfNovember = Temporal.ZonedDateTime.from({
    year: NOW.year,
    month: 11,
    day: 1,
    timeZone: NOW.timeZoneId,
});
const thanksgiving = firstOfNovember.add({
    days: 4 - (firstOfNovember.dayOfWeek % 7),
    weeks: 3,
});

const scrollProgress: ProgressFunction = (setProgress, setMax) => {
    setMax(document.documentElement.scrollHeight - window.innerHeight);

    function scrollHandler() {
        setProgress(window.scrollY);
    }

    function resizeHandler() {
        setMax(document.documentElement.scrollHeight - window.innerHeight);
    }

    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", resizeHandler);

    return () => {
        window.removeEventListener("scroll", scrollHandler);
        window.removeEventListener("resize", resizeHandler);
    };
};

const decadeProgress: ProgressFunction = (setProgress, setMax) => {
    // i hope no one sits here for a while
    const nextDecade = round(NOW.year, -1);
    setMax(10);
    setProgress(10 - (nextDecade - NOW.year));
};
const centuryProgress: ProgressFunction = (setProgress, setMax) => {
    setMax(100);
    // ill be dead by then so pls someone update this
    setProgress(100 - (2100 - NOW.year));
};
const milleniumProgress: ProgressFunction = (setProgress, setMax) => {
    setMax(1000);
    // ill be dead by then so pls someone update this
    setProgress(100 - (2100 - NOW.year));
};

export default function Progress() {
    return (
        <div className="min-h-dvh bg-neutral-100 font-[Google_Sans]">
            <nav className="bg-white px-4 py-6">
                <Link className="font-logo text-5xl hover:scale-102" to="/">
                    DIVIJ.FUN
                </Link>
            </nav>
            <div className="mx-auto mt-6 w-full bg-white p-10 text-center font-bold font-sans text-3xl lg:max-w-260">
                Progress
            </div>
            <div className="mx-auto mt-3 mb-10 w-full space-y-6 bg-white p-8 lg:max-w-260">
                <ProgressBar
                    emoji={"🕑"}
                    remainingLabel="seconds left"
                    title="Next Minute"
                    fn={minuteProgress}
                />
                <ProgressBar
                    emoji={"🕑"}
                    remainingLabel="minutes left"
                    title="Next Hour"
                    fn={hourProgress}
                />
                <ProgressBar
                    emoji={"🌄"}
                    remainingLabel="hours left"
                    title="Next Day"
                    fn={dayProgress}
                />
                <ProgressBar
                    emoji={"📅"}
                    remainingLabel="days left"
                    title="Next Month"
                    fn={monthProgress}
                />
                <ProgressBar
                    emoji={"🎆"}
                    remainingLabel="days left"
                    title="Next Year"
                    fn={yearProgress}
                />
                <ProgressBar
                    emoji={"💑"}
                    remainingLabel="days left"
                    title="Next Valentine's Day"
                    fn={valentinesProgress}
                />
                <ProgressBar
                    emoji={"🍀"}
                    remainingLabel="days left"
                    title="Next Saint Patrick's Day"
                    fn={eventProgress(
                        Temporal.ZonedDateTime.from({
                            day: 17,
                            month: 3,
                            year: NOW.year + 1,
                            timeZone: NOW.timeZoneId,
                        }),
                    )}
                />
                <ProgressBar
                    emoji={"🐇"}
                    remainingLabel="days left"
                    title="Next Easter"
                    fn={eventProgress(
                        Temporal.ZonedDateTime.from({
                            day: 28,
                            month: 3,
                            year: NOW.year + 1,
                            timeZone: NOW.timeZoneId,
                        }),
                    )}
                />
                <ProgressBar
                    emoji={"👩"}
                    remainingLabel="days left"
                    title="Next Mother's Day"
                    fn={mothersDayProgress}
                />
                <ProgressBar
                    emoji={"👨"}
                    remainingLabel="days left"
                    title="Next Fathers's Day"
                    fn={fathersDayProgress}
                />

                <ProgressBar
                    emoji={"👻"}
                    remainingLabel="days left"
                    title="Next Halloween"
                    fn={eventProgress(
                        Temporal.ZonedDateTime.from({
                            day: 31,
                            month: 10,
                            year: NOW.year + 1,
                            timeZone: NOW.timeZoneId,
                        }),
                    )}
                />
                <ProgressBar
                    emoji={"🦃"}
                    remainingLabel="days left"
                    title="Next Thanksgiving"
                    fn={eventProgress(thanksgiving)}
                />
                <ProgressBar
                    emoji={"🎅"}
                    remainingLabel="days left"
                    title="Next Christmas"
                    fn={eventProgress(
                        Temporal.ZonedDateTime.from({
                            day: 25,
                            month: 12,
                            year: NOW.year + 1,
                            timeZone: NOW.timeZoneId,
                        }),
                    )}
                />
                <ProgressBar
                    emoji={"💻"}
                    remainingLabel="pixels left"
                    title="End of this page"
                    fn={scrollProgress}
                />
                <ProgressBar
                    emoji={"📅"}
                    remainingLabel="years left"
                    title="Next Decade"
                    fn={decadeProgress}
                />
                <ProgressBar
                    emoji={"📅"}
                    remainingLabel="years left"
                    title="Next Century"
                    fn={centuryProgress}
                />
                <ProgressBar
                    emoji={"📅"}
                    remainingLabel="years left"
                    title="Next Millenium"
                    fn={milleniumProgress}
                />
                <ProgressBar
                    emoji={"📅"}
                    remainingLabel="years left"
                    title="Next Millenium"
                    fn={milleniumProgress}
                />
                <ProgressBar
                    emoji={"☄️"}
                    remainingLabel="years left"
                    title="Halley's Comet returns"
                    fn={(setProgress, setMax) => {
                        // comes every 76 years
                        setMax(76);
                        // last seen 1986
                        setProgress(NOW.year - 1986);
                    }}
                />
            </div>

            {/*TODO add footer*/}
            <div className="h-40 w-full bg-white"></div>
        </div>
    );
}
