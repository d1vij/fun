import { cn } from "@d1vij/shit-i-always-use";
import { type LinkProps, useNavigate } from "@tanstack/react-router";
import type { IconType } from "react-icons";

type Props = {
    text: string;
    href: string | LinkProps["to"];
    icon: IconType;
    hoverColor: string;
    link: "internal" | "external";
};
export default function FooterButton({
    hoverColor,
    href,
    icon: Icon,
    text,
    link,
}: Props) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => {
                switch (link) {
                    case "internal": {
                        navigate({ to: href });
                        break;
                    }
                    case "external": {
                        window.open(href, "_blank");
                        break;
                    }
                }
            }}
            type="button"
            style={
                {
                    "--hover-color": hoverColor,
                } as React.CSSProperties
            }
            className={cn(
                "cursor-pointer rounded-xl border border-neutral-400 p-2 text-lg",
                "shadow-black/10 transition-all duration-75 ease-linear hover:scale-103 hover:bg-(--hover-color) hover:shadow-md active:scale-100",
                "flex items-center gap-1",
            )}
        >
            <Icon className="size-6" />
            <span>{text}</span>
        </button>
    );
}
