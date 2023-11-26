import { useState } from "react";
import {
  Counter,
  Tab,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { CardIngredient } from "../card-ingredient/card-ingredient";
import { BurgerTypeTabs, types } from "../burger-type-tabs/burger-type-tabs";
import { BurgerCardIngredient } from "../burger-card-ingredient/burger-card-ingredient";

export function BurgerIngredients(props) {
  const [current, setCurrent] = useState("bun");

  return (
    <div className={styles.burgerIngredients}>
      <p className="text text_type_main-medium">Соберите бургер</p>
      <BurgerTypeTabs current={current} onClick={setCurrent} />
      <div className={styles.ingredients}>
        {types.map((type) => (
          <BurgerCardIngredient
          type={type}
          allIngredients={props.data}
          addIngedient={props.addIngedient}/>
        ))}
      </div>
    </div>
  );
}
