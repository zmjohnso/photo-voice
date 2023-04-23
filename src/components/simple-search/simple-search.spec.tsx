import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SimpleSearch } from "./simple-seach";

describe("simple search", () => {
  it("should show the simple search component", () => {
    const mockUseNavigate = {
      useNavigate: () => vi.fn(),
    };
    const useNavigateSpy = vi.spyOn(mockUseNavigate, "useNavigate");

    render(<SimpleSearch />);

    expect(screen.getByText("Search")).toBeDefined();
  });
});
