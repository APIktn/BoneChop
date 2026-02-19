"use client"

import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import HomeIcon from "@mui/icons-material/Home"
import SupportAgent from "@mui/icons-material/SupportAgent"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const currentValue = (() => {
    if (pathname === "/") return "Home"
    if (pathname.startsWith("/contact")) return "Contact"
    return false
  })()

  return (
    <BottomNavigation value={currentValue}>
      <BottomNavigationAction
        component={Link}
        href="/"
        label="Home"
        value="Home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        component={Link}
        href="/contact"
        label="Contact"
        value="Contact"
        icon={<SupportAgent />}
      />
    </BottomNavigation>
  )
}
