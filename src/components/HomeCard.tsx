import { cn } from "@d1vij/shit-i-always-use";
import { Link, type LinkProps } from "@tanstack/react-router";

type Props = {
    imageUrl: string;
    alt: string;
    url: LinkProps["to"];
};

export default function HomeCard({ imageUrl, alt, url }: Props) {
    return (
        <div
            className={cn(
                "min-w-100 transition-all duration-150 hover:scale-102 active:scale-100",
                "overflow-clip rounded-2xl shadow-black/10 hover:shadow-lg",
            )}
        >
            <Link to={url}>
                <img src={imageUrl} alt={alt} />
            </Link>
        </div>
    );
}
