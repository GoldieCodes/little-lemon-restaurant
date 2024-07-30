"use client"
import Image from "next/image"
import Link from "next/link"
import { BiCycling } from "react-icons/bi"
import { BsFillCartPlusFill } from "react-icons/bs"
import { MdAdd } from "react-icons/md"
import { CartContextParams } from "@/app/cart/CartContext"

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

//the MenuItems is a component I designed to render the menu items from their array, but I am using props
//to pass in the particular menu array that will be used, so that it can be reusable for different arrays
export default function MenuItems({ menus }) {
  //You cannot initialize values from useContext inside a function that is attached to an event handler (i.e. the onClick). It's against the rules of hooks
  //So I created the onClick handler function in the Context file and then passed it as a context value, which I'm using below
  const { addToCart } = CartContextParams()

  return (
    <>
      {menus.map((menu) => (
        <article
          className="max-h-[67vh] shadow-lg bg-ash rounded-lg"
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
            <div className="flex justify-between items-center">
              <Link
                href={`/order-online/${menu.id}/${menu.title
                  .toLowerCase()
                  .replace(" ", "-")}`}
                className="group flex items-center gap-1 content-center font-bold text-[1.1rem] underline hover:text-[#2f7010]"
              >
                {menu.action}
                <BiCycling className="text-[22px] font-bold group-hover:translate-x-2 duration-500 transition-all" />
              </Link>
              <button
                className="flex gap-2 items-center rounded-lg shadow-none bg-opacity-55 group hover:bg-opacity-100"
                onClick={() => addToCart(menu)}
              >
                {" "}
                <MdAdd /> Cart
                <BsFillCartPlusFill className="group-hover:animate-bounce" />
              </button>
            </div>
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
