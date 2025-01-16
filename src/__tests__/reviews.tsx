import { render, screen, fireEvent } from "../test-utils";
import userEvent from "@testing-library/user-event";
import * as auth from "../providers/auth";
import ReviewForm from "../components/reviews/ReviewForm";
import doctors from "./doctors.json";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("reviews", () => {
  it("should submit review form with the right data", async () => {
    const user = userEvent.setup();
    jest.spyOn(auth, "useUser").mockImplementation(() => ({
      logout: jest.fn(),
      login: jest.fn(),
      user: {
        token: "token",
        email: "test@test.com",
      },
      isLoggedIn: true,
    }));

    const doctor = doctors[0];

    const submitCb = jest.fn();

    render(<ReviewForm onSubmitCb={submitCb} doctor={doctor} />);

    const ratingStars = screen.getByTestId("rating-stars");
    const submitBtn = screen.getByRole("button", { name: /submit review/i });

    // with fireEvent working, but with user.click not...
    fireEvent(
      ratingStars.children[4],
      new MouseEvent("click", { bubbles: true, cancelable: true })
    );
    await user.click(submitBtn);

    expect(submitCb).toHaveBeenCalledWith({
      doctor,
      review: {
        userName: "Anonym",
        content: "",
        rating: 5,
      },
    });
  });
});
