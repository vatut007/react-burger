import { Modal } from "../modal/modal";
import styles from "./ingredient-details.module.css";
import { IngredientDetailCalories } from "../ingredient-detail-calories/ingredient-detail-calories";
import { RefObject } from "react";
import { Ingredient } from "../../types/ingredient";
import { useSelector } from "react-redux";
import { selectSelectedModalIngredient } from "../../services/reducer/burger-detail/selectors";

interface IngredientDetailsProps {
  dialogRef: RefObject<HTMLDialogElement>;
}

export function IngredientDetails(props: IngredientDetailsProps) {
  const ingredient = useSelector(selectSelectedModalIngredient);
  return (
    <Modal
      className={styles.modalContent}
      title={"Детали ингредиента"}
      dialogRef={props.dialogRef}
    >
      <div className={styles.div}>
        <img
          className={styles.img}
          src={ingredient?.image}
          alt="Картинка"
        ></img>
        <p className={styles.name + " text text_type_main-small"}>
          {ingredient?.name}
        </p>
        <IngredientDetailCalories />
      </div>
    </Modal>
  );
}
