import { type RefObject, type ReactNode, useRef } from "react";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface ModalProps {
  dialogRef: RefObject<HTMLDialogElement>;
  title?: string;
  children: ReactNode;
  className: string;
}

export function Modal(props: ModalProps) {
  const handleCloseClick = () => {
    props.dialogRef.current?.close();
  };
  const contentModalRef = useRef(null);
  return (
    <>
      <ModalOverlay
        dialogRef={props.dialogRef}
        contentModalRef={contentModalRef}
      >
        <div className={styles.div} ref={contentModalRef}>
          <h2 className={styles.text + " text text_type_main-medium"}>
            {props.title}
          </h2>
          <button className={styles.close_icon} onClick={handleCloseClick}>
            <CloseIcon type="primary" />
          </button>
          {props.children}
        </div>
      </ModalOverlay>
    </>
  );
}
