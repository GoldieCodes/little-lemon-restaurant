"use client"
import { CartContextParams } from "./CartContext"
import Link from "next/link"
import Image from "next/image"
import { BsCartDash } from "react-icons/bs"

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
          <button className="shadow-none rounded-lg px-6">
            <Link href="/menu">Continue shopping</Link>
          </button>
        ) : null}
      </header>
      <main className="mt-14 grid gap-10">
        {cartNumber == 0 ? (
          <div className="min-h-[50vh] grid place-self-center align-middle">
            <p className="text-xl text-[#9cab99] flex gap-6 items-center group">
              <span className="text-3xl text-green/40 group-hover:animate-bounce">
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
            <article className="w-2/3 mx-auto flex" key={menu.id}>
              <div className="relative w-1/2 h-[30vh]">
                <Image
                  src={menu.img.src}
                  alt={menu.img.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="bg-[white] w-1/2 shadow-md p-6 space-y-7 grid content-center">
                <span className="flex justify-between">
                  <h4>{menu.title}</h4>
                  <p role="price-tag" className="price-tag">
                    ${menu.numOfOrderPrice}
                  </p>
                </span>
                <div className="py-5 flex justify-between items-center">
                  <button
                    className="shadow-none bg-pinkish/50 hover:bg-pinkish rounded-lg"
                    onClick={() => removeFromCart(menu.id)}
                  >
                    Remove item
                  </button>
                  <p>
                    <span
                      onClick={() => decreaseOrderNum(menu.id)}
                      className="cursor-pointer bg-ash px-5 py-3 rounded-lg mr-4 ml-2 hover:bg-green/30"
                    >
                      -
                    </span>{" "}
                    <span className="font-bold">{menu.quantity} </span>
                    <span
                      onClick={() => increaseOrderNum(menu.id)}
                      className="cursor-pointer bg-ash px-5 py-3 rounded-lg ml-4 hover:bg-green/30"
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
