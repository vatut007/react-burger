import styles from "./modal-over-play.module.css";
import { type RefObject, type ReactNode } from "react";

interface ModalOverPlayProps {
  dialogRef: RefObject<HTMLDialogElement>;
  children: ReactNode;
  contentModalRef: any;
}
export function ModalOverPlay(props: ModalOverPlayProps) {
  return (
    <>
      <dialog
        className={styles.modal}
        ref={props.dialogRef}
      >
        {props.children}
      </dialog>
    </>
  );
}
