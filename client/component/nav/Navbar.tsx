"use client";

import {
  Toolbar,
  IconButton,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  Switch,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/context/Theme";

type Props = {
  onToggleSidebar?: () => void;
};

export default function Navbar({ onToggleSidebar }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const [isSticky, setIsSticky] = useState(false);

  // scroll detect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentValue =
    pathname === "/"
      ? "home"
      : pathname.startsWith("/contact")
        ? "contact"
        : false;

  return (
    <div className="navbar-layer">
      <Paper
        elevation={isSticky ? 3 : 8}
        className={`navbar ${isSticky ? "scrolled" : ""}`}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* LEFT */}
          <IconButton onClick={onToggleSidebar}>
            <MenuIcon />
          </IconButton>

          {/* CENTER */}
          <div className="navbar-center">
            <BottomNavigation
              value={currentValue}
              sx={{ background: "transparent" }}
            >
              <BottomNavigationAction
                component={Link}
                href="/"
                label="Home"
                value="home"
                icon={<HomeIcon />}
              />
              <BottomNavigationAction
                component={Link}
                href="/contact"
                label="Contact"
                value="contact"
                icon={<SupportAgentIcon />}
              />
            </BottomNavigation>
          </div>

          {/* RIGHT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* theme toggle */}
            <Switch
              checked={theme === "dark"}
              onChange={toggleTheme}
              icon={<span>☀️</span>}
              checkedIcon={<span>🌙</span>}
            />

            {/* login */}
            <Button
              variant="outlined"
              size="small"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Paper>
    </div>
  );
}
