import type { Locale } from "./domain/content";

export const localizedPath = (path: string, locale: Locale) => {
  const [pathname, query = ""] = path.split("?");
  const params = new URLSearchParams(query);

  if (locale === "ja") {
    params.set("lang", "ja");
  } else {
    params.delete("lang");
  }

  const search = params.toString();
  return `${pathname}${search ? `?${search}` : ""}`;
};
