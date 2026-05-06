import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

export const Route = createFileRoute("/(apps)/days-since-incident")({
    component: lazy(
        () => import("@/components/apps/DaysSinceIncident/DaysSinceIncident"),
    ),
    head: () => ({
        meta: [{ title: "⚠️ Days Since Incident" }],
        links: [
            {
                href: "https://fonts.googleapis.com/css2?family=Iosevka+Charon:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
                rel: "stylesheet",
            },
        ],
    }),
});
