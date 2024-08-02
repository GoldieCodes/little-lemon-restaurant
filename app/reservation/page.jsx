"use client"
import { MdTableBar } from "react-icons/md"
import { useState, useEffect } from "react"
import { LoggedinUserParams } from "../login/LoginChecker"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import useRedirectToLogin from "@/hooks/useRedirectToLogin"
import { FormSubmitBtn } from "@/components/LoginOrCreateAccountTemplate"
import { toast } from "react-toastify"
import { db } from "../firebase"
import { doc, getDocs, collection, addDoc, deleteDoc } from "firebase/firestore"

export default function Reservation() {
  const { currentUser } = LoggedinUserParams()
  const [reservations, setReservations] = useState([])
  const redirect = useRedirectToLogin("Please login to make a reservation")

  useEffect(() => {
    getReservationsFromDB()
  }, [currentUser])

  async function getReservationsFromDB() {
    if (currentUser) {
      const docSnap = await getDocs(
        collection(db, "users", currentUser, "reservations")
      )
      const reservation = docSnap.docs.map((doc) => {
        const docID = doc.id
        const docData = doc.data()
        return { id: docID, ...docData }
      })
      setReservations(reservation)
    } else {
      setReservations([])
      if (!currentUser && !sessionStorage.getItem("reservationToastShown")) {
        toast.warn("You must be logged in to make or see reservations.")
        sessionStorage.setItem("reservationToastShown", "true")
      }
    }
  }

  async function createReservation(values, setSubmitting) {
    if (currentUser) {
      await addDoc(collection(db, "users", currentUser, "reservations"), {
        ...values,
      })
      setSubmitting(false)
      toast.success(
        "Your reservation has been saved! Thank you for choosing Little Lemon."
      )
      setReservations((prev) => [...prev, { ...values }])
    } else {
      redirect()
    }
  }

  async function deleteReservation(id) {
    reservations.map(async (each) => {
      if (each.id == id) {
        await deleteDoc(doc(db, "users", currentUser, "reservations", id))
      }
      setReservations((prev) => prev.filter((items) => items.id !== id))
    })
  }

  return (
    <div className="wrapper">
      <header className="mb-8">
        <h1 className="border-b-2 border-yellow/45 text-2xl text-green">
          Make a Table Reservation
        </h1>
      </header>

      <main className="grid grid-cols-12 gap-12 mt-8">
        <Formik
          initialValues={{
            date: "",
            time: "17:00",
            guests: 2,
            occasion: "",
          }}
          onSubmit={({ ...values }, { setSubmitting }) =>
            createReservation(values, setSubmitting)
          }
          validationSchema={Yup.object({
            date: Yup.date()
              .min(
                new Date().toLocaleDateString(),
                "Date cannot be in the past"
              )
              .required("Please enter a date for your reservation"),
            time: Yup.string().oneOf(
              ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
              "Invalid selection"
            ),
            guests: Yup.number()
              .integer("Invalid number of guests")
              .min(1, "There must be at least one person")
              .max(10, "Sorry, you can't have more than 10 guests.")
              .required("Indicate the number of persons expected"),
            occasion: Yup.string()
              .oneOf(
                ["Birthday", "Anniversary", "Casual"],
                "You haven't picked the occasion"
              )
              .required("Tell us the occasion"),
          })}
        >
          {({ isSubmitting }) => (
            <Form className="col-span-7 space-y-5">
              <div className="field">
                <label
                  htmlFor="date"
                  className="text-green font-semibold text-sm"
                >
                  Date
                </label>
                <Field
                  name="date"
                  type="date"
                  className="w-full rounded-lg p-3 my-2 border-2 border-ash font-sans outline-2 outline-pinkish"
                />
                <span className="formError">
                  <ErrorMessage name="date" />
                </span>
              </div>
              <div className="field">
                <label
                  htmlFor="time"
                  className="text-green font-semibold text-sm"
                >
                  Time
                </label>
                <Field
                  as="select"
                  name="time"
                  className="w-full rounded-lg p-3 my-2 border-2 border-ash font-sans outline-2 outline-pinkish"
                >
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                </Field>
                <span className="formError">
                  <ErrorMessage name="time" />
                </span>
              </div>
              <div className="field">
                <label
                  htmlFor="guests"
                  className="text-green font-semibold text-sm"
                >
                  Number of guests
                </label>
                <Field
                  name="guests"
                  type="number"
                  min="1"
                  className="w-full rounded-lg p-3 my-2 border-2 border-ash font-sans outline-2 outline-pinkish"
                />
                <ErrorMessage name="guests" className="formError" />
              </div>

              <div className="field">
                <label
                  htmlFor="time"
                  className="text-green font-semibold text-sm"
                >
                  Occasion
                </label>
                <Field
                  as="select"
                  name="occasion"
                  className="w-full rounded-lg p-3 my-2 border-2 border-ash font-sans outline-2 outline-pinkish"
                >
                  <option>What's the occasion?</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Casual">Casual</option>
                </Field>
                <p role="error message" className="formError">
                  <ErrorMessage name="occasion" />
                </p>
              </div>
              <FormSubmitBtn
                buttonText="Create reservation"
                isSubmitting={isSubmitting}
              />
            </Form>
          )}
        </Formik>

        <div className="col-span-5">
          <h4>Your Reservations</h4>
          {reservations.length == 0 ? (
            <p className="text-[#9cab99] flex gap-4 items-center place-self-center mt-5">
              <span className="text-2xl text-green/40">
                <MdTableBar />
              </span>
              No reservations to see
            </p>
          ) : (
            reservations.map((each) => (
              <article
                key={each.id}
                className="bg-[white] shadow-md py-5 px-6 space-y-5 mt-5 grid content-center rounded-xl"
              >
                <div className="grid grid-cols-2 gap-3">
                  <p>
                    <b>Occasion:</b> {each.occasion}
                  </p>
                  <p>
                    <b>Guests:</b> {each.guests}
                  </p>
                  <p>
                    <b>Date:</b> {each.date}
                  </p>
                  <p>
                    <b>Time:</b> {each.time}
                  </p>
                </div>
                <button
                  className="shadow-none bg-green/10 hover:bg-pinkish rounded-lg text-sm"
                  onClick={() => deleteReservation(each.id)}
                >
                  Cancel Reservation
                </button>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
