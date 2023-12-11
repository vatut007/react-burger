import {
  createAction,
  createReducer,
  combineReducers,
  combineSlices,
} from "@reduxjs/toolkit";
import { getAllIngredients } from "../../utils/burger-api";
import { burgerConstructorSlice } from "./burger-constructor/slice";
import { apiSlice } from "../api/api-slice";
import { ingredientDetailSlice } from "./burger-detail/slice";

export const rootReducer = combineSlices(apiSlice, burgerConstructorSlice,ingredientDetailSlice);
export type RootState = ReturnType<typeof rootReducer>;
