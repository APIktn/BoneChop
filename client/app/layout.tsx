import { ReactNode } from "react";
import ThemeRegistry from "@/lib/ThemeRegistry";
import { ThemeProvider } from "@/context/Theme";
import { ServiceProvider } from "@/context/ServiceContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import "./class.css";
import "@/styles/Navbar.css";
import "@/styles/Footer.css";

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: "BoneChop!",
  icons: {
    icon: "/icon/url_icon.svg",
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <ServiceProvider>
            <AuthProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </AuthProvider>
          </ServiceProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
