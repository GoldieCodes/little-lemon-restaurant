import { useContext } from "react"
import Link from "next/link"

export default function () {
  const viewItem = useContext()

  return (
    <div className="wrapper h-[60vh] space-y-4 grid content-center">
      <h2>Nothing to see here</h2>
      <p>
        Let's get you back to the{" "}
        <Link href="/" className="text-brownish font-bold underline">
          home page.
        </Link>
      </p>
    </div>
  )
}
