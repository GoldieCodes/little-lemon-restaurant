"use client"
import FormFramework from "@/components/FormFramework"

export default function Login() {
  return (
    <FormFramework
      heading="Welcome Back!"
      subheading="Please log in to continue enjoying exclusive member benefits and make
        reservations."
      buttonText="Log in"
      alternative=" Don't have an account?"
      redirectText="Create account."
      redirectLink="/create-account"
    />
  )
}
