jest.mock("../config", () => ({
  API_URL: "http://localhost:3000/api-url",
}));
import "@testing-library/jest-dom";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});
