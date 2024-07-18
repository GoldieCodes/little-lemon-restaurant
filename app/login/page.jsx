import FormFramework from "@/components/FormFramework"
import { signInWithEmailAndPassword } from "firebase/auth"
import { app, auth } from "@/app/firebase"

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

export function handleLogin(email, password, router, setErrors, setSuccess) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      setSuccess("Signing you in...")
      router.push("/menu")
      // ...
    })
    .catch((error) => {
      setErrors(error.message)
    })
}
