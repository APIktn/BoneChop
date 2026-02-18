"use client"

import { createContext, useContext, useMemo, ReactNode } from "react"
import api from "@/lib/api"
import { createAuthService } from "@/services/auth.service"

type Services = {
  auth: ReturnType<typeof createAuthService>
}

const ServiceContext = createContext<Services | undefined>(undefined)

type Props = {
  children: ReactNode
}

export function ServiceProvider({ children }: Props) {
  const services = useMemo(() => {
    return {
      auth: createAuthService(api),
    }
  }, [])

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  )
}

export const useServices = () => {
  const context = useContext(ServiceContext)
  if (!context) {
    throw new Error("useServices must be used inside ServiceProvider")
  }
  return context
}
