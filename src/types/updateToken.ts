export type ResponseUpdateToken = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type RequestUpdateToken = {
  refreshToken: string;
};
