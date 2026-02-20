"use client"

import { Box, Grow } from "@mui/material"
import Image from "next/image"

const RESUME_IMG = "/image/dark_theme_bg.png"

export default function ContactPage() {

  return (
    <Grow in timeout={500}>
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "80vh",
          }}
        >
          <Image
            src={RESUME_IMG}
            alt="resume"
            fill
            style={{
              objectFit: "contain",
            }}
            priority
          />
        </Box>
      </Box>
    </Grow>
  )
}