"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LoggedinUserParams } from "@/app/login/LoginChecker"
import { app, auth } from "@/app/firebase"
import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import { signOut } from "firebase/auth"

export default function Nav() {
  const currentPath = usePathname()

  return (
    <header className="wrapper flex justify-between items-start py-6">
      <Link href="/">
        {currentPath === "/login" || currentPath === "/create-account" ? (
          <Image
            src="/logo-white.png"
            alt="Little Lemon logo"
            width={150}
            height={150}
          />
        ) : (
          <Image
            src="/logo.svg"
            alt="Little Lemon logo"
            width={150}
            height={150}
          />
        )}
      </Link>

      <NavLinks />
    </header>
  )
}

export const NavLinks = () => {
  const currentPath = usePathname()
  const [hideLogOutBtn, setLogOutBtn] = useState(true)
  const userParams = LoggedinUserParams()

  //this function is used in the LogOut button above to sign out a user
  function SignOut() {
    signOut(auth)
      .then(() => {
        console.log("the person is now signed out")
        userParams.setCurrentUser(null)
      })
      .catch((error) => {
        console.log("an error occurred: " + error)
      })
  }

  return (
    <nav className="font-semibold text-sm font-sans text-green flex items-start">
      <Link
        href="/"
        className={`p-3
          ${
            currentPath === "/"
              ? "bg-ash rounded-md"
              : currentPath === "/login" || currentPath === "/create-account"
              ? "text-ash hover:text-brownish"
              : "hover:text-brownish"
          }
        `}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={`p-3
          ${
            currentPath === "/about"
              ? "activeNav"
              : currentPath === "/login" || currentPath === "/create-account"
              ? "loginNav"
              : "navHover"
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
              ? "activeNav"
              : currentPath === "/login" || currentPath === "/create-account"
              ? "loginNav"
              : "navHover"
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
              ? "activeNav"
              : currentPath === "/login" || currentPath === "/create-account"
              ? "loginNav"
              : "navHover"
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
              ? "activeNav"
              : currentPath === "/login" || currentPath === "/create-account"
              ? "loginNav"
              : "navHover"
          }
        `}
      >
        Order Online
      </Link>
      {/*   
        userParams is the value object from the Context API I defined in the LoginChecker file
        currentUser is one of the values gotten from the Context provider 
      */}
      {userParams.currentUser !== null ? (
        <div
          className="relative inline-block min-w-32 p-3"
          onMouseLeave={() => setLogOutBtn(true)}
        >
          <p
            className="flex items-center gap-1 cursor-pointer text-sm font-sans text-green mb-2"
            onMouseEnter={() => setLogOutBtn(false)}
          >
            Hi, {userParams.username} <FaCaretDown />
          </p>
          <button
            className={`absolute py-[6px] px-6 bg-pinkish hover:bg-yellow ${
              hideLogOutBtn ? "invisible" : "visible"
            }`}
            onClick={() => SignOut()}
          >
            Log out
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className={`p-3
          ${
            currentPath === "/login"
              ? "activeNav"
              : currentPath === "/login" || currentPath === "/create-account"
              ? "loginNav"
              : "navHover"
          }
        `}
        >
          Login
        </Link>
      )}
    </nav>
  )
}
