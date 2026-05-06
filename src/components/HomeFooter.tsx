import { FaGithubSquare } from "react-icons/fa";
import FooterButton from "./FooterButton";

export default function HomeFooter() {
    return (
        <div className="mt-12 flex flex-wrap justify-center gap-4 p-10">
            <FooterButton
                href="https://github.com/d1vij"
                icon={FaGithubSquare}
                text="Github"
                hoverColor="#00000008"
                link="external"
            />
            <FooterButton
                href="https://github.com/d1vij/fun"
                icon={FaGithubSquare}
                text="Project Github"
                hoverColor="#00000008"
                link="external"
            />
        </div>
    );
}
