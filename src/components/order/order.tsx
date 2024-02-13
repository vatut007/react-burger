import { useParams } from "react-router-dom";
import {
  ingredientSelectors,
  useGetAllIngredientQuery,
  useGetOrderQuery,
} from "../../services/api/api-slice";
import styles from "./order.module.css";
import clsx from "clsx";
import groupBy from "object.groupby";
import { useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function Order() {
  const { orderNumber } = useParams();
  const { data: order, isLoading, error } = useGetOrderQuery(orderNumber!);
  const ingredientIds = order?.ingredients ? order.ingredients : [];
  const { data: ingredientEntities } = useGetAllIngredientQuery(undefined);
  const groupIngredients = useMemo(() => {
    const ingredients = ingredientEntities
      ? ingredientIds
          .map((id) => ingredientSelectors.selectById(ingredientEntities, id))
          .filter((ingredient) => ingredient)
      : [];
    const grouped = groupBy(ingredients, (ingredient) => ingredient._id);
    const groupIngredients = Object.values(grouped).map((ingredients) => ({
      ingredient: ingredients[0],
      count: ingredients.length,
    }));
    return groupIngredients;
  }, [ingredientEntities]);
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
      <div className={styles.pictures}>
        {groupIngredients.map(({ ingredient, count }) => (
          <div className={styles.ingredient} key={ingredient._id}>
            <div className={styles.picture}>
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className={styles.img}
              ></img>
            </div>
            <div className={styles.orderName}>
              <p className="text text_type_main-small">{ingredient.name}</p>
            </div>
            <div className={styles.count}>
              <p
                className={clsx(
                  "text text_type_digits-default",
                  styles.textCount,
                )}
              >
                {count} x {ingredient.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
