"use client"

import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import SidebarMenu from "./SidebarMenu"

type Props = {
  open: boolean
  onClose: () => void
}

export default function SidebarMobile({
  open,
  onClose,
}: Props) {

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="left"
      variant="temporary"
      ModalProps={{
        keepMounted: true,
        disableScrollLock: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: 260,
          borderRadius: "0 20px 20px 0",
          backdropFilter: "blur(16px)",
          background: "rgba(255,255,255,0.85)",
          borderRight: "1px solid rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box
        sx={{
          mt: 10,
          px: 1,
        }}
      >
        <SidebarMenu showText={true} isMobile />
      </Box>
    </Drawer>
  )
}