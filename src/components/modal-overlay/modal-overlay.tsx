import styles from "./modal-overlay.module.css";
import { type RefObject, type ReactNode, MouseEventHandler } from "react";

interface ModalOverlayProps {
  dialogRef: RefObject<HTMLDialogElement>;
  children: ReactNode;
  contentModalRef: any;
}
export function ModalOverlay(props: ModalOverlayProps) {
  const trackMousePos:MouseEventHandler<HTMLDialogElement> = (event) => {
    const rect = props.dialogRef.current?.getBoundingClientRect();
    if (rect) {
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        props.dialogRef.current?.close();
      }
    }
  }
  return (
    <>
      <dialog
        className={styles.modal}
        ref={props.dialogRef}
        onClick={trackMousePos}
      >
        {props.children}
      </dialog>
    </>
  );
}
