import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-green pt-5 mt-16">
      <main className="wrapper flex flex-wrap justify-between space-y-5 gap-5">
        <span
          role="site logo"
          aria-label="logo"
          className="hidden md:flex self-center bg-[url('/croppedlogo.png')] bg-contain bg-no-repeat bg-left"
        >
          <Link href="/">
            <p className="ml-7 font-bold text-ash text-base tracking-widest font-serif">
              LITTLE LEMON
            </p>
          </Link>
        </span>
        <nav className="flex flex-col">
          <h6 className="text-xs">Navigation</h6>
          <div className="flex flex-col text-xs">
            <Link href="/" className="hover:text-brownish">
              Home
            </Link>
            <Link href="/about" className="hover:text-brownish">
              About
            </Link>
            <Link href="/reservation" className="hover:text-brownish">
              Reservation
            </Link>
            <Link href="/menu" className="hover:text-brownish">
              Menu
            </Link>
            <Link href="/order-online" className="hover:text-brownish">
              Order Online
            </Link>
          </div>
        </nav>
        <nav className="">
          <h6 className="text-xs">Contact</h6>
          <p className="text-xs">
            Address
            <br />
            Phone number
            <br />
            Email
          </p>
        </nav>
        <nav className="">
          <h6 className="text-xs">Social Media</h6>
          <p className="text-xs">
            Instagram
            <br />
            Facebook
            <br />
            Twitter
          </p>
        </nav>
      </main>
      <aside className="border-t-[1px] border-t-[#6d7c6c] mt-14 py-6 text-[13px] text-[#afafaf] text-center">
        Copyright © {year} Little Lemon Inc.
      </aside>
    </footer>
  )
}
