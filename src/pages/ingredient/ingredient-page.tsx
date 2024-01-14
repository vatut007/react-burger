import { useParams } from "react-router-dom";
import { AppHeader } from "../../components/app-header/app-header";
import { IngredientDetail } from "../../components/ingredient-detail/ingredient-detail";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectIngredient } from "../../services/reducer/burger-detail/actions";
import { useGetAllIngredientQuery } from "../../services/api/api-slice";
import styles from "./ingredient-pages.module.css";

export function IngredientPage() {
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
    <div className={styles.div}>
      <AppHeader />
      <div className={styles.detailDiv}>
        <IngredientDetail />
      </div>
    </div>
  );
}
