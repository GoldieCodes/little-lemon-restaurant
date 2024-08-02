import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function useRedirectToLogin(message) {
  const router = useRouter()

  return () => {
    toast.error(message)
    setTimeout(() => {
      router.push("/login")
    }, 500)
  }
}
