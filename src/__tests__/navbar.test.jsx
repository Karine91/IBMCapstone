import React from "react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { render, screen } from "../test-utils";

import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
  return {
    getUser: vi.fn(),
  };
});

vi.mock("../providers/auth", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useUser: mocks.getUser,
  };
});

describe("navbar", () => {
  it("should show login and sign up btns if not logged in", async () => {
    vi.mocked(mocks.getUser).mockReturnValue({
      logout: vi.fn(),
      login: vi.fn(),
      user: null,
      isLoggedIn: false,
    });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("should show user name if loggedIn", async () => {
    vi.mocked(mocks.getUser).mockReturnValue({
      logout: vi.fn(),
      login: vi.fn(),
      user: {
        token: "token",
        email: "test@test.com",
        name: "Test",
      },
      isLoggedIn: true,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome, Test/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it("should show user email if loggedIn and no name", async () => {
    vi.mocked(mocks.getUser).mockReturnValue({
      logout: vi.fn(),
      login: vi.fn(),
      user: {
        token: "token",
        email: "test@test.com",
      },
      isLoggedIn: true,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome, test@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});
