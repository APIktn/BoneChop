"use client"

import { useState } from "react"
import Navbar from "./nav/Navbar"
import Footer from "./Footer"

type Props = {
  children: React.ReactNode
}

export default function Header({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <Navbar/>

      <div className="grow">
        {children}
      </div>

      <Footer />
    </div>
  )
}
