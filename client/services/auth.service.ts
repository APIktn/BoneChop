import { AxiosInstance } from "axios";
import { LoginForm, RegisterForm } from "@/types/auth.ui.type";
import {
  LoginResponse,
  MeResponse,
  RegisterResponse,
} from "@/types/auth.api.type";

export const createAuthService = (api: AxiosInstance) => ({
  register: (data: RegisterForm) =>
    api.post<RegisterResponse>("/auth/register", data),

  login: (data: LoginForm) =>
    api.post<LoginResponse>("/auth/login", data),

  logout: () =>
    api.post<{ message: string }>("/auth/logout"),

  me: () =>
    api.get<MeResponse>("/auth/me"),
});