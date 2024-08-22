import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Reservation from "@/app/reservation/page"

// mock useRouter functionality in the test. Without this the component "Reservation" will not render
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

// initialize the userEvent library for subsequent use
const user = userEvent.setup()

describe("Date Field Validation", () => {
  test("should throw an error if date input is empty and user tries to submit form", async () => {
    render(<Reservation />)
    // get the create reservation button and click it
    user.click(screen.getByText("Create reservation"))

    // Use await in conjuction with waitFor to ensure element is rendered after click
    await waitFor(() =>
      expect(
        screen.getByText("Please enter a date for your reservation")
      ).toBeInTheDocument()
    )
  })

  test("should throw error if user enters a past date", async () => {
    render(<Reservation />)
    //get the date input field
    const dateField = screen.getByLabelText("Date")

    // enter a past date
    user.type(dateField, "2024-07-09")

    // mimic user clicking out of the date field which prompts the error to show
    fireEvent.blur(dateField)

    await waitFor(() => {
      expect(
        screen.getByText("Selected date cannot be in the past")
      ).toBeInTheDocument()
    })
  })

  test("After 4pm, booking for the day should be rejected", async () => {
    render(<Reservation />)
    jest.useFakeTimers()
    // mimic user being in the present day, but the time is already past 4pm
    const today = new Date()
    jest.setSystemTime(
      new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0, 0)
    )

    // get the date input field
    const dateField = screen.getByLabelText("Date")
    // enter the present day date
    user.type(dateField, "2024-08-22")

    // mimic user clicking out of the date field which prompts the error to show
    fireEvent.blur(dateField)

    await waitFor(() => {
      expect(
        screen.getByText(
          "The day's booking closes after 4 p.m. Please select a future date."
        )
      ).toBeInTheDocument()
    })
  })
})

describe("Time Field Validation", () => {
  test("time field does not display time options when date input is unaccepted", () => {
    render(<Reservation />)

    const dateField = screen.getByLabelText("Date")
    // user types a date that fails validation
    user.type(dateField, "2024-08-03")
    fireEvent.blur(dateField)
    const timeField = screen.getByLabelText("Time")
    expect(timeField).toHaveTextContent("You haven't picked a date")
  })
})

test("Renders reservation page h1 title", () => {
  render(<Reservation />)

  const heading = screen.getByText("Make a Table Reservation")
  expect(heading).toBeInTheDocument()
})
