export type User = {
  email: string;
  name: string;
};

export type ResponseGetUser = {
  success: boolean;
  user: User;
};
