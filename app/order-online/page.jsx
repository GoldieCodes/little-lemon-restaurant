"use client"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { InputField } from "@/components/LoginOrCreateAccountTemplate"
import * as Yup from "yup"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { menus } from "@/components/MenuItems"
import { BiDish } from "react-icons/bi"
import Image from "next/image"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { LoggedinUserParams } from "../login/LoginChecker"
import { OrderQuantity } from "@/components/OrderQuantity"

export default function OrderOnline() {
  const [selectedDish, setDish] = useState("select")
  const [orderNum, setOrderNum] = useState(1)
  const { currentUser } = LoggedinUserParams()
  const router = useRouter()

  return (
    <div className="wrapper space-y-4">
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
        onSubmit={(values) => {
          addOrderToDb(currentUser, orderNum, values)
          router.push("/payment")
        }}
        validationSchema={Yup.object({
          products: Yup.string()
            .required("You need to select a dish to place an order")
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
        <Form className="grid grid-cols-12">
          <article className="col-span-6 space-y-16 my-12">
            <div>
              <Field
                id="products"
                name="products"
                as="select"
                onClick={(event) => {
                  setDish(event.target.value)
                }}
                className="w-full rounded-full p-6 my-4 shadow-md border-2
                 border-[green] bg-[white]/15 outline-1 outline-brownish"
              >
                <option value="select">Select a menu item</option>
                {menus.map((menu) => (
                  <option value={menu.id} key={menu.id}>
                    {menu.title}
                  </option>
                ))}
              </Field>
              <p role="error message" className="formError">
                <ErrorMessage name="products" />
              </p>
            </div>

            {selectedDish !== "select" ? (
              <div className="min-h-[40vh] shadow-lg rounded-xl">
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
                      ${menus[Number(selectedDish)].price}
                    </p>
                  </span>
                  <span className="flex justify-between">
                    <OrderQuantity
                      orderNum={orderNum}
                      setOrderNum={setOrderNum}
                      text={"Quantity:"}
                    />
                    <p role="price-tag" className="font-bold">
                      Total: $
                      {(menus[Number(selectedDish)].price * orderNum).toFixed(
                        2
                      )}
                    </p>
                  </span>
                </div>
              </div>
            ) : (
              <div className="min-h-[40vh] shadow-lg rounded-xl grid place-content-center">
                <p className="flex items-center gap-2 text-md font-bold text-dark/50">
                  <span className="text-3xl">
                    <BiDish />
                  </span>
                  No dish selected
                </p>
              </div>
            )}
          </article>

          <div className="col-start-8 col-end-13 space-y-5">
            <h4 className="mb-5 mt-10">Delivery Details</h4>
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
              className="w-full mx-auto text-base bg-yellow/65 hover:bg-yellow active:translate-y-1 transition-all"
              type="submit"
            >
              Go to Payment
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export const addOrderToDb = async (currentUser, orderNum, values) => {
  try {
    await setDoc(doc(db, "orders", currentUser), {
      orderNum,
      ...values,
    })
  } catch (error) {
    console.log(error)
  }
}
