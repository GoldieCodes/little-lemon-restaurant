"use client"
import Link from "next/link"
import { useState } from "react"
import * as Yup from "yup"
import { Formik, Form, useField } from "formik"
import { usePathname, useRouter } from "next/navigation"
import { ImWarning, ImUserCheck } from "react-icons/im"
import { handleCreateUser } from "@/app/create-account/page"
import { handleLogin } from "@/app/login/page"

export const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="text-green font-semibold text-xs"
      >
        {label}
      </label>
      <input
        className="w-full rounded-lg p-3 my-2 border-2 border-ash font-sans outline-2 outline-pinkish"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="formError">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default function LoginOrCreateAccountTemplate({
  heading,
  subheading,
  buttonText,
  alternative,
  redirectText,
  redirectLink,
}) {
  const path = usePathname()
  const [hasErrors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  const router = useRouter()

  return (
    <main className="min-h-[70vh] flex items-center wrapper">
      <div className="lg:w-2/3 md:mt-8 mx-auto bg-[white]/70 rounded-md p-6 md:p-12 backdrop-blur-[7px]">
        <h1 className="mb-4 font-bold text-2xl text-dark text-center leading-10">
          {heading}
        </h1>
        <p className="text-center text-green mb-2">{subheading}</p>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(12, "Username can't be more than 12 characters")
              .matches(
                /^[A-Za-z0-9]+$/,
                "Username can only have alphabets and numbers, no spaces allowed"
              ),
            email: Yup.string()
              .email("Please enter a valid email address")
              .required("This field is required"),
            password: Yup.string()
              .required("Please enter a password")
              .min(6, "Password should be at least 6 characters"),
          })}
          onSubmit={({ name, email, password }, { setSubmitting }) => {
            setSubmitting(true)
            path === "/create-account"
              ? handleCreateUser(
                  name,
                  email,
                  password,
                  router,
                  setErrors,
                  setSuccess,
                  setSubmitting
                )
              : path === "/login"
              ? handleLogin(
                  email,
                  password,
                  router,
                  setErrors,
                  setSuccess,
                  setSubmitting
                )
              : null
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {path === "/create-account" ? (
                <InputField
                  name="name"
                  type="text"
                  placeholder="Your firstname or nickname"
                />
              ) : null}
              <InputField
                name="email"
                type="text"
                placeholder="Email address"
              />
              <InputField
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <FormSubmitBtn
                buttonText={buttonText}
                isSubmitting={isSubmitting}
              />
            </Form>
          )}
        </Formik>
        {/* This is the text beneath the form fields that will say extra stuff like "Don't have an account?" or "Forgot password?" */}
        <p className="text-sm">
          {alternative + " "}
          <Link
            href={redirectLink}
            className="text-[#f5621e] font-bold underline hover:no-underline"
          >
            {redirectText}
          </Link>
        </p>
        {/* This is responsible for the box that shows up when the form has a submission error from Firebase or indicates success to the user */}
        {hasErrors !== null ? (
          <p
            role="error message"
            className="w-4/6 flex gap-2 items-center absolute top-[-20%] bg-pinkish text-[red] font-bold text-sm p-2 pl-4 rounded-md my-5"
          >
            <ImWarning />
            {hasErrors}
          </p>
        ) : success !== null ? (
          <div className="w-4/6 flex gap-2 items-center absolute top-[-20%] bg-pinkish text-[black] font-bold text-sm p-2 pl-4 rounded-md my-5">
            <ImUserCheck />
            {success}
          </div>
        ) : null}
      </div>
    </main>
  )
}

//I extracted this form submit button so that I can use it in any form component. It has a loading spinner
export const FormSubmitBtn = ({ buttonText, isSubmitting }) => {
  return (
    <button
      className="w-full mt-2 mb-4 block disabled:cursor-not-allowed disabled:hover:bg-yellow/50"
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="inline-block h-6 w-6 border-4 rounded-full border-[green] border-t-[transparent] animate-spin">
          {/* This span is the spinner. It doesn't need any content. The CSS styling on it creates the spinner */}
        </span>
      ) : (
        buttonText
      )}
    </button>
  )
}
