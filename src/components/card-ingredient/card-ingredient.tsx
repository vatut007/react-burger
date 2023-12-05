import { Ingredient } from "../../types/ingredient";
import styles from "./card-ingredients.module.css";

interface CardIngredientProps {
  ingredient: Ingredient;
  addIngedient: (ingredient: Ingredient) => void;
  openModal: () => void;
  setModal(ingredient: Ingredient): void;
  price: number;
  name: string;
  image: string;
}

export function CardIngredient(props: CardIngredientProps) {
  const handleClick = () => {
    props.addIngedient(props.ingredient);
    props.openModal();
    props.setModal(props.ingredient);
  };
  return (
    <div className={styles.div} onClick={handleClick}>
      <img src={props.image} alt="Картинка"></img>
      <p className="text text_type_digits-default">{props.price}</p>
      <p className={"text text_type_main-small" + styles.text}>{props.name}</p>
    </div>
  );
}
