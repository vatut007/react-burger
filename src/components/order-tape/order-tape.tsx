import {
  ingredientSelectors,
  useGetAllIngredientQuery,
} from "../../services/api/api-slice";
import styles from "../order-tape/order-tape.module.css";

interface OrderTapeProps {
  number: string;
  date: string;
  name: string;
  ingredientIds: string[];
}

export function OrderTape({
  number,
  date,
  name,
  ingredientIds,
}: OrderTapeProps) {
  const { data: ingredientEntities } = useGetAllIngredientQuery(undefined);
  const ingredients = ingredientEntities
    ? ingredientIds
        .map((id) => ingredientSelectors.selectById(ingredientEntities, id))
        .filter((ingredient) => ingredient)
    : [];
  return (
    <div className={styles.windowOrder}>
      <div className={styles.title}>
        <p className="text text_type_main-default">{number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {date}
        </p>
      </div>
      <div>
        <p className="text text_type_main-medium">{name}</p>
      </div>
      <div className={styles.pictures}>
        {ingredients.map((ingredient, index) => (
          <div className={styles.picture} key={index}>
            <img
              src={ingredient.image}
              alt={ingredient.name}
              className={styles.img}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
}
