import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Reservation from "@/app/reservation/page"
import mockRouter from "next-router-mock"

jest.mock("next/navigation", () => require("next-router-mock"))

test("Renders reservation page h1 title", () => {
  mockRouter.setCurrentUrl("/reservation")

  render(<Reservation />)

  const heading = screen.getByText("Make a Table Reservation")
  expect(heading).toBeInTheDocument()
})
