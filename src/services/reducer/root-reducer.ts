import { combineSlices } from "@reduxjs/toolkit";
import { burgerConstructorSlice } from "./burger-constructor/slice";
import { apiSlice } from "../api/api-slice";
import { ingredientDetailSlice } from "./burger-detail/slice";
import { userSlice } from "./user/slice";

export const rootReducer = combineSlices(
  apiSlice,
  burgerConstructorSlice,
  ingredientDetailSlice,
  userSlice,
);
export type RootState = ReturnType<typeof rootReducer>;
