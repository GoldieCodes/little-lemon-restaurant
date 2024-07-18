"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { app } from "@/app/firebase"
import { userManagerParams } from "@/app/login/LoginChecker"
import { auth } from "@/app/firebase"
import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import { signOut, onAuthStateChanged } from "firebase/auth"

export default function Nav() {
  const currentPath = usePathname()

  return (
    <header className="wrapper flex justify-between items-start pt-6">
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
  const currentUser = userManagerParams()

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
      The value 'User' below is defined in a component file and imported here
    In its original component, I use Firebase auth to check if a User is logged in and that's 
    the value returned here 
*/}
      {currentUser !== null ? (
        <div
          className="relative inline-block min-w-32 p-3"
          onMouseLeave={() => setLogOutBtn(true)}
        >
          <p
            className="flex items-center gap-1 cursor-pointer text-sm font-sans text-green mb-2"
            onMouseEnter={() => setLogOutBtn(false)}
          >
            Hi User <FaCaretDown />
          </p>
          <button
            className={`py-[6px] px-6 bg-pinkish hover:bg-yellow ${
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

//this function is used in the LogOut button above to sign out a user
function SignOut() {
  signOut(auth)
    .then(() => {
      console.log("the person is now signed out")
    })
    .catch((error) => {
      console.log("an error occurred: " + error)
    })

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid
  //     console.log("still signed in")
  //     // ...
  //   } else {
  //     console.log("really signed out")
  //   }
  // })
}
