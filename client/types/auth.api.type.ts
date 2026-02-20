export interface User {
  id?: number;
  userCode: string;
  email: string;
  userName?: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface MeResponse {
  user: User;
}

export interface RegisterResponse {
  message: string;
}