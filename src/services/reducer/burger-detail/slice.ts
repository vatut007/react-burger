import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../../types/ingredient";

export const ingredientDetailSlice = createSlice({
    name: 'ingedientDetail',
    reducerPath: 'ingedientDetail',
    initialState: {ingredient:null as Ingredient | null},
    reducers:{
        selectIngredient(state, action: PayloadAction<{ ingredient: Ingredient }>) {
            state.ingredient = action.payload.ingredient
        },
    }
})