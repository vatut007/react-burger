import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import {
  IngredientConstructorList,
  type Ingredient
} from "../../../types/ingredient";

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  reducerPath: "burgerConstructor",
  initialState: {
    bun: null as Ingredient | null,
    ingredients: [] as IngredientConstructorList,
  },
  reducers: {
    addIngredient: {
      reducer(
        state,
        action: PayloadAction<{ cartItemId: string; ingredient: Ingredient }>,
      ) {
        if (action.payload.ingredient.type === "bun") {
          state.bun = action.payload.ingredient;
        } else {
          state.ingredients.push({
            ...action.payload.ingredient,
            cart_item_id: action.payload.cartItemId,
          });
        }
      },
      prepare({ ingredient }: { ingredient: Ingredient }) {
        const cartItemId = nanoid();
        return { payload: { cartItemId, ingredient } };
      },
    },
    removeIngredient(state, action: PayloadAction<{ cartItemId: string }>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.cart_item_id !== action.payload.cartItemId,
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ oldIndex: string; newIndex: number }>,
    ) {
      const index = state.ingredients.findIndex(
        (item) => item.cart_item_id === action.payload.oldIndex,
      );
      const [ingredient] = state.ingredients.splice(index, 1);
      state.ingredients.splice(action.payload.newIndex, 0, ingredient);
    },
  },
});
