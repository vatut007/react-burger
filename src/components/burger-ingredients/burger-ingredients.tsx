import { UIEventHandler, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { BurgerTypeTabs } from "../burger-type-tabs/burger-type-tabs";
import { BurgerCardIngredient } from "../burger-card-ingredient/burger-card-ingredient";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import {
  IngredientType,
  IngredientList,
  Ingredient,
  types,
} from "../../types/ingredient";
import { SelectIngredient } from "../../types/mutable";

interface BurgerIngredientsProps {
  data: IngredientList;
  addIngedient: (ingredient: Ingredient) => void;
}

export function BurgerIngredients(props: BurgerIngredientsProps) {
  const selectIngredient = useRef<SelectIngredient>({});
  const scrollToType = (type: IngredientType) => {
    selectIngredient.current[type]?.scrollIntoView({ behavior: "smooth" });
  };

  const [current, setCurrent] = useState(types[0]);
  const [modalIngredient, setModalIngredient] = useState<Ingredient|undefined>();
  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    for (let i = 0; i < types.length - 1; i++) {
      const { scrollTop } = event.target as HTMLDivElement;
      const offsetTop = selectIngredient.current[types[i + 1]]?.offsetTop;
      if (offsetTop == null) {
        return;
      }
      if (scrollTop < offsetTop) {
        setCurrent(types[i]);
        return;
      }
    }
    setCurrent(types.at(-1)!);
  };
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openModal = () => {
    dialogRef.current?.showModal();
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
            key={type}
            openModal={openModal}
            setModalIngredient={setModalIngredient}
          />
        ))}
      </div>
      { !!modalIngredient && <IngredientDetails dialogRef={dialogRef} ingredient={modalIngredient} />}
    </div>
  );
}
