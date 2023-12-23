import type { RootState } from "../root-reducer";

export const selectSelectedBun = (state: RootState) =>
  state.burgerConstructor.bun;
export const selectSelectedIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;
export const selectSelectedIngredientCount = (state: RootState) =>
  state.burgerConstructor.ingredientCount;
