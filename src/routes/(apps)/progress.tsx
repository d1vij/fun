import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const Progress = import("@/components/apps/Progress");
export const Route = createFileRoute("/(apps)/progress")({
    component: lazy(() => Progress),
});
