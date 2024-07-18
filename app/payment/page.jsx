import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

const querySnapshot = await getDocs(collection(db, "users"))
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`)
})

export default function PaymentPage() {
  return <div className="wrapper h-[50vh]">Coming soon...</div>
}
