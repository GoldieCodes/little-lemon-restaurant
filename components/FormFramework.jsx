"use client"
import { ImWarning, ImUserCheck } from "react-icons/im"
import Link from "next/link"
import { Formik, Form, useField } from "formik"
import * as Yup from "yup"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { handleCreateUser } from "@/app/create-account/page"
import { handleLogin } from "@/app/login/page"
import { useRouter } from "next/navigation"

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
        className="w-full rounded-lg p-3 my-2 border-2 border-ash font-sans"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="formError">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default function FormFramework({
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
    <div className="w-[60%] mx-auto my-28 bg-[white]/70 rounded-md p-12 backdrop-blur-[7px]">
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
            .required("Please choose a username to proceed")
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
        onSubmit={({ name, email, password }) => {
          setSuccess("loading...")
          path === "/create-account"
            ? handleCreateUser(
                name,
                email,
                password,
                router,
                setErrors,
                setSuccess
              )
            : path === "/login"
            ? handleLogin(email, password, router, setErrors, setSuccess)
            : null
        }}
      >
        <Form>
          {path === "/create-account" ? (
            <InputField
              name="name"
              type="text"
              placeholder="Your firstname or nickname"
            />
          ) : null}
          <InputField name="email" type="text" placeholder="Email address" />
          <InputField
            name="password"
            type="password"
            placeholder="Enter your password"
          />

          <button
            className="w-full block mx-auto mt-2 mb-5 text-base bg-yellow/65 hover:bg-yellow active:translate-y-1"
            type="submit"
          >
            {buttonText}
          </button>
        </Form>
      </Formik>
      <p className="text-sm">
        {alternative + " "}
        <Link
          href={redirectLink}
          className="text-[#f5621e] font-bold underline hover:no-underline"
        >
          {redirectText}
        </Link>
      </p>

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
  )
}
