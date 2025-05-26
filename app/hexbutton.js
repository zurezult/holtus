
import Link from 'next/link';
import styles from "./page.module.css";

export default function Hexbutton({link, text, Icon}) {
    return (
        <Link href={link}>
            <div className={styles.button}>
                {Icon && <Icon className={styles.icon}></Icon>}
                <span className={styles.buttontext}>{text}</span>
            </div>
        </Link>

    )
}