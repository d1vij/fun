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
                "md:w-100 w-full transition-all duration-150 hover:scale-102 active:scale-100",
                "overflow-clip rounded-xl shadow-black/10 hover:shadow-lg bg-gray-200 md:min-h-37 min-h-30",
            )}
        >
            <Link to={url}>
                <img src={imageUrl} alt={alt} className="" />
            </Link>
        </div>
    );
}
