import { Home } from "./home";
import { mockHomePage } from "../../../__mocks__/mock-data";
import { render, screen } from "@testing-library/react";

describe("Home component", () => {
  test("renders home content when loader data is available", () => {
    vi.mock("react-router-dom", () => ({
      ...vi.importActual("react-router-dom"),
      useLoaderData: () => mockHomePage,
      useNavigation: () => vi.fn(),
    }));

    render(<Home />);

    const homePageLogo = screen.getByAltText("Photo Voice Logo");
    expect(homePageLogo).toBeInTheDocument();
  });
});
