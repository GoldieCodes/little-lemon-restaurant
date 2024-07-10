"use client"
import { usePathname } from "next/navigation"

export default function Background({ children }) {
  const path = usePathname()
  const pageUrl = path === "/login" || path === "/create-account"

  return (
    <div
      className={`relative w-full h-full ${
        pageUrl
          ? "bg-[url('/restaurant.jpg')] bg-[black]/60 bg-blend-overlay"
          : "bg-ash/35"
      }`}
    >
      {children}
    </div>
  )
}
