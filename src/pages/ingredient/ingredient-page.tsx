import { useParams } from "react-router-dom";
import { AppHeader } from "../../components/app-header/app-header";
import { IngredientDetail } from "../../components/ingredient-detail/ingredient-detail";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectIngredient } from "../../services/reducer/burger-detail/actions";
import {
  ingredientSelectors,
  useGetAllIngredientQuery,
} from "../../services/api/api-slice";
import styles from "./ingredient-pages.module.css";

export function IngredientPage() {
  const { ingredientId } = useParams();
  const {
    data: ingredientEntities,
    error,
    isLoading,
  } = useGetAllIngredientQuery(undefined);
  const dispath = useDispatch();
  useEffect(() => {
    if (ingredientEntities && ingredientId) {
      const ingredient = ingredientSelectors.selectById(
        ingredientEntities,
        ingredientId,
      );
      if (ingredient) {
        dispath(selectIngredient({ ingredient }));
      }
    }
  }, [ingredientEntities]);
  return (
    <div className={styles.div}>
      <div className={styles.detailDiv}>
        <IngredientDetail />
      </div>
    </div>
  );
}
