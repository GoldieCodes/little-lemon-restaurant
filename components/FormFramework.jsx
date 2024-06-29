"use client"
import Link from "next/link"
import { Formik, Form, useField } from "formik"
import * as Yup from "yup"

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="w-full rounded-lg p-3 my-3" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
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
  return (
    <div className="w-[60%] mx-auto my-28 bg-[white]/70 rounded-md p-12 backdrop-blur-md">
      <h1 className="mb-4 font-bold text-2xl text-dark text-center leading-10">
        {heading}
      </h1>
      <p className="text-center text-green">{subheading}</p>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Required"),
          password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        <Form>
          <InputField
            name="username"
            type="text"
            placeholder="Username or email"
          />
          <InputField
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <button className="w-full block mx-auto my-4 text-lg" type="submit">
            {buttonText}
          </button>
        </Form>
      </Formik>
      <p>
        {alternative + " "}
        <Link
          href={redirectLink}
          className="text-[#f5621e] font-bold hover:underline"
        >
          {redirectText}
        </Link>
      </p>
    </div>
  )
}
