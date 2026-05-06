import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";

import "../styles.css";
import { StrictMode } from "react";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <StrictMode>
            <HeadContent />
            <Outlet />
        </StrictMode>
    );
}
