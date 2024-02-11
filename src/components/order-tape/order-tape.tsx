import { DateTime } from "luxon";
import {
  ingredientSelectors,
  useGetAllIngredientQuery,
} from "../../services/api/api-slice";
import styles from "../order-tape/order-tape.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const INGREDIENTS_LENGTH_LIMIT = 5;

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
  const summIngredients = ingredients.reduce(
    (sum, current) => sum + current.price,
    0,
  );
  const dt = DateTime.fromISO(date, { locale: "ru" });
  return (
    <div className={styles.windowOrder}>
      <div className={styles.title}>
        <p className="text text_type_main-default">#{number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {DateTime.now().day == dt.day
            ? dt.toFormat("'Сегодня в' HH:MM ZZZZ")
            : dt.toLocaleString(DateTime.DATETIME_FULL)}
        </p>
      </div>
      <div>
        <p className="text text_type_main-medium">{name}</p>
      </div>
      <div className={styles.imgSumm}>
        <div className={styles.pictures}>
          {ingredients
            .slice(0, INGREDIENTS_LENGTH_LIMIT)
            .map((ingredient, index) => (
              <div className={styles.picture} key={index}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className={styles.img}
                ></img>
              </div>
            ))}
          {ingredients.length > INGREDIENTS_LENGTH_LIMIT && (
            <div className={styles.endPicture}>
              <div className={styles.hanter}>
                +{ingredients.length - INGREDIENTS_LENGTH_LIMIT}
              </div>
              <img
                src={ingredients[INGREDIENTS_LENGTH_LIMIT].image}
                alt={ingredients[INGREDIENTS_LENGTH_LIMIT].name}
                className={styles.img}
              ></img>
            </div>
          )}
        </div>
        <div className={styles.summ}>
          <p className="text text_type_main-default">{summIngredients}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
