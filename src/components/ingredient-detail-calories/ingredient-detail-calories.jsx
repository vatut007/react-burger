import { IngredientCalories } from "../ingredient-calories/ingredient-calories";
import styles from './ingredient-detail-calories.module.css'

export const detail = ['calories', 'proteins', 'fat', 'carbohydrates'];

export function IngredientDetailCalories (props){
    return (
        <div className={styles.detail}>
          {detail.map((detail) => (
            <IngredientCalories value={props.ingredient[detail]} detail={detail} key = {detail} />
          ))}
        </div>
      );
}