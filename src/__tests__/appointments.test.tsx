/* eslint-disable @typescript-eslint/no-unused-vars */
import InstantConsultation from "../components/InstantConsultationBooking/InstantConsultation";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent, within } from "../test-utils";
import MainRoot from "../layouts/MainRoot";
import doctors from "./doctors.json";
import { MemoryRouter, Routes, Route } from "react-router";
import * as router from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as auth from "../providers/auth";

const server = setupServer(
  http.get("https://api.npoint.io/9a5543d36f1460da2f63", () => {
    return HttpResponse.json(doctors);
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.restoreAllMocks();
});
afterAll(() => server.close());

describe("appointments", () => {
  it("should show search bar with selected speciality by search param", async () => {
    jest
      .spyOn(router, "useSearchParams")
      .mockImplementation(() => [
        { get: (s: string) => "dentist" } as URLSearchParams,
        jest.fn(),
      ]);
    render(
      <MemoryRouter initialEntries={["/instant-consultation"]}>
        <InstantConsultation />
      </MemoryRouter>
    );
    const searchBar = screen.getByTestId("search-bar");
    expect(await within(searchBar).findByText(/dentist/i)).toBeDefined();
  });

  it("should show search results when speciality selected", async () => {
    const spec = "dentist";
    jest
      .spyOn(router, "useSearchParams")
      .mockImplementation(() => [
        { get: (s: string) => spec } as URLSearchParams,
        jest.fn(),
      ]);
    render(
      <MemoryRouter initialEntries={["/instant-consultation"]}>
        <InstantConsultation />
      </MemoryRouter>
    );

    const searchResults = screen.getByTestId("search-results");

    expect((await within(searchResults).findAllByText(/dentist/i)).length).toBe(
      doctors.filter((item) => item.speciality.toLowerCase().includes(spec))
        .length
    );
  });

  it("should show notification after booking an appointment and remove notification after cancelling", async () => {
    const user = userEvent.setup();
    const spec = "dentist";
    jest
      .spyOn(router, "useSearchParams")
      .mockImplementation(() => [
        { get: (s: string) => spec } as URLSearchParams,
        jest.fn(),
      ]);
    jest.spyOn(auth, "useUser").mockImplementation(() => ({
      logout: jest.fn(),
      login: jest.fn(),
      user: {
        token: "token",
        email: "test@test.com",
      },
      isLoggedIn: true,
    }));

    render(
      <MemoryRouter initialEntries={["/instant-consultation"]}>
        <Routes>
          <Route element={<MainRoot />}>
            <Route
              path="/instant-consultation"
              element={<InstantConsultation />}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const docCardBook = await screen.findAllByRole("button", {
      name: /book appointment/i,
    });

    const selectedDoctorBtn = docCardBook[0];

    await user.click(selectedDoctorBtn);

    const nameInput = screen.getByPlaceholderText("Enter your name");
    const phoneInput = screen.getByPlaceholderText("Enter your phone");
    const dateInput = screen.getByLabelText("Date of Appointment");
    const timeSlot = screen.getByLabelText("Book Time Slot");

    const submitBtn = screen.getByRole("button", { name: /Book now/i });

    await user.type(nameInput, "karine");
    await user.type(phoneInput, "123456789");
    fireEvent.change(dateInput, { target: { value: "2024-01-03" } });
    await user.selectOptions(timeSlot, "9");

    await user.click(submitBtn);

    const userMenu = screen.getByTestId("userMenu");

    const popup = await screen.findByTestId("notificationsPopup");

    within(popup).getByText(/karine/i);
    within(popup).getByText(/2024-01-03/i);
    within(popup).getByText(/9:00 - 10:00/i);

    expect(userMenu.querySelector(".notifications-count")?.textContent).toBe(
      "1"
    );

    // cancelling appointment
    expect(selectedDoctorBtn).toHaveTextContent(/cancel appointment/i);

    await user.click(selectedDoctorBtn);

    const modal = screen.getByTestId("appointment-modal");

    within(modal).getByText(/karine/i);
    within(modal).getByText(/2024-01-03/i);
    within(modal).getByText(/123456789/i);
    within(modal).getByText(/9:00 - 10:00/i);

    const cancelBtn = within(modal).getByRole("button", {
      name: /cancel appointment/i,
    });
    await user.click(cancelBtn);

    expect(
      userMenu.querySelector(".notifications-count")
    ).not.toBeInTheDocument();
  });
});
