import {
  type IngredientType,
  BurgerTypeTab,
} from "../burger-type-tab/burger-type-tab";
import styles from "./burger-type-tabs.module.css";

export const types: IngredientType[] = ["bun", "sauce", "main"];

interface BurgerTypeTabsProps {
  current: IngredientType;
  onClick(type: IngredientType): void;
}

export function BurgerTypeTabs(props: BurgerTypeTabsProps) {
  return (
    <div className={styles.tab}>
      {types.map((type) => (
        <BurgerTypeTab {...props} type={type} />
      ))}
    </div>
  );
}
