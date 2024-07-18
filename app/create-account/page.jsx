import FormFramework from "@/components/FormFramework"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default function CreateAccount() {
  return (
    <FormFramework
      heading="Join the Little Lemon Family"
      subheading="Create an account to enjoy personalized dining experiences, special
        offers, and easy reservations."
      buttonText="Create account"
      alternative=" Already have an account?"
      redirectText="Log in."
      redirectLink="/login"
    />
  )
}

export function handleCreateUser(
  auth,
  name,
  email,
  password,
  router,
  setSuccess,
  setErrors
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      setSuccess("Account created")
      setTimeout(() => {
        router.push("/menu")
      }, 500)
      // ...
    })
    .catch((error) => {
      setErrors(error.message)
    })
}
