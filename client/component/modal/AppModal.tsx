"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Fade,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { ReactNode } from "react";

type ModalType = "success" | "error" | "warning";
type ModalMode = "alert" | "confirm";

interface AppModalProps {
  open: boolean;
  onClose?: () => void;

  title: string;
  message: string;
  type?: ModalType;
  mode?: ModalMode;

  confirmText?: string;
  cancelText?: string;

  onConfirm?: () => void;
  onCancel?: () => void;

  link1?: string;
  link1Text?: string;
  link2?: string;
  link2Text?: string;
}

export default function AppModal({
  open,
  onClose,

  title,
  message,
  type = "success",
  mode = "alert",

  confirmText = "OK",
  cancelText = "Cancel",

  onConfirm,
  onCancel,

  link1,
  link1Text,
  link2,
  link2Text,
}: AppModalProps) {
  const isSuccess = type === "success";
  const isError = type === "error";

  const icon: ReactNode =
    type === "success" ? (
      <CheckCircleIcon sx={{ fontSize: 34, color: "#2e7d32" }} />
    ) : type === "error" ? (
      <ErrorIcon sx={{ fontSize: 34, color: "#d32f2f" }} />
    ) : (
      <WarningAmberIcon sx={{ fontSize: 34, color: "#ed6c02" }} />
    );

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          onClose?.();
        }
      }}
      slots={{ transition: Fade }}
      slotProps={{
        transition: { timeout: 220 },
        paper: {
          sx: {
            width: 420,
            minHeight: 220,
            borderRadius: 4,
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease",
          },
        },
      }}
    >
      {/* Title */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          fontWeight: 600,
          fontSize: "1.15rem",
          color: isSuccess
            ? "#1b5e20"
            : isError
            ? "#b71c1c"
            : "#e65100",
        }}
      >
        {icon}
        {title}
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ pt: 1 }}>
        <DialogContentText
          sx={{
            fontSize: "0.95rem",
            color: "rgba(0,0,0,0.85)",
            lineHeight: 1.6,
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ pb: 3, px: 3 }}>
        {mode === "confirm" && (
          <Button
            onClick={onCancel || onClose}
            variant="outlined"
            sx={{
              borderRadius: 999,
              textTransform: "none",
            }}
          >
            {cancelText}
          </Button>
        )}

        {link1 && (
          <Button
            component="a"
            href={link1}
            sx={{ textTransform: "none" }}
          >
            {link1Text || "Open"}
          </Button>
        )}

        {link2 && (
          <Button
            component="a"
            href={link2}
            sx={{ textTransform: "none" }}
          >
            {link2Text || "Open"}
          </Button>
        )}

        <Button
          onClick={mode === "confirm" ? onConfirm : onClose}
          variant="contained"
          sx={{
            px: 4,
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 500,
            background: isSuccess
              ? "linear-gradient(135deg,#4caf50,#81c784)"
              : isError
              ? "linear-gradient(135deg,#e53935,#ef5350)"
              : "linear-gradient(135deg,#fb8c00,#ffb74d)",
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}