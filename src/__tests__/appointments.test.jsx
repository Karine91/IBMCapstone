import React from "react";
import InstantConsultation from "../components/InstantConsultationBooking/InstantConsultation";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen, within, cleanup } from "../test-utils";
import { prettyDOM } from "@testing-library/dom";
import doctors from "./doctors.json";
import {
  beforeAll,
  afterEach,
  afterAll,
  describe,
  it,
  vi,
  expect,
} from "vitest";

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

const mocks = vi.hoisted(() => {
  return {
    get: vi.fn(),
  };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSearchParams: () => {
      return [
        {
          get: mocks.get,
        },
        vi.fn(),
      ];
    },
  };
});

describe("appointments", () => {
  it("should show search bar with selected speciality by search param", async () => {
    vi.mocked(mocks.get).mockReturnValue("dentist");
    render(<InstantConsultation />);

    const searchBar = screen.getByTestId("search-bar");
    expect(await within(searchBar).findByText(/dentist/i)).toBeDefined();
  });

  it("should show search results when speciality selected", async () => {
    vi.mocked(mocks.get).mockReturnValue("dentist");
    render(<InstantConsultation />);

    const searchResults = screen.getByTestId("search-results");

    expect((await within(searchResults).findAllByText(/dentist/i)).length).toBe(
      8
    );
  });
});
