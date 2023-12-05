import { BurgerTypeTab } from "../burger-type-tab/burger-type-tab";
import styles from "./burger-type-tabs.module.css";
import { type IngredientType } from "../../types/ingredient";
import { types } from "../../types/ingredient";

interface BurgerTypeTabsProps {
  current: IngredientType;
  onClick(type: IngredientType): void;
}

export function BurgerTypeTabs(props: BurgerTypeTabsProps) {
  return (
    <div className={styles.tab}>
      {types.map((type) => (
        <BurgerTypeTab {...props} type={type} key={type} />
      ))}
    </div>
  );
}
