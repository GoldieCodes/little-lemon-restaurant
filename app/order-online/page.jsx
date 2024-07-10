"use client"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { InputField } from "@/components/FormFramework"
import * as Yup from "yup"
import { useState } from "react"
import { menus } from "@/components/MenuItems"
import { BiDish } from "react-icons/bi"
import Image from "next/image"

export default function OrderOnline() {
  const [selectedDish, setDish] = useState("select")

  return (
    <div className="wrapper space-y-4 grid content-center">
      <h1 className="border-b-2 border-yellow/45 text-2xl text-green">
        What would you like to order?
      </h1>
      <Formik
        initialValues={{
          products: "",
          name: "",
          phone_number: "",
          email: "",
          address: "",
        }}
        onSubmit={() => {}}
        validationSchema={Yup.object({
          products: Yup.string(),
          name: Yup.string().required("You haven't written your name"),
          phone_number: Yup.number()
            .required("Please enter a phone number")
            .min(10, "Enter a valid phone number"),
          email: Yup.string()
            .email("Please enter a valid email address")
            .required("This field is required"),
          address: Yup.string().required("Please enter a delivery address"),
        })}
      >
        <Form>
          <article className="flex justify-between items-center my-14">
            <Field
              id="products"
              name="products"
              as="select"
              onClick={(event) => {
                setDish(event.target.value)
              }}
              className="w-1/2 rounded-full p-6 my-4 shadow-md border-2
               border-[green] bg-pinkish/15"
            >
              <option value="select">Select a menu item</option>
              {menus.map((menu) => (
                <option value={menu.id} key={menu.id}>
                  {menu.title}
                </option>
              ))}
            </Field>

            {selectedDish !== "select" ? (
              <div className="min-h-[40vh] w-2/5 shadow-lg rounded-xl">
                <div className="relative w-[89%] h-[230px] m-auto">
                  <Image
                    src={menus[Number(selectedDish)].img.src}
                    alt={menus[Number(selectedDish)].img.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="px-6 py-4 space-y-4">
                  <span className="flex justify-between">
                    <h4>{menus[Number(selectedDish)].title}</h4>
                    <p role="price-tag" className="price-tag">
                      {menus[Number(selectedDish)].price}
                    </p>
                  </span>
                </div>
              </div>
            ) : (
              <div className="min-h-[40vh] w-2/5 shadow-lg rounded-xl grid place-content-center">
                <p className="flex items-center gap-2 text-md font-bold text-dark/50">
                  <span className="text-3xl">
                    <BiDish />
                  </span>
                  You haven't selected any dish
                </p>
              </div>
            )}
          </article>

          <h2 className="mb-5 mt-10 text-green">Delivery Details</h2>
          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            <InputField
              name="name"
              type="text"
              label="Name"
              placeholder="Jane Doe"
            />
            <InputField
              name="phone_number"
              type="number"
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
          </div>
          <button
            className="w-[20%] block mx-auto mt-11 text-base bg-yellow/65 hover:bg-yellow active:translate-y-1"
            type="submit"
            href="/payment"
          >
            Go to Payment
          </button>
        </Form>
      </Formik>
    </div>
  )
}
