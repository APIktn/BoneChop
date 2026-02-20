"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import api from "@/services/api";
import { createAuthService } from "@/services/auth.service";

export interface Services {
  auth: ReturnType<typeof createAuthService>;
}

const ServiceContext = createContext<Services | null>(null);

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider = ({ children }: ServiceProviderProps) => {
  const services = useMemo<Services>(() => {
    return {
      // container
      auth: createAuthService(api),
    };
  }, []);

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = (): Services => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within ServiceProvider");
  }
  return context;
};