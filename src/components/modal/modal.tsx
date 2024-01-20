import { type RefObject, type ReactNode, useEffect } from "react";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  dialogRef: RefObject<HTMLDialogElement>;
  title?: string;
  children: ReactNode;
  className: string;
}

const modalRoot = document.getElementById("modals") as Element;

export function Modal(props: ModalProps) {
  const navigate = useNavigate();
  const handleCloseClick = () => {
    props.dialogRef.current?.close();
    navigate("/");
  };
  const escFunction = (event:KeyboardEvent)=>{
    if(event.code=='Escape'){
      handleCloseClick()
    }}
  useEffect(()=>{
    document.addEventListener('keydown', (event)=>escFunction(event));
    return document.removeEventListener('keydown',(event)=>escFunction(event))})
  return (
    <>
      {createPortal(
        <ModalOverlay
          dialogRef={props.dialogRef}
          handleCloseClick={handleCloseClick}
        >
          <div className={styles.div} onClick={(evt) => evt.stopPropagation()}>
            <h2 className={styles.text + " text text_type_main-medium"}>
              {props.title}
            </h2>
            <button className={styles.close_icon} onClick={handleCloseClick}>
              <CloseIcon type="primary" />
            </button>
            {props.children}
          </div>
        </ModalOverlay>,
        modalRoot,
      )}
    </>
  );
}
