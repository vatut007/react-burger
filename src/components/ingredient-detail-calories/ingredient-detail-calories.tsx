import { useSelector } from "react-redux";
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
    <>
    <div className={styles.div}>
    <img
      className={styles.img}
      src={ingredient?.image}
      alt={ingredient?.name}
    ></img>
    <p className={styles.name + " text text_type_main-small"}>
      {ingredient?.name}
    </p>
    </div>
    <div className={styles.detail}>
      {detail.map((detail) => (
        <IngredientCalories
          value={ingredient[detail]}
          detail={detail}
          key={detail}
        />
      ))}
    </div>
    </>
  );
}
