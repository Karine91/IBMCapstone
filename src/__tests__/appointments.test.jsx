import InstantConsultation from "../components/InstantConsultationBooking/InstantConsultation";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render } from "../test-utils";
import doctors from "./doctors.json";

const server = setupServer(
  http.get("https://api.npoint.io/9a5543d36f1460da2f63", () => {
    return HttpResponse.json(doctors);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("appointments", () => {
  it("should show search bar", () => {
    render(<InstantConsultation />);
  });
});
