import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  type Ingredient,
  type IngredientList,
} from "../../../types/ingredient";

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  reducerPath: "burgerConstructor",
  initialState: {
    bun: null as Ingredient | null,
    ingredients: [] as IngredientList,
  },
  reducers: {
    // selectBun(state, action: PayloadAction<{ bun: Ingredient }>) {
    //   state.bun = action.payload.bun;
    // },
    addIngredient(state, action: PayloadAction<{ ingredient: Ingredient }>) {
      if (action.payload.ingredient.type === "bun") {
        state.bun = action.payload.ingredient;
      } else {
        state.ingredients.push(action.payload.ingredient);
      }
    },
    removeIngredient(state, action: PayloadAction<{ index: number }>) {
      state.ingredients.splice(action.payload.index, 1);
    },
  },
});
