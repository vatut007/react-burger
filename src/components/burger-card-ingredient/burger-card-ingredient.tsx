import styles from "./burger-card-ingredient.module.css";
import { ingredientNames } from "../burger-type-tab/burger-type-tab";
import { CardIngredient } from "../card-ingredient/card-ingredient";
import { type MutableRefObject } from "react";
import { type IngredientType } from "../../types/ingredient";
import { useGetAllIngredientQuery } from "../../services/api/api-slice";
import { Link, useLocation } from "react-router-dom";

interface BurgerCardIngredientProps {
  type: IngredientType;
  selectIngredient: MutableRefObject<
    Partial<Record<IngredientType, HTMLDivElement | null>>
  >;
}

export function BurgerCardIngredient(props: BurgerCardIngredientProps) {
  const { data: allIngredients } = useGetAllIngredientQuery(undefined);
  const filteredIngredients = allIngredients?.filter(
    (ingredient) => ingredient.type === props.type,
  );
  const location = useLocation();
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
        {filteredIngredients?.map((ingredient) => (
          <Link
            to={`/ingredient/${ingredient._id}`}
            state={{ background: location }}
            key={ingredient._id}
          >
            <CardIngredient
              key={ingredient._id}
              ingredient={ingredient}
              name={ingredient.name}
              image={ingredient.image}
              price={ingredient.price}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
