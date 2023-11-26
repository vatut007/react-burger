import { useState } from "react";
import {
  Counter,
  Tab,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredints.module.css";
import { CardIngredient } from "../card-ingredient/card-ingredient";

export function BurgerIngredients(props) {
  const [current, setCurrent] = useState("Булки");
  const data_ingredients_bun = props.data.filter(function (obj) {
    return obj.type == "bun";
  });
  const data_ingredients_sauce = props.data.filter(function (obj) {
    return obj.type == "sauce";
  });
  const data_ingredients_main = props.data.filter(function (obj) {
    return obj.type == "main";
  });
  return (
    <section>
      <p className="text text_type_main-medium">Соберите бургер</p>
      <div className={styles.tab}>
        <Tab value="one" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "Начинки"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.text}>
        <p className="text text_type_main-medium">Булки</p>
      </div>
      <div className={styles.bun}>
        {data_ingredients_bun.map((ingredient) => (
          <CardIngredient
            key={ingredient.id}
            ingredient={ingredient}
            name={ingredient.name}
            image={ingredient.image}
            price={ingredient.price}
            addIngedient={props.addIngedient}
          />
        ))}
      </div>
      <div className={styles.text}>
        <p className="text text_type_main-medium">Соусы</p>
      </div>
      <div className={styles.bun}>
        {data_ingredients_sauce.map((ingredient) => (
          <CardIngredient
            key={ingredient.id}
            ingredient={ingredient}
            name={ingredient.name}
            image={ingredient.image}
            price={ingredient.price}
            addIngedient={props.addIngedient}
          />
        ))}
      </div>
      <div className={styles.text}>
        <p className="text text_type_main-medium">Начинка</p>
      </div>
      <div className={styles.bun}>
        {data_ingredients_main.map((ingredient) => (
          <CardIngredient
            key={ingredient.id}
            ingredient={ingredient}
            name={ingredient.name}
            image={ingredient.image}
            price={ingredient.price}
            addIngedient={props.addIngedient}
          />
        ))}
      </div>
    </section>
  );
}
