import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#2b3a35] pt-5 mt-16">
      <main className="wrapper flex flex-wrap justify-between space-y-5 gap-5">
        <span
          role="site logo"
          aria-label="logo"
          className="hidden md:flex self-center bg-[url('/croppedlogo.png')] bg-contain bg-no-repeat bg-left"
        >
          <Link href="/">
            <p className="ml-10 font-bold text-ash text-xl tracking-widest font-serif">
              LITTLE LEMON
            </p>
          </Link>
        </span>
        <nav className="flex flex-col">
          <h6 className="text-xs md:text-sm">Navigation</h6>
          <div className="flex flex-col text-xs md:text-sm">
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
          <h6 className="text-xs md:text-sm">Contact</h6>
          <p className="text-xs md:text-sm">
            Address
            <br />
            Phone number
            <br />
            Email
          </p>
        </nav>
        <nav className="">
          <h6 className="text-xs md:text-sm">Social Media</h6>
          <p className="text-xs md:text-sm">
            Instagram
            <br />
            Facebook
            <br />
            Twitter
          </p>
        </nav>
      </main>
      <aside className="border-t-[1px] border-t-[#6d7c6c] mt-14 py-6 text-[14px] text-[#afafaf] text-center">
        Copyright © {year} Little Lemon Inc.
      </aside>
    </footer>
  )
}
