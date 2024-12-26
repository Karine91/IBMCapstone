import React from "react";
import InstantConsultation from "../components/InstantConsultationBooking/InstantConsultation";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor, within } from "../test-utils";
import MainRoot from "../layouts/MainRoot";
import doctors from "./doctors.json";
import { MemoryRouter, Routes, Route } from "react-router";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  http.get("https://api.npoint.io/9a5543d36f1460da2f63", () => {
    return HttpResponse.json(doctors);
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

// const mocks = vi.hoisted(() => {
//   return {
//     get: vi.fn(),
//     getUser: vi.fn(),
//   };
// });

// jest.mock("react-router-dom", async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...actual,
//     useSearchParams: () => {
//       return [
//         {
//           get: mocks.get,
//         },
//         vi.fn(),
//       ];
//     },
//   };
// });

// vi.mock("../providers/auth", async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...actual,
//     useUser: mocks.getUser,
//   };
// });

describe("appointments", () => {
  it("should show search bar with selected speciality by search param", async () => {
    //vi.mocked(mocks.get).mockReturnValue("dentist");
    // render(<InstantConsultation />);
    // const searchBar = screen.getByTestId("search-bar");
    // expect(await within(searchBar).findByText(/dentist/i)).toBeDefined();
  });

  // it("should show search results when speciality selected", async () => {
  //   const spec = "dentist";
  //   vi.mocked(mocks.get).mockReturnValue(spec);
  //   render(<InstantConsultation />);

  //   const searchResults = screen.getByTestId("search-results");

  //   expect((await within(searchResults).findAllByText(/dentist/i)).length).toBe(
  //     doctors.filter((item) => item.speciality.toLowerCase().includes(spec))
  //       .length
  //   );
  // });

  // it("should show notification after booking an appointment", async () => {
  //   vi.mocked(mocks.get).mockReturnValue("dentist");
  //   vi.mocked(mocks.getUser).mockReturnValue({
  //     logout: vi.fn(),
  //     login: vi.fn(),
  //     user: {
  //       token: "token",
  //       email: "test@test.com",
  //     },
  //     isLoggedIn: true,
  //   });

  //   render(
  //     <MemoryRouter initialEntries={["/instant-consultation"]}>
  //       <Routes>
  //         <Route element={<MainRoot />}>
  //           <Route
  //             path="/instant-consultation"
  //             element={<InstantConsultation />}
  //           />
  //         </Route>
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   const docCardBook = await screen.findAllByRole("button", {
  //     name: /book appointment/i,
  //   });

  //   await userEvent.click(docCardBook[0]);

  //   const nameInput = screen.getByPlaceholderText("Enter your name");
  //   const phoneInput = screen.getByPlaceholderText("Enter your phone");
  //   const dateInput = screen.getByLabelText("Date of Appointment");
  //   const timeSlot = screen.getByLabelText("Book Time Slot");

  //   screen.debug(dateInput);
  //   screen.debug(timeSlot);

  //   // expect(nameInput).toBeInTheDocument();
  // });
});
