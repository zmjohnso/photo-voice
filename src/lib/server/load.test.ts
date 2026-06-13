import { describe, expect, test } from "vitest";
import { localeFromRequest } from "./load";

describe("localeFromRequest", () => {
  const request = new Request("https://example.com", {
    headers: { "accept-language": "ja-JP,ja;q=0.9" },
  });

  test("prefers an explicit URL locale", () => {
    expect(
      localeFromRequest(
        new URL("https://example.com?lang=en-US"),
        request,
        "ja",
      ),
    ).toBe("en-US");
  });

  test("keeps a saved preference across clean URLs", () => {
    expect(
      localeFromRequest(new URL("https://example.com"), request, "en-US"),
    ).toBe("en-US");
  });

  test("falls back to the browser language", () => {
    expect(localeFromRequest(new URL("https://example.com"), request)).toBe(
      "ja",
    );
  });
});
