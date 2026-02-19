import { ReactNode } from "react";
import ThemeRegistry from "@/lib/ThemeRegistry";
import { ThemeProvider } from "@/context/Theme"
import "./globals.css"
import "./class.css"
import "@/styles/Navbar.css"

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: "BoneChop!",
  icons: {
    icon: "/icon/url_icon.svg",
  },
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeRegistry><ThemeProvider>{children}</ThemeProvider></ThemeRegistry>
      </body>
    </html>
  );
}
