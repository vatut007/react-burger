import { useSelector } from "react-redux";
import { Ingredient } from "../../types/ingredient";
import { IngredientCalories } from "../ingredient-calories/ingredient-calories";
import styles from "./ingredient-detail-calories.module.css";
import { selectSelectedModalIngredient } from "../../services/reducer/burger-detail/selectors";

export const detail = ["calories", "proteins", "fat", "carbohydrates"] as const;

export function IngredientDetailCalories() {
  const ingredient = useSelector(selectSelectedModalIngredient);
  if (!ingredient) {
    return null;
  }
  return (
    <div className={styles.detail}>
      {detail.map((detail) => (
        <IngredientCalories
          value={ingredient[detail]}
          detail={detail}
          key={detail}
        />
      ))}
    </div>
  );
}
