import { type RefObject, type ReactNode, useEffect, useCallback } from "react";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import clsx from "clsx";

interface ModalProps {
  dialogRef: RefObject<HTMLDialogElement>;
  title?: string;
  children: ReactNode;
  className: string;
  onClose?: () => void;
}

const modalRoot = document.getElementById("modals") as Element;

export function Modal(props: ModalProps) {
  const handleCloseClick = useCallback(() => {
    props.dialogRef.current?.close();
    props.onClose?.();
  }, [props.onClose]);
  useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if (event.code == "Escape") {
        handleCloseClick();
      }
    };

    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [handleCloseClick]);

  return createPortal(
    <ModalOverlay
      dialogRef={props.dialogRef}
      handleCloseClick={handleCloseClick}
    >
      <div className={styles.div} onClick={(evt) => evt.stopPropagation()}>
        <h2 className={clsx(styles.text, "text", "text_type_main-medium")}>
          {props.title}
        </h2>
        <button className={styles.close_icon} onClick={handleCloseClick}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
    </ModalOverlay>,
    modalRoot,
  );
}
