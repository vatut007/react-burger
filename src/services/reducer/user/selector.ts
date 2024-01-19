import type { RootState } from "../root-reducer";

export const selectSelectedUser = (state: RootState) => state.user.user;
export const selectSelectedAccessToken = (state: RootState) =>
  state.user.accessToken;
export const selectSelectedRefreshToken = (state: RootState) =>
  state.user.refreshToken;
