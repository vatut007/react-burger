import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types/user";

export const userSlice = createSlice({
  name: "user",
  reducerPath: "user",
  initialState: {
    user: null as User | null,
    accessToken: null as string | null,
    refreshToken: null as string | null,
  },
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.user = {
        email: action.payload.email,
        name: action.payload.name,
      };
    },
    addAccessToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },
    addRefreshToken(state, action: PayloadAction<{ refreshToken: string }>) {
      state.refreshToken = action.payload.refreshToken;
    },
    clearUser(state) {
      (state.accessToken = null),
        (state.refreshToken = null),
        (state.user = null);
    },
  },
});
