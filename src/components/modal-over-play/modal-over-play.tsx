import styles from "./modal-over-play.module.css";
import { type RefObject, type ReactNode } from "react";

interface ModalOverPlayProps {
  dialogRef: RefObject<HTMLDialogElement>;
  children: ReactNode;
  contentModalRef: any
}
export function ModalOverPlay(props: ModalOverPlayProps) {
  const handleClose = ()=> {
    props.dialogRef.current?.addEventListener('click', function(event) {
      const rect = props.dialogRef.current?.getBoundingClientRect();
      if (rect){
        const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            props.dialogRef.current?.close();
            }
      }
    })};
  return (
    <>
      <dialog className={styles.modal} ref={props.dialogRef} onClick={handleClose}>
        {props.children}
      </dialog>
    </>
  );
}
