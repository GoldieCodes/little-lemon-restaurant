import { MdTableBar } from "react-icons/md"
import Link from "next/link"

export default function Reservation() {
  return (
    <main className="wrapper">
      <h1 className="border-b-2 border-yellow/45 text-2xl text-green">
        Table Reservation
      </h1>
      <div className="min-h-[50vh] grid content-center">
        <p className="text-[#9cab99] flex gap-4 items-center place-self-center">
          <span className="text-2xl text-green/40">
            <MdTableBar />
          </span>
          You haven't made any reservations.
        </p>
        <Link href="/#" className="text-lg">
          Coming soon...
        </Link>
      </div>
    </main>
  )
}
