"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Nav() {
  return (
    <header className="wrapper flex justify-between items-center py-6">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Little Lemon logo"
          width={150}
          height={150}
        />
      </Link>
      <nav className="font-bold text-base font-sans text-green">
        <NavLinks />
      </nav>
    </header>
  )
}
export const NavLinks = () => {
  const currentPath = usePathname()

  return (
    <>
      <Link
        href="/"
        className={`p-3
          ${currentPath === "/" ? "bg-ash rounded-md" : "hover:text-brownish"}
        `}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={`p-3
          ${
            currentPath === "/about"
              ? "bg-ash rounded-md"
              : "hover:text-brownish"
          }
        `}
      >
        About
      </Link>
      <Link
        href="/reservation"
        className={`p-3
          ${
            currentPath === "/reservation"
              ? "bg-ash rounded-md"
              : "hover:text-brownish"
          }
        `}
      >
        Reservation
      </Link>
      <Link
        href="/menu"
        className={`p-3
          ${
            currentPath === "/menu"
              ? "bg-ash rounded-md"
              : "hover:text-brownish"
          }
        `}
      >
        Menu
      </Link>
      <Link
        href="/order-online"
        className={`p-3
          ${
            currentPath === "/order-online"
              ? "bg-ash rounded-md"
              : "hover:text-brownish"
          }
        `}
      >
        Order Online
      </Link>
      <Link
        href="/login"
        className={`p-3
          ${
            currentPath === "/login"
              ? "bg-ash rounded-md"
              : "hover:text-brownish"
          }
        `}
      >
        Login
      </Link>
    </>
  )
}
