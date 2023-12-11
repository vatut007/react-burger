import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer/root-reducer";
import { apiSlice } from "./api/api-slice";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
