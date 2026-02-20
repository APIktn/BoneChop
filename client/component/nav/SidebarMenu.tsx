"use client"

import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

import HomeIcon from "@mui/icons-material/Home"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import AddBoxIcon from "@mui/icons-material/AddBox"
import WarehouseIcon from "@mui/icons-material/Warehouse"

import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
  showText: boolean
  isMobile?: boolean
}

export default function SidebarMenu({
  showText,
  isMobile = false,
}: Props) {

  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <>
      {isMobile && (
        <>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/"
                selected={isActive("/")}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                {showText && <ListItemText primary="Home" />}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/contact"
                selected={isActive("/contact")}
              >
                <ListItemIcon>
                  <SupportAgentIcon />
                </ListItemIcon>
                {showText && <ListItemText primary="Contact" />}
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />
        </>
      )}

      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/AdminAddProduct"
            selected={isActive("/AdminAddProduct")}
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            {showText && <ListItemText primary="Add Product" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/AdminInventory"
            selected={isActive("/AdminInventory")}
          >
            <ListItemIcon>
              <WarehouseIcon />
            </ListItemIcon>
            {showText && <ListItemText primary="Inventory" />}
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )
}