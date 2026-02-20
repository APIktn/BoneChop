"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useServices } from "./ServiceContext";
import { User } from "@/types/auth.api.type";
import AppModal from "@/component/modal/AppModal";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  updateUser: (userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const router = useRouter();
  const { auth } = useServices();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  const login = (userData: User) => setUser(userData);
  const updateUser = (userData: User) => setUser(userData);

  const logout = async () => {
    await auth.logout().catch(() => {});
    setUser(null);
    router.push("/");
  };

  // restore session
  useEffect(() => {
    const restore = async () => {
      try {
        const res = await auth.me();
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, [auth]);

  // listen event
  useEffect(() => {
    const handleExpired = () => {
      setUser(null);
      setSessionExpired(true);
    };

    window.addEventListener("auth-expired", handleExpired);

    return () => {
      window.removeEventListener("auth-expired", handleExpired);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, updateUser, logout }}
    >
      {children}

      <AppModal
        open={sessionExpired}
        type="error"
        title="Session Expired"
        message="Your session has expired. Please login again."
        onClose={() => {
          setSessionExpired(false);
          router.push("/login");
        }}
      />
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};