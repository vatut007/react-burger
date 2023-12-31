import styles from "./ingredient-calories.module.css";

export const ingredientNames = {
  calories: "Калории, ккал",
  proteins: "Белки, г",
  fat: "Жиры, г",
  carbohydrates: "Углеводы, г",
};

interface IngredientCaloriesProps {
  detail: "calories" | "proteins" | "fat" | "carbohydrates";
  value?: number;
}

export function IngredientCalories(props: IngredientCaloriesProps) {
  return (
    <div className={styles.detail}>
      <p
        className={
          styles.text + " text text_type_main-default text_color_inactive"
        }
      >
        {ingredientNames[props.detail]}
      </p>
      <p
        className={
          styles.value + " text text_type_digits-default  text_color_inactive"
        }
      >
        {props.value}
      </p>
    </div>
  );
}
