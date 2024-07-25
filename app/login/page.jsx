import LoginOrCreateAccountTemplate from "@/components/LoginOrCreateAccountTemplate"
import { signInWithEmailAndPassword } from "firebase/auth"
import { app, auth } from "@/app/firebase"

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

export function handleLogin(
  email,
  password,
  router,
  setErrors,
  setSuccess,
  setSubmitting
) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      setSuccess("Signed in...")
      setTimeout(() => router.push("/menu"), 500)
      setSubmitting(false)
      // ...
    })
    .catch((error) => {
      setErrors(error.message)
      setTimeout(() => setErrors(null), 8000)
      setSubmitting(false)
    })
}
