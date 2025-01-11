import { IconDisplay } from "./icon-display";
import { render } from "@testing-library/react";
import { mockVoiceEntries } from "../../../__mocks__/mock-data";

describe("FilterVoiceEntries", () => {
  test("should render successfully", async () => {
    vi.mock("react-router", () => ({
      ...vi.importActual("react-router"),
      useLoaderData: () => mockVoiceEntries,
      useNavigate: () => vi.fn(),
    }));

    const container = render(<IconDisplay />);

    expect(container).toBeTruthy();
  });
});
