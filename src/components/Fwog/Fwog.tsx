import type { MouseEvent } from "react";
import fwog from "@/assets/fwog.svg";
import styles from "./styles.module.css";
export default function Fwog() {
    function handleClick(e: MouseEvent) {
        const target = e.currentTarget as HTMLButtonElement;
        target.classList.add(styles.waddle);
        setTimeout(() => target.remove(), 2000);
    }
    return (
        <button onClick={handleClick} type="button" className={styles.fwog}>
            <img src={fwog} alt="fwog" />
        </button>
    );
}
