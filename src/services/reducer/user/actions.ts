import { userSlice } from "./slice";

export const { addAccessToken, addUser, addRefreshToken, clearUser } =
  userSlice.actions;
