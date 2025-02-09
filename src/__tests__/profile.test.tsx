import { render, screen } from "../tests/test-utils";
import userEvent from "@testing-library/user-event";
import ProfileCard from "../components/profile/ProfileCard";
import * as auth from "../providers/auth";
import { useUserData } from "../tests/helpers";

jest.mock("../api");

describe("profile", () => {
  it("should update profile info", async () => {
    const user = userEvent.setup();
    jest.spyOn(auth, "useUser").mockImplementation(() => useUserData);
    render(<ProfileCard />);

    const nameInput = screen.getByPlaceholderText("Enter your name");

    await user.clear(nameInput);
    await user.type(nameInput, "Karine 2");

    const submitBtn = screen.getByRole("button", { name: /Submit/i });

    await user.click(submitBtn);
    expect(useUserData.setProfile).toHaveBeenCalledWith({
      ...useUserData.user,
      name: "Karine 2",
    });
  });
  it("should show validation err if fields empty", async () => {
    const user = userEvent.setup();
    jest.spyOn(auth, "useUser").mockImplementation(() => useUserData);
    render(<ProfileCard />);

    const nameInput = screen.getByPlaceholderText("Enter your name");

    await user.clear(nameInput);

    const submitBtn = screen.getByRole("button", { name: /Submit/i });

    await user.click(submitBtn);
    const form = screen.getByTestId("user-profile-form");
    expect(form).toHaveTextContent("Field is required.");
  });
});
