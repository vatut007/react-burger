import styles from "./modal-over-play.module.css";

export function ModalOverPlay(props) {
    return(
    <>
        <dialog className={styles.modal} ref={props.dialogRef} >
            {props.children}
        </dialog>
    </>
    )
}