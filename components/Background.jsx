"use client"
import { usePathname } from "next/navigation"

export default function Background({ children }) {
  const path = usePathname()
  const pageUrl = path === "/login" || path === "/create-account"

  return (
    <div
      className={`relative w-full h-full pt-20 overflow-x-hidden ${
        pageUrl
          ? "bg-[url('/restaurant.jpg')] bg-[black]/60 bg-blend-overlay bg-cover bg-center"
          : "bg-ash/35"
      }`}
    >
      {children}
    </div>
  )
}
