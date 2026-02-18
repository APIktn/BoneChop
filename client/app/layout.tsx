import { ReactNode } from "react"
import Providers from "@/component/Providers"

import "@/css/index.css"
import "@/css/theme.css"
import "@/css/NotFound.css"
import "@/css/Class.css"

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
