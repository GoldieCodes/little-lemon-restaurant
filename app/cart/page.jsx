"use client"
import { CartContextParams } from "./CartContext"
import Link from "next/link"
import Image from "next/image"
import { BsCartDash } from "react-icons/bs"
import { GoTrash } from "react-icons/go"

export default function Cart() {
  const {
    cartData,
    removeFromCart,
    cartNumber,
    increaseOrderNum,
    decreaseOrderNum,
  } = CartContextParams()

  return (
    <div className="wrapper">
      <header className="flex justify-between items-center border-b-2 border-yellow/45">
        <h1 className="text-2xl text-green">Your Cart</h1>
        {cartNumber > 0 ? (
          <button className="shadow-none rounded-lg px-6 mb-2">
            <Link href="/menu">Back to shop</Link>
          </button>
        ) : null}
      </header>
      <main className="mt-14 lg:w-2/3 mx-auto space-y-6">
        {cartNumber == 0 ? (
          <div className="min-h-[50vh] grid place-self-center align-middle">
            <p className="text-base lg:text-lg text-[#9cab99] flex gap-6 items-center group">
              <span className="text-2xl text-green/40 group-hover:animate-bounce">
                <BsCartDash />
              </span>
              Your cart is empty.{" "}
              <button className="text-base">
                <Link href="/menu">Start shopping</Link>
              </button>
            </p>
          </div>
        ) : (
          cartData.map((menu) => (
            <article className="flex" key={menu.id}>
              <div className="relative w-1/2">
                <Image
                  src={menu.img.src}
                  alt={menu.img.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="bg-[white] w-1/2 shadow-md p-4 space-y-3 grid content-center">
                <span className="md:flex justify-between">
                  <h4>{menu.title}</h4>
                  <p role="price-tag" className="price-tag">
                    ${menu.numOfOrderPrice}
                  </p>
                </span>
                <p className="line-clamp-2 text-sm">{menu.description}</p>
                <div className="flex justify-between items-center">
                  <span
                    className="cursor-pointer text-dark/70 hover:text-[green] text-md md:text-lg"
                    onClick={() => removeFromCart(menu.id)}
                  >
                    <GoTrash />
                  </span>
                  <p>
                    <span
                      onClick={() => decreaseOrderNum(menu.id)}
                      className="cursor-pointer bg-ash hover:bg-pinkish py-[0.2rem] px-[0.6rem] md:px-4 md:py-2 md:rounded-lg mr-4 ml-2"
                    >
                      -
                    </span>{" "}
                    <span className="font-bold">{menu.quantity} </span>
                    <span
                      onClick={() => increaseOrderNum(menu.id)}
                      className="cursor-pointer bg-ash hover:bg-pinkish py-[0.2rem] px-[0.6rem] md:px-4 md:py-2 md:rounded-lg ml-4"
                    >
                      +
                    </span>
                  </p>
                </div>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  )
}
