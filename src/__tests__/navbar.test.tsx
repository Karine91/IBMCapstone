import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { render, screen } from "../tests/test-utils";
import * as auth from "../providers/auth";
import { useUserData } from "../tests/helpers";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("navbar", () => {
  it("should show login and sign up btns if not logged in", async () => {
    jest.spyOn(auth, "useUser").mockImplementation(() => ({
      ...useUserData,
      token: null,
      user: null,
      isLoggedIn: false,
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
    const spy = jest
      .spyOn(auth, "useUser")
      .mockImplementation(() => useUserData);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(spy).toHaveBeenCalled();

    expect(screen.getByText(/welcome, Test/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});
