import styles from "./burger-card-ingredient.module.css";
import {
  type IngredientType,
  ingredientNames,
} from "../burger-type-tab/burger-type-tab";
import { CardIngredient } from "../card-ingredient/card-ingredient";
import { type Ingredient } from "../../App";
import { type MutableRefObject } from "react";

interface BurgerCardIngredientProps {
  type: IngredientType;
  allIngredients: Ingredient[];
  addIngedient(Ingredient: Ingredient): void;
  selectIngredient: MutableRefObject<
    Record<IngredientType, HTMLDivElement | null>
  >;
}

export function BurgerCardIngredient(props: BurgerCardIngredientProps) {
  const filteredIngredients = props.allIngredients.filter(
    (ingredient) => ingredient.type == props.type,
  );

  return (
    <>
      <div
        className={styles.text}
        ref={(element) =>
          (props.selectIngredient.current[props.type] = element)
        }
      >
        <p className="text text_type_main-medium">
          {ingredientNames[props.type]}
        </p>
      </div>
      <div className={styles.bun}>
        {filteredIngredients.map((ingredient) => (
          <CardIngredient
            key={ingredient._id}
            ingredient={ingredient}
            name={ingredient.name}
            image={ingredient.image}
            price={ingredient.price}
            addIngedient={props.addIngedient}
          />
        ))}
      </div>
    </>
  );
}
