"use client"

import { styled } from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import SidebarMenu from "./SidebarMenu"

const drawerWidth = 240

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : theme.spacing(7),
    overflowX: "hidden",
    transition: "width 0.3s ease",
    top: "90px",
    left: "1.5rem",
    height: "calc(100% - 120px)",
    borderRadius: 16,
  },
}))

type Props = {
  open: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}

export default function SidebarDesktop({
  open,
  onHoverStart,
  onHoverEnd,
}: Props) {

  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <SidebarMenu showText={open} />
    </Drawer>
  )
}