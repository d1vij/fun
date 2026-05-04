import HomeCard from "./HomeCard";

export default function HomeCards() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <HomeCard
                url="/progress"
                alt="Progress"
                imageUrl="https://neal.fun/link-images/progress.svg"
            />
        </div>
    );
}
