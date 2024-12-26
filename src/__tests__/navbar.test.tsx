import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { render, screen } from "../test-utils";
import * as auth from "../providers/auth";

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("navbar", () => {
  it("should show login and sign up btns if not logged in", async () => {
    jest.spyOn(auth, "useUser").mockImplementation(() => ({
      logout: jest.fn(),
      login: jest.fn(),
      user: null,
      isLoggedIn: true,
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("should show user name if loggedIn", async () => {
    const spy = jest.spyOn(auth, "useUser").mockImplementation(() => ({
      logout: jest.fn(),
      login: jest.fn(),
      user: {
        token: "token",
        email: "test@test.com",
        name: "Test",
      },
      isLoggedIn: true,
    }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(spy).toHaveBeenCalled();

    expect(screen.getByText(/welcome, Test/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it("should show user email if loggedIn and no name", async () => {
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
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome, test@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});
