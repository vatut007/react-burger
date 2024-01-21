import styles from "./modal-overlay.module.css";
import { type RefObject, type ReactNode } from "react";

interface ModalOverlayProps {
  dialogRef: RefObject<HTMLDialogElement>;
  children: ReactNode;
  handleCloseClick(): void;
}
export function ModalOverlay(props: ModalOverlayProps) {
  return (
    <dialog
      className={styles.modal}
      ref={props.dialogRef}
      onClick={props.handleCloseClick}
    >
      {props.children}
    </dialog>
  );
}
