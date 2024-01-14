import styles from "./modal-overlay.module.css";
import { type RefObject, type ReactNode } from "react";

interface ModalOverlayProps {
  dialogRef: RefObject<HTMLDialogElement>;
  children: ReactNode;
  handleCloseClick(): void;
  isIngredientDetail?: boolean|null
}
export function ModalOverlay(props: ModalOverlayProps) {
  return (
    props.isIngredientDetail?
    <div className= {styles.backdrop}
      onClick={props.handleCloseClick}>   
      <dialog open
      className={styles.modal}
      ref={props.dialogRef}
    >
      {props.children}
    </dialog> 
    </div> 
      :
      <dialog
      className={styles.modal}
      ref={props.dialogRef}
      onClick={props.handleCloseClick}
    >
      {props.children}
    </dialog>
  );
}
