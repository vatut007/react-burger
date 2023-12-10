import { Ingredient } from "../../types/ingredient";
import { IngredientCalories } from "../ingredient-calories/ingredient-calories";
import styles from "./ingredient-detail-calories.module.css";

export const detail = ["calories", "proteins", "fat", "carbohydrates"] as const;

interface IngredientDetailCaloriesProps {
  ingredient: Ingredient;
}

export function IngredientDetailCalories(props: IngredientDetailCaloriesProps) {
  return (
    <div className={styles.detail}>
      {detail.map((detail) => (
        <IngredientCalories
          value={props.ingredient[detail]}
          detail={detail}
          key={detail}
        />
      ))}
    </div>
  );
}
