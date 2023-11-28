import { useRef, useState } from "react";
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
  const selectIngredient = useRef({});
  const scrollToType = (type) => {
    selectIngredient.current[type].scrollIntoView({ behavior: "smooth"});
  };

  const [current, setCurrent] = useState(types[0]);
  const handleScroll = (event) => {
    for (let i = 0; i < types.length-1; i++) {
      const { scrollTop } = event.target;
      const offsetTop = selectIngredient.current[types[i + 1]].offsetTop;
      if (scrollTop < offsetTop) {
        setCurrent(types[i]);
        return
      }
    }
    setCurrent(types.at(-1))
  };

  return (
    <div className={styles.burgerIngredients}>
      <p className="text text_type_main-medium">Соберите бургер</p>
      <BurgerTypeTabs current={current} onClick={scrollToType} />
      <div className={styles.ingredients} onScroll={handleScroll}>
        {types.map((type) => (
          <BurgerCardIngredient
            type={type}
            allIngredients={props.data}
            addIngedient={props.addIngedient}
            selectIngredient={selectIngredient}
          />
        ))}
      </div>
    </div>
  );
}
