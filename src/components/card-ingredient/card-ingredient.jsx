import styles from "./card-ingredients.module.css";
import { useRef } from "react";

export function CardIngredient(props) {
  const handleClick = () => {
    props.addIngedient(props.ingredient);
    props.openModal();
    props.setModal(props.ingredient);
  };
  return (
    <div className={styles.div} onClick={handleClick}>
      <img src={props.image}></img>
      <p className="text text_type_digits-default">{props.price}</p>
      <p className={"text text_type_main-small" + styles.text}>{props.name}</p>
    </div>
  );
}
