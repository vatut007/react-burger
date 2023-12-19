import { useDispatch } from "react-redux";
import { Ingredient } from "../../types/ingredient";
import styles from "./card-ingredients.module.css";
import { addIngredient } from "../../services/reducer/burger-constructor/actions";
import { selectIngredient } from "../../services/reducer/burger-detail/actions";
import { useDrag } from "react-dnd";

interface CardIngredientProps {
  ingredient: Ingredient;
  openModal: () => void;
  price: number;
  name: string;
  image: string;
}

export function CardIngredient({ ingredient, ...props }: CardIngredientProps) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addIngredient({ ingredient }));
    props.openModal();
    dispatch(selectIngredient({ ingredient }));
  };
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });
  return (
    <div className={styles.div} onClick={handleClick} ref={dragRef}>
      <img src={props.image} alt="Картинка"></img>
      <p className="text text_type_digits-default">{props.price}</p>
      <p className={"text text_type_main-small" + styles.text}>{props.name}</p>
    </div>
  );
}
