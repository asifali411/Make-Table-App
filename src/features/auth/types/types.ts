export type AuthForm = {
  username: string;
  password: string;
  email?: string;
  confirmPassword?: string;
};

export type AuthErrors = {
  username?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
};
