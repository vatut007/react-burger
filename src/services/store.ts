import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer/root-reducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});
