"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LoggedinUserParams } from "@/app/login/LoginChecker"
import { LogOutBtn } from "@/app/login/page"
import { useEffect, useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import { FaBasketShopping } from "react-icons/fa6"
import { CartContextParams } from "@/app/cart/CartContext"
import { RxHamburgerMenu } from "react-icons/rx"
import { MdClose } from "react-icons/md"

export default function Nav() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        hasScrolled
          ? "bg-[white]/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="wrapper flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Little Lemon logo"
            width={150}
            height={150}
          />
        </Link>
        <NavLinks />
      </div>
    </header>
  )
}

export const NavLinks = () => {
  const currentPath = usePathname()
  const [hideLogOutBtn, setLogOutBtn] = useState(true)
  const userParams = LoggedinUserParams()
  const { cartNumber, newItemAdded } = CartContextParams(null)
  const [hideMenu, setHideMenu] = useState(true)
  const navlinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Reservation", href: "/reservation" },
    { name: "Menu", href: "/menu" },
    { name: "Order Online", href: "/order-online" },
  ]

  //I used useEffect here because the UI was always showing the logout button whenever a new login is done
  //So the useEffect here always fires whenever the currentUser state changes, to hide the button (in case it is not hidden)
  //You can comment out this line and try a new login to see what the UI would do
  useEffect(() => {
    setLogOutBtn(true)
  }, [userParams.currentUser])

  useEffect(() => {
    setHideMenu(true)
  }, [currentPath])

  return (
    <nav className="font-semibold text-sm font-sans text-green flex items-center">
      <div className="hidden md:block">
        {navlinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`p-3
            ${currentPath === link.href ? "activeNav" : "navHover"}
          `}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div
        className={`mobileNav md:hidden ${
          hideMenu ? "left-full opacity-0" : "left-0 opacity-100"
        }`}
      >
        {navlinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`p-3
            ${currentPath === link.href ? "activeNav" : "navHover"}
          `}
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/*   
        userParams is the value object from the Context API I defined in the LoginChecker file
        currentUser is one of the values gotten from the Context provider 
      */}
      {userParams.currentUser !== null ? (
        <>
          <span className="p-3 relative">
            <Link
              href="/cart"
              className={`text-base md:text-lg
            ${currentPath === "/cart" ? "activeNav" : "navHover"}
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
                      : "-top-1 font-bold text-xs px-[4px] py-[2px] md:py-[0.3rem] md:px-[0.4rem] bg-dark/80 text-[white]"
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

          <div className="relative group inline-block p-3">
            <p
              className="text-xs flex items-center gap-1 cursor-pointer md:text-sm font-sans text-green"
              onClick={() => setLogOutBtn(!hideLogOutBtn)}
            >
              Hi, {userParams.username}{" "}
              <span
                className={`${
                  !hideLogOutBtn && "rotate-180"
                } transition-all duration-300`}
              >
                <FaCaretDown />
              </span>
            </p>
            <LogOutBtn hideLogOutBtn={hideLogOutBtn} />
          </div>
        </>
      ) : (
        <Link
          href="/login"
          className={`p-3
          ${currentPath === "/login" ? "activeNav" : "navHover"}
        `}
        >
          Login
        </Link>
      )}

      {/* this is the hamburger menu icon for mobileNav */}
      <span
        className="md:hidden text-lg cursor-pointer"
        onClick={() => setHideMenu(!hideMenu)}
      >
        {hideMenu ? <RxHamburgerMenu /> : <MdClose />}
      </span>
    </nav>
  )
}
