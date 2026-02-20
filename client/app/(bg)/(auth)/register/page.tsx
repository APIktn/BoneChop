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
import { useServices } from "@/context/ServiceContext";
import { RegisterForm } from "@/types/auth.ui.type";
import { validateRegister } from "@/validations/auth.validation";

export default function RegisterPage() {
  const router = useRouter();
  const { auth } = useServices();

  const [form, setForm] = useState<RegisterForm>({
    userEmail: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterForm>>({});
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
    if (modal.type === "success") {
      router.push("/login");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name as keyof RegisterForm]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name as keyof RegisterForm]: "",
    }));
  };

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newErrors = validateRegister(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await auth.register(form);

      if (res.status === 201 || res.status === 200) {
        openModal(
          "success",
          "Registration Successful",
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

      openModal("error", "Registration Failed", message);
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
          <Typography variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                label="First Name"
                name="firstName"
                size="small"
                fullWidth
                value={form.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />

              <TextField
                label="Last Name"
                name="lastName"
                size="small"
                fullWidth
                value={form.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />

              <TextField
                label="Email"
                name="userEmail"
                type="email"
                size="small"
                fullWidth
                value={form.userEmail}
                onChange={handleChange}
                error={!!errors.userEmail}
                helperText={errors.userEmail}
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
                slotProps={{
                  input: {
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
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
              >
                Register
              </Button>

              <Link
                href="/login"
                style={{
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                Already have an account? Login here
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