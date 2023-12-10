import {
  createAction,
  createReducer,
  combineReducers,
  combineSlices,
} from "@reduxjs/toolkit";
import { getAllIngredients } from "../../utils/burger-api";
import { burgerConstructorSlice } from "./burger-constructor/slice";

export const rootReducer = combineSlices(burgerConstructorSlice);
export type RootState = ReturnType<typeof rootReducer>;
