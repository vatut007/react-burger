import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export type IngredientType = "main" | "sauce" | "bun";

export const ingredientNames: Record<IngredientType, string> = {
  bun: "Булки",
  main: "Начинка",
  sauce: "Соус",
};

interface BurgerTypeTabProps {
  type: IngredientType;
  current: IngredientType;
  onClick(type: IngredientType): void;
}

export function BurgerTypeTab(props: BurgerTypeTabProps) {
  return (
    <Tab
      value={props.type}
      active={props.current === props.type}
      onClick={() => props.onClick(props.type)}
    >
      {ingredientNames[props.type]}
    </Tab>
  );
}
