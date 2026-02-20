import { RegisterForm, LoginForm } from "../types/auth.ui.type";

export const validateRegister = (
  form: RegisterForm
): Partial<RegisterForm> => {
  const errors: Partial<RegisterForm> = {};

  if (!form.firstName?.trim()) {
    errors.firstName = "first name is required";
  }

  if (!form.lastName?.trim()) {
    errors.lastName = "last name is required";
  }

  if (!form.userEmail?.trim()) {
    errors.userEmail = "email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.userEmail)) {
    errors.userEmail = "invalid email format";
  }

  if (!form.password) {
    errors.password = "password is required";
  } else if (form.password.length < 10) {
    errors.password = "password must be at least 10 characters";
  }

  return errors;
};

export const validateLogin = (
  form: LoginForm
): Partial<LoginForm> => {
  const errors: Partial<LoginForm> = {};

  if (!form.username?.trim()) {
    errors.username = "username or email is required";
  }

  if (!form.password) {
    errors.password = "password is required";
  } else if (form.password.length < 10) {
    errors.password = "password must be at least 10 characters";
  }

  return errors;
};