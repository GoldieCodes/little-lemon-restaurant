"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LoggedinUserParams } from "@/app/login/LoginChecker"
import { SignOut } from "@/app/login/page"
import { useEffect, useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import { FaBasketShopping } from "react-icons/fa6"
import { CartContextParams } from "@/app/cart/CartContext"

export default function Nav() {
  const currentPath = usePathname()

  return (
    <header className="wrapper flex justify-between items-center py-4">
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
  const { cartNumber, newItemAdded } = CartContextParams(null)

  //I used useEffect here because the UI was always showing the logout button whenever a new login is done
  //So the useEffect here always fires whenever the currentUser state changes, to hide the button (in case it is not hidden)
  //You can comment out this line and try a new login to see what the UI would do
  useEffect(() => {
    setLogOutBtn(true)
  }, [userParams.currentUser])

  return (
    <nav className="font-semibold text-sm font-sans text-green flex items-center">
      <Link
        href="/"
        className={`p-3
          ${
            currentPath === "/"
              ? "activeNav"
              : currentPath === "/login" || currentPath === "/create-account"
              ? "loginNav"
              : "navHover"
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
        <>
          <span className="p-3 relative">
            <Link
              href="/cart"
              className={`text-xl 
            ${
              currentPath === "/cart"
                ? "activeNav"
                : currentPath === "/login" || currentPath === "/create-account"
                ? "loginNav"
                : "navHover"
            }
                    `}
            >
              <FaBasketShopping />
            </Link>

            {cartNumber > 0 ? (
              <span className="absolute flex h-3 w-3 top-[0.3rem] right-3">
                <span
                  role="items in cart"
                  className={`absolute leading-[1] rounded-full ${
                    newItemAdded
                      ? "animate-ping absolute inline-flex h-full w-full text-[0px] p-[0.3rem] bg-orange opacity-75"
                      : "-top-1 text-xs py-[0.3rem] px-[0.4rem] bg-[#fcd860e7]"
                  }`}
                >
                  {cartNumber}
                </span>
                {newItemAdded ? (
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange"></span>
                ) : null}
              </span>
            ) : null}
          </span>

          <div
            className="relative group inline-block min-w-32 p-3"
            onMouseLeave={() => setLogOutBtn(true)}
          >
            <p
              className=" flex items-center gap-1 cursor-pointer text-sm font-sans text-green"
              onMouseEnter={() => setLogOutBtn(false)}
            >
              Hi, {userParams.username}{" "}
              <span className="group-hover:rotate-180 transition-all duration-300">
                <FaCaretDown />
              </span>
            </p>
            <button
              className={`absolute top-12 z-50 py-[6px] px-6 bg-pinkish hover:bg-yellow ${
                hideLogOutBtn ? "invisible" : "visible"
              }`}
              onClick={() => SignOut()}
            >
              Log out
            </button>
          </div>
        </>
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
