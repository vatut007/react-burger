import { ModalOverPlay } from "../modal-over-play/modal-over-play";
import styles from "./modal.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function Modal(props) {
    const handleCloseClick = () => {
        props.dialogRef.current.close()
    }
    return(
    <>        
        <ModalOverPlay dialogRef={props.dialogRef}>
            <h2 className={styles.text + " text text_type_main-default"}>
                {props.title}
            </h2>
            <button className={styles.close_icon} onClick={handleCloseClick}>
            <CloseIcon type="primary" />
            </button>
        </ModalOverPlay>
    </>
    )
}