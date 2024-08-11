import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-green pt-5 pb-10 mt-16">
      <main className="wrapper flex flex-wrap justify-between space-y-5 gap-5">
        <Image
          src="/logo-white.png"
          alt="Little Lemon Logo"
          width={250}
          height={250}
          className="hidden md:flex self-center"
        />
        <nav className="flex flex-col">
          <h6>Navigation</h6>
          <div className="flex flex-col text-sm">
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
          <h6>Contact</h6>
          <p className="text-sm">
            Address
            <br />
            Phone number
            <br />
            Email
          </p>
        </nav>
        <nav className="">
          <h6>Social Media</h6>
          <p className="text-sm">
            Instagram
            <br />
            Facebook
            <br />
            Twitter
          </p>
        </nav>
      </main>
    </footer>
  )
}
