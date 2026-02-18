"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "@/context/Theme"
import { ServiceProvider } from "@/context/ServiceContext"
import { AuthProvider } from "@/context/AuthContext"

type Props = {
  children: ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      <ServiceProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ServiceProvider>
    </ThemeProvider>
  )
}
