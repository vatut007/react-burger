import { Modal } from "../modal/modal";
import styles from "./ingredient-details-modal.module.css";
import { IngredientDetail } from "../ingredient-detail/ingredient-detail";
import { RefObject, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetAllIngredientQuery } from "../../services/api/api-slice";
import { useDispatch } from "react-redux";
import { selectIngredient } from "../../services/reducer/burger-detail/actions";

interface IngredientDetailsProps {
  dialogRef: RefObject<HTMLDialogElement>;
}

export function IngredientDetailsModal(props: IngredientDetailsProps) {
  const { ingredientId } = useParams();
  const { data, error, isLoading } = useGetAllIngredientQuery(undefined);
  const dispath = useDispatch();
  useEffect(() => {
    if (data) {
      const ingredient = data.find((item) => item._id == ingredientId);
      if (ingredient) {
        dispath(selectIngredient({ ingredient }));
      }
    }
  }, [data]);
  return (
    <Modal
      className={styles.modalContent}
      title={"Детали ингредиента"}
      dialogRef={props.dialogRef}
      isIngredientDetail={true}
    >
      <IngredientDetail />
    </Modal>
  );
}
