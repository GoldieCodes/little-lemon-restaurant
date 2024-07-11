"use client"
import { menus } from "@/components/MenuItems"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { IoMdArrowRoundBack } from "react-icons/io"
import { Formik, Form } from "formik"
import { InputField } from "@/components/FormFramework"
import * as Yup from "yup"

export default function ({ params }) {
  const [orderNum, setOrderNum] = useState(1)

  return (
    <div className="wrapper space-y-2 grid grid-cols-12">
      <article className="col-span-6">
        <h3 className="my-3">Your Order</h3>

        {menus.map((menu) =>
          params.slug[0] == menu.id ? (
            <>
              <div className="relative h-[50vh]">
                <Image
                  src={menu.img.src}
                  alt={menu.img.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="py-5 space-y-4">
                <span className="flex justify-between">
                  <h4>{menu.title}</h4>
                  <p role="price-tag" className="price-tag">
                    ${menu.price}
                  </p>
                </span>
                <span className="flex justify-between">
                  <p>
                    Quantity:{" "}
                    <span
                      onClick={() =>
                        orderNum === 0 ? null : setOrderNum((prev) => prev - 1)
                      }
                      className="cursor-pointer bg-ash py-[1px] px-2 rounded-lg"
                    >
                      -
                    </span>{" "}
                    {orderNum}{" "}
                    <span
                      onClick={() => setOrderNum((prev) => prev + 1)}
                      className="cursor-pointer bg-ash py-[1px] px-2 rounded-lg"
                    >
                      +
                    </span>{" "}
                  </p>
                  <p role="price-tag" className="font-bold">
                    Price: ${(menu.price * orderNum).toFixed(2)}
                  </p>
                </span>
              </div>

              <h4 className="text-dark mb-3 mt-6">DISH DETAILS</h4>
              <p>{menu.description}</p>
            </>
          ) : null
        )}
      </article>

      <main className="grid col-start-8 col-end-13 self-baseline">
        <h4 className="mb-5 mt-10">Delivery Details</h4>

        <Formik
          initialValues={{
            name: "",
            phone_number: "",
            email: "",
            address: "",
          }}
          onSubmit={() => {}}
          validationSchema={Yup.object({
            products: Yup.string()
              .required("You need to select a dish to proceed")
              .notOneOf(["select"], "You haven't selected a dish"),
            name: Yup.string().required("Enter your name"),
            phone_number: Yup.string()
              .required("Please enter a phone number")
              .matches(
                /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s.-]{3,4}[\d\s.-]{4}$/,
                "Phone number is not valid"
              ),
            email: Yup.string()
              .email("Please enter a valid email address")
              .required("This field is required"),
            address: Yup.string().required("Please enter a delivery address"),
          })}
        >
          <Form className="grid gap-5">
            <InputField
              name="name"
              type="text"
              label="Name"
              placeholder="Jane Doe"
            />
            <InputField
              name="phone_number"
              type="tel"
              label="Phone Number"
              placeholder="+00-1234-597-87"
            />
            <InputField
              name="email"
              type="email"
              label="Email Address"
              placeholder="janedoe@gmail.com"
            />
            <InputField
              name="address"
              type="text"
              label="Home address"
              placeholder="House number, street, city and state."
            />
            <button
              className="block w-full mt-5 text-base bg-yellow/65 hover:bg-yellow active:translate-y-1"
              type="submit"
            >
              <Link href="/payment">Go to Payment</Link>
            </button>
          </Form>
        </Formik>
        <div className="mt-4">
          <p className="flex items-center gap-2 text-sm mt-5">
            Want to change your order?{" "}
            <span className="bg-brownish text-lg p-1 font-extrabold text-[white] rounded-full shadow-lg">
              <IoMdArrowRoundBack />
            </span>
            <Link
              href="/menu"
              className="text-brownish font-bold underline hover:no-underline"
            >
              Menu
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
