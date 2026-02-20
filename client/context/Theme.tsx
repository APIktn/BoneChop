"use client"

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react"
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

type ThemeMode = "light" | "dark"

interface ThemeContextType {
  theme: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<ThemeMode>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme") as ThemeMode | null
    if (saved === "light" || saved === "dark") {
      setTheme(saved)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
        },
      }),
    [theme]
  )

  if (!mounted) return null

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider")
  return ctx
}