import { MdTableBar } from "react-icons/md"
import Link from "next/link"

export default function Reservation() {
  return (
    <main className="wrapper">
      <h1 className="border-b-2 border-yellow/45 text-2xl text-green">
        Table Reservation
      </h1>
      <div className="min-h-[50vh] grid place-self-center align-middle">
        <p className="text-xl text-[#9cab99] flex gap-6 items-center group">
          You don't have any reservations.
        </p>
        <span className="text-2xl text-green/40">
          <MdTableBar />
        </span>
        <Link href="/#" className="text-lg">
          Coming soon...
        </Link>
      </div>
    </main>
  )
}
