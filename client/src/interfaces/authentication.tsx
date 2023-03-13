export interface User_login {
  email: string;
  password: string;
  showPassword: boolean;
}

export interface User_signup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  interest?: string[];
}
