"use client"

import { useTheme } from "@/context/Theme"

const DARK_VIDEO = "/video/bg_dark_video.mp4"
const LIGHT_VIDEO = "/video/bg_light_video.mp4"

export default function BgLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()
  const bgVideo = theme === "dark" ? DARK_VIDEO : LIGHT_VIDEO

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "hidden",
      }}
    >
      <video
        key={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {children}
    </div>
  )
}
