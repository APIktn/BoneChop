"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material"
import Grid from "@mui/material/Grid"
import Image from "next/image"

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import "./page.css"

const LOGO = "/image/mrbonelogo.png"

const IMAGES = [
  "/image/MRBone_1.png",
  "/image/MRBone_2.png",
  "/image/MRBone_3.png",
  "/image/MRBone_4.png",
  "/image/MRBone_5.png",
  "/image/MRBone_6.png",
  "/image/MRBone_7.png",
  "/image/MRBone_8.png",
]

const PACK_IMAGE = "/image/MRBone_pack1.png"

const VIDEO_1 = "/video/MRBone_V1.mp4"
const VIDEO_2 = "/video/MRBone_V2.mp4"

export default function Home() {
  const [animateText, setAnimateText] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0)
  const [animDir, setAnimDir] = useState<"left" | "right" | null>(null)

  const leftImg = IMAGES[(index - 1 + IMAGES.length) % IMAGES.length]
  const centerImg = IMAGES[index]
  const rightImg = IMAGES[(index + 1) % IMAGES.length]

  const prev = () => {
    setAnimDir("left")
    setIndex((i) => (i === 0 ? IMAGES.length - 1 : i - 1))
  }

  const next = () => {
    setAnimDir("right")
    setIndex((i) => (i === IMAGES.length - 1 ? 0 : i + 1))
  }

  // reset animation
  useEffect(() => {
    if (!animDir) return
    const t = setTimeout(() => setAnimDir(null), 300)
    return () => clearTimeout(t)
  }, [animDir])

  useEffect(() => {
    setAnimateText(true)
  }, [])

  // scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show")
        })
      },
      { threshold: 0.2 },
    )

    document.querySelectorAll(".scroll-fade").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // title 1
  useEffect(() => {
    const title = document.querySelector(".observe-title")
    if (!title) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          title.classList.add("animate")
          observer.unobserve(title)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(title)
    return () => observer.disconnect()
  }, [])

  // title 2
  useEffect(() => {
    const title2 = document.querySelector(".card-2-title2")
    if (!title2) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) title2.classList.add("animate")
      },
      { threshold: 0.5 },
    )

    observer.observe(title2)
    return () => observer.disconnect()
  }, [])

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, pb: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>

        <Grid container spacing={3}>

          {/* ================= card 1 (hero) ================= */}
          <Grid size={{ xs: 12 }}>
            <Box
              className="feature-card card-1 scroll-fade"
              sx={{
                height: { xs: "auto", md: 420 },
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                backgroundImage: `url("/image/land_1.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.4)",
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 2, p: { xs: 3, md: 5 } }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Typography
                      component="h1"
                      sx={{
                        fontSize: { xs: "2.5rem", md: "5rem" },
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        color: "#fff",
                      }}
                      className={animateText ? "text-animate" : ""}
                    >
                      bone chop!
                    </Typography>

                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: { xs: "1rem", md: "2rem" },
                        opacity: 0.9,
                        mt: 1,
                      }}
                      className={animateText ? "text-animate-delay" : ""}
                    >
                      art toy shop for collectors
                    </Typography>

                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: { xs: "1rem", md: "2rem" },
                        opacity: 0.9,
                        mt: 0.5,
                      }}
                      className={animateText ? "text-animate-delay" : ""}
                    >
                      who love unique and creative designs
                    </Typography>

                    <Box component="ul" className="feature-list slide-list" sx={{ mt: 2, color: "#fff" }}>
                      <li>original art toy collections</li>
                      <li>limited & exclusive figures</li>
                      <li>designer toys from local artists</li>
                      <li>handcrafted details & quality paint</li>
                      <li>collectible pieces with unique stories</li>
                      <li>perfect for display & collection</li>
                    </Box>

                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        borderRadius: 3,
                        px: 3,
                        py: 1.2,
                        textTransform: "none",
                        fontWeight: 700,
                      }}
                    >
                      shop now!
                    </Button>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ position: "relative", width: "100%", height: { xs: 220, md: 320 } }}>
                      <Image
                        src={LOGO}
                        alt="bone chop logo"
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          {/* ================= card 1.5 (stats) ================= */}
          <Grid size={{ xs: 12 }}>
            <Box
              className="feature-card card-15 scroll-fade"
              sx={{
                height: "auto",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                backgroundImage: `url("/image/land_1_5.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.4)",
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 2, p: { xs: 3, md: 4 } }}>
                <Grid container spacing={2} textAlign="center">
                  <Grid size={{ xs: 12, md: 4 }} className="stat-item">
                    <Box className="stat-number gold">500+</Box>
                    <Box className="stat-label" sx={{ color: "#fff" }}>
                      original collections
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }} className="stat-item">
                    <Box className="stat-number gold">100,000+</Box>
                    <Box className="stat-label" sx={{ color: "#fff" }}>
                      sold items worldwide
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }} className="stat-item">
                    <Box className="stat-number gold">500,000+</Box>
                    <Box className="stat-label" sx={{ color: "#fff" }}>
                      collector community
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          {/* ================= card 2 (carousel) ================= */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%" }}>
              <Typography
                className="observe-title card-2-title"
                sx={{
                  textAlign: "center",
                  mb: 2,
                }}
              >
                select your style!
              </Typography>

              <Box
                className="feature-card card-2 scroll-fade"
                sx={{
                  height: { xs: 260, md: 320 },
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  backgroundImage: `url("/image/land_2.png")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.4)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    px: 2,
                  }}
                >
                  <IconButton aria-label="prev" onClick={prev}>
                    <ChevronLeftIcon sx={{ color: "#fff" }} />
                  </IconButton>

                  {/* left */}
                  <Box
                    sx={{
                      display: { xs: "none", md: "block" },
                      width: 120,
                      height: 120,
                      opacity: 0.6,
                      transform: "scale(0.9)",
                      position: "relative",
                    }}
                    className={animDir ? "slide-left" : ""}
                  >
                    <Image src={leftImg} alt="left" fill style={{ objectFit: "contain" }} />
                  </Box>

                  {/* center */}
                  <Box
                    sx={{
                      width: { xs: 160, md: 300 },
                      height: { xs: 160, md: 300 },
                      position: "relative",
                    }}
                    className={
                      animDir === "right"
                        ? "slide-in-right"
                        : animDir === "left"
                        ? "slide-in-left"
                        : ""
                    }
                  >
                    <Image src={centerImg} alt="center" fill style={{ objectFit: "contain" }} />
                  </Box>

                  {/* right */}
                  <Box
                    sx={{
                      display: { xs: "none", md: "block" },
                      width: 120,
                      height: 120,
                      opacity: 0.6,
                      transform: "scale(0.9)",
                      position: "relative",
                    }}
                    className={animDir ? "slide-right" : ""}
                  >
                    <Image src={rightImg} alt="right" fill style={{ objectFit: "contain" }} />
                  </Box>

                  <IconButton aria-label="next" onClick={next}>
                    <ChevronRightIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Box>
              </Box>

              <Typography
                className="card-2-title2"
                sx={{
                  textAlign: "center",
                  mt: 2,
                }}
              >
                find your favorite
              </Typography>
            </Box>
          </Grid>

          {/* ================= card 3 (video) ================= */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              className="feature-card video-card scroll-fade"
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                height: { xs: 380, md: 800 },
              }}
            >
              <video
                className="bg-video"
                src={VIDEO_1}
                autoPlay
                loop
                muted
                playsInline
              />
              <Box className="video-overlay" />

              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  p: { xs: 3, md: 4 },
                }}
              >
                <Typography className="big-title" sx={{ color: "#fff", fontWeight: 800 }}>
                  KEEP YOUR <br /> SUPER SECRET
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* ================= card 4 (split) ================= */}
          <Grid size={{ xs: 12 }}>
            <Box
              className="feature-card card-4 split-card scroll-fade"
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                height: { xs: "auto", md: 450 },
                backgroundImage: `url("/image/land_3.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.25)",
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 2 }}>
                <Grid container sx={{ minHeight: { xs: "auto", md: 450 } }}>
                  <Grid
                    size={{ xs: 12, md: 8 }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      background: "#11111120",
                    }}
                  >
                    <Box sx={{ p: { xs: 3, md: 4 }, color: "#fff" }}>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "2rem", md: "3.5rem" },
                          lineHeight: 1.1,
                        }}
                      >
                        unboxing mr.bone <br /> camping series
                      </Typography>

                      <Typography sx={{ mt: 1, fontSize: { xs: "1rem", md: "1.3rem" }, opacity: 0.9 }}>
                        join mr.bone on his camping adventure
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    size={{ xs: 12, md: 4 }}
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#d65f10b9",
                      minHeight: { xs: 220, md: 450 },
                    }}
                  >
                    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                      <Image
                        src={PACK_IMAGE}
                        alt="pack"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          {/* ================= card 5 (video + contact) ================= */}
          <Grid size={{ xs: 12 }}>
            <Box
              className="feature-card card-5 video-card scroll-fade"
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                height: { xs: 220, md: 320 },
              }}
            >
              <video
                className="bg-video"
                src={VIDEO_2}
                autoPlay
                loop
                muted
                playsInline
              />
              <Box className="video-overlay" />

              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  px: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    letterSpacing: "1px",
                    opacity: 0.85,
                    color: "#fff",
                    fontSize: { xs: "1.6rem", md: "3rem" },
                  }}
                >
                  contact me
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    opacity: 0.85,
                    color: "#fff",
                    fontSize: { xs: "0.95rem", md: "3rem" },
                  }}
                >
                  apisitamornktn@gmail.com
                </Typography>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Box>
  )
}