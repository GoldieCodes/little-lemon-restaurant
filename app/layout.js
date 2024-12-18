import { Markazi_Text, Karla } from "next/font/google"
import "./globals.css"
import Background from "@/components/Background"
import LoginChecker from "./login/LoginChecker"
import CartContext from "./cart/CartContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { LayoutWrapper } from "@/components/Background"

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
      <body className="overflow-x-hidden">
        <link rel="icon" href="/croppedlogo.png" sizes="any" />
        <LoginChecker>
          <CartContext>
            <Background>
              <LayoutWrapper>
                <ToastContainer
                  position="top-center"
                  autoClose={4000}
                  newestOnTop={true}
                  theme="light"
                />
                {children}
              </LayoutWrapper>
            </Background>
          </CartContext>
        </LoginChecker>
      </body>
    </html>
  )
}
