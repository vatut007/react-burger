import { Modal } from "../modal/modal";
import styles from "./ingredient-details-modal.module.css";
import { IngredientDetail } from "../ingredient-detail/ingredient-detail";
import { RefObject, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ingredientSelectors,
  useGetAllIngredientQuery,
} from "../../services/api/api-slice";
import { useDispatch } from "react-redux";
import { selectIngredient } from "../../services/reducer/burger-detail/actions";

interface IngredientDetailsProps {
  dialogRef: RefObject<HTMLDialogElement>;
}

export function IngredientDetailsModal(props: IngredientDetailsProps) {
  const { ingredientId } = useParams();
  const {
    data: ingredientEntities,
    error,
    isLoading,
  } = useGetAllIngredientQuery(undefined);
  const navigate = useNavigate();
  const dispath = useDispatch();
  useEffect(() => {
    if (!ingredientEntities) return;
    if (!ingredientId) return;
    const ingredient = ingredientSelectors.selectById(
      ingredientEntities,
      ingredientId,
    );
    if (!ingredient) return;
    dispath(selectIngredient({ ingredient }));

    props.dialogRef.current?.showModal();
  }, [ingredientEntities]);
  return (
    <Modal
      className={styles.modalContent}
      title={"Детали ингредиента"}
      dialogRef={props.dialogRef}
      onClose={() => navigate("/")}
    >
      <IngredientDetail />
    </Modal>
  );
}
