"use client"
import Image from "next/image"
import Link from "next/link"
import { BiCycling } from "react-icons/bi"

// These are the menu items below, I put them in a separate file together with a component for buttons because they are
// client - side components, i.e. they have interactivity and therefore require javascript in the browser. Also it
// generally makes my code on the main page cleaner.

export const menus = [
  {
    id: 0,
    img: { src: "/greek_salad.jpg", alt: "Greek Salad dish" },
    title: "Greek Salad",
    price: 32.12,
    description:
      "The famous Greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    action: "Order a delivery",
  },
  {
    id: 1,
    img: { src: "/bruchetta.svg", alt: "Bruchetta dish" },
    title: "Bruchetta",
    price: 12.99,
    description:
      "Our Bruchetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    action: "Order a delivery",
  },
  {
    id: 2,
    img: { src: "/lemon dessert.jpg", alt: "Lemon Dessert dish" },
    title: "Lemon Dessert",
    price: 8.99,
    description:
      "This comes straight from grandma's recipe book, every last ingredient has been secured and is authentic as can be imagined.",
    action: "Order a delivery",
  },
]

export default function MenuItems() {
  return (
    <>
      {menus.map((menu) => (
        <article
          className="max-h-[65vh] shadow-lg bg-ash rounded-lg"
          key={menu.id}
        >
          <Image
            src={menu.img.src}
            width={250}
            height={200}
            alt={menu.img.alt}
            className="w-full h-2/5 object-cover rounded-t-lg"
          />
          <div className="p-5 space-y-4">
            <span className="flex justify-between">
              <h4>{menu.title}</h4>
              <p role="price-tag" className="price-tag">
                ${menu.price}
              </p>
            </span>
            <p className="text-green text-[1.1rem]">{menu.description}</p>
            <Link
              href={`/order-online/${menu.id}/${menu.title
                .toLowerCase()
                .replace(" ", "-")}`}
              className="flex items-center gap-1 content-center font-bold text-[1.1rem] underline hover:text-[#2f7010]"
            >
              {menu.action}
              <BiCycling className="text-[22px] font-bold" />
            </Link>
          </div>
        </article>
      ))}
    </>
  )
}

//this is a generic button component for any button or link. It should be used because it is currently on a client-side
//component file
export const Button = ({ text, url, styles, onClick }) => {
  return (
    <button className={styles} onClick={onClick}>
      <Link href={url}>{text}</Link>
    </button>
  )
}
