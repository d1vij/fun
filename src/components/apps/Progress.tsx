import { Link } from "@tanstack/react-router";

type ProgressionProps = {
    children: React.ReactElement;
};
function Progression({ children }: ProgressionProps) {
    return <div>{children}</div>;
}

function ProgressionTitle({ title }: { title: string }) {
    return <h2>🕑{title}</h2>;
}

export default function Progress() {
    return (
        <div className="min-h-dvh bg-neutral-100">
            <nav className="bg-white px-4 py-6">
                <Link className="font-logo text-5xl hover:scale-102" to="/">
                    DIVIJ.FUN
                </Link>
            </nav>
            <div className="mt-6 w-full bg-white p-6 text-center font-bold font-sans text-3xl">
                Progress
            </div>
            <div className="mt-3 w-full bg-white p-4">
                <Progression>
                    <ProgressionTitle title="Next minute" />
                </Progression>
            </div>
        </div>
    );
}
