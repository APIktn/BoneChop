"use client"

import * as React from "react"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [cache] = React.useState(() => {
    const cache = createCache({
      key: "mui",
      prepend: true,
    })
    cache.compat = true
    return cache
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}
