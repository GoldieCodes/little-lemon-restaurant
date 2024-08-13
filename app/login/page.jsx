"use client"
import LoginOrCreateAccountTemplate from "@/components/LoginOrCreateAccountTemplate"
import { signInWithEmailAndPassword } from "firebase/auth"
import { app, auth } from "@/app/firebase"
import { signOut } from "firebase/auth"
import useRedirectToLogin from "@/hooks/useRedirectToLogin"
import { toast } from "react-toastify"

export default function Login() {
  return (
    <LoginOrCreateAccountTemplate
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

export function handleLogin(email, password, router, setSubmitting) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      toast.success("Signed in")
      router.push("/menu")
      setSubmitting(false)
      // ...
    })
    .catch((error) => {
      toast.error(error.message)
      setSubmitting(false)
    })
}

//this function is used in the LogOut button on the Nav component
export function LogOutBtn({ hideLogOutBtn }) {
  const redirect = useRedirectToLogin("Login to access customer privileges")

  function SignOut() {
    signOut(auth)
      .then(() => {
        redirect()
      })
      .catch((error) => {
        console.log("an error occurred: " + error)
      })
  }

  return (
    <button
      className={`absolute top-12 z-50 py-[6px] bg-pinkish hover:bg-yellow ${
        hideLogOutBtn ? "invisible" : "visible"
      }`}
      onClick={() => SignOut()}
    >
      Log out
    </button>
  )
}
