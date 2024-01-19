import { useDispatch, useSelector } from "react-redux";
import { Ingredient } from "../../types/ingredient";
import styles from "./card-ingredients.module.css";
import { selectIngredient } from "../../services/reducer/burger-detail/actions";
import { useDrag } from "react-dnd";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  selectSelectedBun,
  selectSelectedIngredientCount,
} from "../../services/reducer/burger-constructor/selectors";

interface CardIngredientProps {
  ingredient: Ingredient;
  price: number;
  name: string;
  image: string;
}

export function CardIngredient({ ingredient, ...props }: CardIngredientProps) {
  const dispatch = useDispatch();
  const selectedBun = useSelector(selectSelectedBun);
  let count = useSelector(selectSelectedIngredientCount)[ingredient._id];
  if (ingredient.type === "bun" && selectedBun?._id === ingredient._id) {
    count = 2;
  }
  const handleClick = () => {
    dispatch(selectIngredient({ ingredient }));
  };
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });
  return (
    <div className={styles.div} onClick={handleClick} ref={dragRef}>
      <img src={props.image} alt={ingredient.name}></img>
      <p className="text text_type_digits-default">{props.price}</p>
      <p className={"text text_type_main-small" + styles.text}>{props.name}</p>
      {count && <Counter count={count} size="default" extraClass="m-1" />}
    </div>
  );
}
