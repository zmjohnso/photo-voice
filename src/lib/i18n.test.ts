import { describe, expect, test } from "vitest";
import { copyFor, localeFromLanguage } from "./i18n";

describe("localization", () => {
  test("uses Japanese only for Japanese browser locales", () => {
    expect(localeFromLanguage("ja-JP")).toBe("ja");
    expect(localeFromLanguage("ja")).toBe("ja");
    expect(localeFromLanguage("en-US")).toBe("en-US");
  });

  test("provides translated navigation and search labels", () => {
    expect(copyFor("en-US").nav.search).toBe("Search");
    expect(copyFor("ja").nav.search).toBe("検索");
    expect(copyFor("ja").search.startDate).toBe("開始日");
  });
});
