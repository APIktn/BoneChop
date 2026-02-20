"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  Card,
  Typography,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import PageWrapper from "@/component/PageWrapper";
import AppModal from "@/component/modal/AppModal";
import { useAuth } from "@/context/AuthContext";
import { useServices } from "@/context/ServiceContext";
import { validateLogin } from "@/validations/auth.validation";
import { LoginForm } from "@/types/auth.ui.type";

export default function LoginPage() {
  const router = useRouter();
  const { auth } = useServices();
  const { login } = useAuth();

  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [showPassword, setShowPassword] = useState(false);

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<{
    type: "success" | "error";
    title: string;
    message: string;
  }>({
    type: "success",
    title: "",
    message: "",
  });

  const openModal = (
    type: "success" | "error",
    title: string,
    message: string
  ) => {
    setModal({ type, title, message });
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name as keyof LoginForm]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name as keyof LoginForm]: "",
    }));
  };

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newErrors = validateLogin(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await auth.login(form);

      if (res.status === 200) {
        login(res.data.user);

        openModal(
          "success",
          "login successful",
          res.data.message
        );
      }
    } catch (error: unknown) {
      let message = "something went wrong";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          message;
      }

      openModal("error", "login failed", message);
    }
  };

  return (
    <PageWrapper>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ p: 4, width: 420 }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
          >
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Stack spacing={2}>
              <TextField
                label="Username or Email"
                name="username"
                size="small"
                fullWidth
                value={form.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                size="small"
                fullWidth
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>

              <Link
                href="/register"
                style={{
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                No account? Sign up here
              </Link>
            </Stack>
          </Box>
        </Card>

        <Link href="/" style={{ marginTop: 16 }}>
          Back to home
        </Link>
      </Box>

      <AppModal
        open={open}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </PageWrapper>
  );
}