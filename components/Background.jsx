"use client"
import { usePathname } from "next/navigation"
import Nav from "./Nav"
import Footer from "./Footer"

export default function Background({ children }) {
  const path = usePathname()
  const pageUrl = path === "/login" || path === "/create-account"

  return (
    <div
      className={`relative w-full h-full overflow-x-hidden ${
        pageUrl
          ? "bg-[url('/restaurant.jpg')] bg-cover bg-center"
          : " pt-20 bg-ash/35"
      }`}
    >
      {children}
    </div>
  )
}

export function LayoutWrapper({ children }) {
  const pathname = usePathname()
  const excludedPaths = ["/login", "/create-account"]

  const showNavAndFooter = !excludedPaths.includes(pathname)

  return (
    <>
      {showNavAndFooter && <Nav />}
      <main>{children}</main>
      {showNavAndFooter && <Footer />}
    </>
  )
}
