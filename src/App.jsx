import "./App.css"
import Nav from "./components/Nav.jsx"
import Footer from "./components/Footer.jsx"
import Header from "./components/Header.jsx"
import Specials from "./components/Specials.jsx"
import Reviews from "./components/Reviews.jsx"
import AboutSection from "./components/AboutSection.jsx"

function App() {
  return (
    <>
      <Nav />
      <Header />
      <Specials />
      <Reviews />
      <AboutSection />
      <Footer />
    </>
  )
}

export default App
