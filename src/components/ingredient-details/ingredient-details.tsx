import { Modal } from "../modal/modal";
import styles from "./ingredient-details.module.css";
import { IngredientDetailCalories } from "../ingredient-detail-calories/ingredient-detail-calories";
import { RefObject } from "react";

interface IngredientDetailsProps {
  dialogRef: RefObject<HTMLDialogElement>;
}

export function IngredientDetails(props: IngredientDetailsProps) {
  return (
    <Modal
      className={styles.modalContent}
      title={"Детали ингредиента"}
      dialogRef={props.dialogRef}
    >
    <IngredientDetailCalories />
    </Modal>
  );
}
