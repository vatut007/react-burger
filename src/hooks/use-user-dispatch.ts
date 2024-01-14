import { useDispatch } from "react-redux";
import { ResponseRegistration } from "../types/registration";
import {
  addAccessToken,
  addRefreshToken,
  addUser,
} from "../services/reducer/user/actions";

export function useUserDispatch(data: ResponseRegistration) {
  const dispatch = useDispatch();
  dispatch(addUser({ email: data?.user.email, name: data.user.name }));
  dispatch(addAccessToken({ accessToken: data.accessToken }));
  dispatch(addRefreshToken({ refreshToken: data.refreshToken }));
  localStorage.setItem("refreshToken", data.refreshToken);
}
