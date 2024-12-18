"use client"
import { MdTableBar } from "react-icons/md"
import { useState, useEffect } from "react"
import { LoggedinUserParams } from "../login/LoginChecker"
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik"
import * as Yup from "yup"
import useRedirectToLogin from "@/hooks/useRedirectToLogin"
import { FormSubmitBtn } from "@/components/LoginOrCreateAccountTemplate"
import { toast } from "react-toastify"
import { db } from "../firebase"
import { doc, getDocs, collection, addDoc, deleteDoc } from "firebase/firestore"
import { fetchAPI, submitAPI } from "@/public/api"
import { useRouter } from "next/navigation"

export default function Reservation() {
  const { currentUser } = LoggedinUserParams()
  const [dateInput, setDateInput] = useState(null)
  const [reservations, setReservations] = useState([])
  const [availableTimes, setAvailableTimes] = useState([])
  const redirect = useRedirectToLogin("Please login to make a reservation")
  const router = useRouter()
  const currentTime = new Date() //this will get the current date and time whenever the page loads
  const currentHour = currentTime.getHours() //this extracts the time from the value gotten above
  let minimumDate //this will be used below, in the business logic to limit booking to 4pm everyday

  //this passes the value of the date field to the fetchAPI function given by meta's course
  useEffect(() => {
    if (dateInput !== null) {
      const initializeTimes = fetchAPI(new Date(dateInput))
      setAvailableTimes(initializeTimes)
    } else setAvailableTimes([])
  }, [dateInput])

  //this should get any reservations available for a user on page load, if there's a logged in user. The function reruns whenever the current user changes.
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
      router.push("/confirmed-booking")
      setTimeout(() => {
        router.push("/reservation#your-reservations")
      }, 4000)
      setReservations((prev) => [...prev, { ...values }])
    } else if (submitAPI(values)) {
      setSubmitting(false)
      router.push("/confirmed-booking")
      setTimeout(() => {
        router.push("/reservation#your-reservations")
      }, 4000)
      setTimeout(() => {
        toast.error(
          "Sorry, your reservation could not be saved because you did not login or create an account."
        )
      }, 5500)
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

  const formatDateInput = (dateString) => {
    const [day, month, year] = dateString.split("/")
    return `${year}-${month}-${day}` // Converts to YYYY-MM-DD
  }
  //this is the logic that controls the business rule that needs to stop any booking after 4pm daily. The variables used here are declared at the topmost of this component.
  if (currentHour >= 16) {
    // After 4 p.m., set the minimum date to tomorrow
    minimumDate = new Date()
    minimumDate.setDate(minimumDate.getDate() + 1) // Add 1 day
    minimumDate.setHours(0, 0, 0, 0) // Reset time to midnight
  } else {
    // Before 4 p.m., today is the minimum date
    minimumDate = new Date()
    minimumDate.setHours(0, 0, 0, 0) // Reset time to midnight
  }

  return (
    <div className="wrapper mt-4">
      <header className="mb-8">
        <h1 className="border-b-2 border-yellow/45 text-green">
          Make a Table Reservation
        </h1>
      </header>
      <main className="md:grid grid-cols-12 gap-12 mt-8">
        <Formik
          initialValues={{
            date: "",
            time: "",
            guests: 2,
            occasion: "",
          }}
          onSubmit={({ ...values }, { setSubmitting }) => {
            createReservation(values, setSubmitting)
          }}
          validationSchema={Yup.object({
            date: Yup.date()
              .transform(function (value, originalValue) {
                if (this.isType(value)) return value
                const parsedDate = formatDateInput(originalValue)
                return new Date(parsedDate)
              })
              .min(
                minimumDate,
                currentHour >= 16
                  ? "The day's booking closes after 4 p.m. Please select a future date."
                  : "Selected date cannot be in the past"
              )
              .required("Please enter a date for your reservation"),
            time: Yup.string()
              .required("Select an available time")
              .oneOf(availableTimes, "Invalid selection"),
            guests: Yup.number()
              .integer("Invalid number of guests")
              .min(1, "There must be at least one person")
              .max(10, "Sorry, you can't have more than 10 guests.")
              .required("Indicate the number of persons expected"),
            occasion: Yup.string()
              .oneOf(["Birthday", "Anniversary", "Casual"], "Invalid selection")
              .required("You haven't picked the occasion"),
          })}
        >
          {({ isSubmitting, values, errors, setFieldTouched }) => (
            <Form className="md:col-span-7 space-y-5">
              <div className="field">
                <label
                  htmlFor="date"
                  aria-label="On Click"
                  className="text-green font-semibold text-sm"
                >
                  Date
                </label>
                <Field
                  name="date"
                  id="date"
                  type="date"
                  className="w-full rounded-lg p-3 my-2 border-2 border-ash font-sans outline-2 outline-pinkish"
                  onBlur={() => {
                    setFieldTouched("date", true)
                    if (!errors.date) setDateInput(values.date)
                    else setDateInput(null)
                  }}
                />
                <span className="formError">
                  <ErrorMessage name="date" />
                </span>
              </div>
              <div className="field">
                <label
                  htmlFor="time"
                  aria-label="On Click"
                  className="text-green font-semibold text-sm"
                >
                  Time
                </label>
                <Field
                  as="select"
                  name="time"
                  id="time"
                  className="w-full rounded-lg p-3 my-2 border-2 border-ash font-sans outline-2 outline-pinkish"
                >
                  <option>Select from these available times</option>
                  {availableTimes.length > 0 ? (
                    availableTimes.map((time) => (
                      <option value={time} key={time}>
                        {time}
                      </option>
                    ))
                  ) : (
                    <option value="no-date">You haven't picked a date</option>
                  )}
                </Field>
                <span className="formError">
                  <ErrorMessage name="time" />
                </span>
              </div>
              <div className="field">
                <label
                  htmlFor="guests"
                  aria-label="On Click"
                  className="text-green font-semibold text-sm"
                >
                  Number of guests
                </label>
                <Field
                  name="guests"
                  id="guests"
                  type="number"
                  min="1"
                  className="w-full rounded-lg p-3 my-2 border-2 border-ash font-sans outline-2 outline-pinkish"
                />
                <ErrorMessage name="guests" className="formError" />
              </div>

              <div className="field">
                <label
                  htmlFor="occasion"
                  aria-label="On Click"
                  className="text-green font-semibold text-sm"
                >
                  Occasion
                </label>
                <Field
                  as="select"
                  name="occasion"
                  id="occasion"
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
              <div className="!mt-10">
                <FormSubmitBtn
                  buttonText="Create reservation"
                  isSubmitting={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-14 md:mt-0 md:col-span-5">
          <h2 id="your-reservations" className="capitalize text-lg">
            Your Reservations
          </h2>
          {reservations.length == 0 ? (
            <p className="text-[#9cab99] flex gap-4 items-center mt-5">
              <span className="text-2xl text-green/40">
                <MdTableBar />
              </span>
              It's so empty here. Make a reservation.
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
