import { User } from "./user";

export type RequestLogin = {
  email: string;
  password: string;
};

export type ResponseLogin = {
  success: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
};
