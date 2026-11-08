import type { ModalProps } from "../../types";
import { CloseBtn } from "../../UI/CloseButton/CloseBtn";
import { createPortal } from "react-dom";
import { Overlay } from "../Overlay/Overlay";
import styles from './style.module.scss'

export function Modal ({ img, missionName, rocketName, details, onClick }: ModalProps) {
    const modalElement = document.getElementById('modal')!;
    return (
        createPortal((
            <>
            <div className={styles.modal}>
            <div className={styles['title-container']}>
                <h2 className={styles.title}>{missionName}</h2>
                <CloseBtn onClick={onClick} />
            </div>
            <div className={styles['img-container']}>
                <img src={img} alt={missionName} />
            </div>
            <div className={styles.container}>
                <p className={styles.title}>Mission name:</p>
                <p className={styles.text}>{missionName}</p>
            </div>
            <div className={styles.container}>
                <p className={styles.title}>Rocket name:</p>
                <p className={styles.text}>{rocketName}</p>
            </div>
            <div className={styles.container}>
                <p className={styles.title}>Details:</p>
                <p className={styles.text}>{details}</p>
            </div>
        </div>
        <Overlay />
        </>
        ), modalElement)
    )
}