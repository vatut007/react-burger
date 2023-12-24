import { Modal } from "../modal/modal";
import styles from "./ingredient-details-modal.module.css";
import { IngredientDetail } from "../ingredient-detail/ingredient-detail";
import { RefObject } from "react";

interface IngredientDetailsProps {
  dialogRef: RefObject<HTMLDialogElement>;
}

export function IngredientDetailsModal(props: IngredientDetailsProps) {
  return (
    <Modal
      className={styles.modalContent}
      title={"Детали ингредиента"}
      dialogRef={props.dialogRef}
    >
      <IngredientDetail />
    </Modal>
  );
}
