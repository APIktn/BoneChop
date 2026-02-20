"use client"

import { useState, useEffect } from "react"
import { Box } from "@mui/material"

import Navbar from "@/component/nav/Navbar"
import Footer from "@/component/Footer"
import SidebarDesktop from "@/component/nav/SidebarDesktop"
import SidebarMobile from "@/component/nav/SidebarMobile"

export default function NavLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [isSidebarHovered, setIsSidebarHovered] = useState<boolean>(false)

  const isSidebarExpanded = isSidebarOpen && isSidebarHovered

  // responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 992)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // คำนวณความกว้าง sidebar
  const sidebarWidth = isMobile
    ? 0
    : isSidebarExpanded
    ? 240
    : isSidebarOpen
    ? 56
    : 0

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <Navbar
        onToggleSidebar={() => {
          setIsSidebarOpen((prev) => !prev)
          setIsSidebarHovered(false)
        }}
      />

      {/* Desktop Sidebar */}
      {!isMobile && isSidebarOpen && (
        <SidebarDesktop
          open={isSidebarExpanded}
          onHoverStart={() => setIsSidebarHovered(true)}
          onHoverEnd={() => setIsSidebarHovered(false)}
        />
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <SidebarMobile
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          px: 3,
          ml: `${sidebarWidth}px`,
          transition: "margin 0.3s ease",
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}