import { ReactNode } from "react";
import ThemeRegistry from "@/lib/ThemeRegistry";
import "./globals.css"
import "./class.css"

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
