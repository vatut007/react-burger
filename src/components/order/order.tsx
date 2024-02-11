import { useParams } from "react-router-dom";
import { ingredientSelectors, useGetAllIngredientQuery, useGetOrderQuery } from "../../services/api/api-slice";
import styles from "./order.module.css";
import clsx from "clsx";

export function Order() {
  const { orderNumber } = useParams();
  const { data: order, isLoading, error } = useGetOrderQuery(orderNumber!);
  const ingredientIds = order?.ingredients?order.ingredients:[]
  const { data: ingredientEntities } = useGetAllIngredientQuery(undefined);
  const ingredients = ingredientEntities
    ? ingredientIds
        .map((id) => ingredientSelectors.selectById(ingredientEntities, id))
        .filter((ingredient) => ingredient)
    : [];
  return (
    <div className={styles.order}>
      <p className="text text_type_main-medium">#{order?.number}</p>
      <p className="text text_type_main-medium">{order?.name}</p>
      <p
        className={clsx(
          "text text_type_main-small",
          order?.status === "done" && styles.green,
          order?.status === "cancel" && styles.red,
        )}
      >
        Выполнен
      </p>
      <p>Состав:</p>
      {ingredients.map((ingredient, index) => (
              <div className={styles.picture} key={index}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className={styles.img}
                ></img>
                <p>{ingredient.name}</p>
              </div>
            ))}
    </div>
  );
}
