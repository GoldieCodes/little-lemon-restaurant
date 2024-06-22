import MenuItems from "@/components/MenuItems"

export default function Menu() {
  return (
    <main className="wrapper">
      <h1 className="border-b-2 border-yellow/45 text-2xl text-green">
        Our Menu
      </h1>
      <div className="mt-14 col-span-full grid grid-cols-3 gap-10">
        <MenuItems />
        <MenuItems />
        <MenuItems />
      </div>
    </main>
  )
}
