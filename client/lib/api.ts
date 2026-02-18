"use client"

import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // สำคัญมาก
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true

      try {
        // เรียก refresh โดยใช้ cookie อัตโนมัติ
        await api.post("/auth/refresh")

        // retry request เดิม
        return api(originalRequest)

      } catch (refreshErr) {
        window.dispatchEvent(new Event("auth-expired"))
        return Promise.reject(refreshErr)
      }
    }

    return Promise.reject(err)
  }
)

export default api
