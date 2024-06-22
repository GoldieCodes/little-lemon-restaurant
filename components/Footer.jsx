import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-dark py-12 mt-16">
      <main className="w-[1120px] m-auto grid grid-cols-12">
        <Image
          src="/logo-white.png"
          alt="Little Lemon Logo"
          width={250}
          height={250}
          className="col-span-6 place-self-center"
        />
        <nav className="flex flex-col col-span-2">
          <h6>Navigation</h6>
          <div className="flex flex-col text-base">
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
            <Link href="/login" className="hover:text-brownish">
              Login
            </Link>
          </div>
        </nav>
        <nav className="col-span-2">
          <h6>Contact</h6>
          <p>Address</p>
          <p>Phone number</p>
          <p>Email</p>
        </nav>
        <nav className="col-span-2">
          <h6>Social Media Links</h6>
          <p>Address</p>
          <p>Phone number</p>
          <p>Email</p>
        </nav>
      </main>
    </footer>
  )
}
