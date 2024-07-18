import { Markazi_Text, Karla } from "next/font/google"
import "./globals.css"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import Background from "@/components/Background"
import LoginChecker from "./login/LoginChecker"

const markazi = Markazi_Text({
  subsets: ["latin"],
  variable: "--font-markazi",
})
const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
})

export const metadata = {
  title: "Little Lemon Restaurant",
  description:
    "A family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist",
  openGraph: {
    title: "Little Lemon Restaurant",
    description: "Discover traditional recipes, served with a modern twist",
    image: "/logo.svg",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${karla.variable} ${markazi.variable}`}>
      <body>
        <Background>
          {/* <LoginChecker> */}
          <Nav />
          {children}
          <Footer />
          {/* </LoginChecker> */}
        </Background>
      </body>
    </html>
  )
}
