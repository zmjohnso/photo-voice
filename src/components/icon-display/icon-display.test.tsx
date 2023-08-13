import { describe, expect, test } from "vitest";
import { IconDisplay } from "./icon-display";
import { render } from "@testing-library/react";

describe("FilterVoiceEntries", () => {
  test("should render successfully", async () => {
    const container = render(<IconDisplay />);

    expect(container).toBeTruthy();
  });
});
