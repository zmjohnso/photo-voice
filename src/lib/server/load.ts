import type { RequestEvent } from "@sveltejs/kit";
import { localeFromLanguage } from "$lib/i18n";
import type { Locale } from "$lib/domain/content";

export const localeFromRequest = (
  url: URL,
  request: Request,
  preferredLocale?: string,
): Locale => {
  const requestedLocale = url.searchParams.get("lang");
  if (requestedLocale === "ja" || requestedLocale === "en-US") {
    return requestedLocale;
  }

  if (preferredLocale === "ja" || preferredLocale === "en-US") {
    return preferredLocale;
  }

  return localeFromLanguage(request.headers.get("accept-language"));
};

export const setCmsCache = (setHeaders: RequestEvent["setHeaders"]) => {
  setHeaders({
    "cache-control": "public, max-age=60, stale-while-revalidate=300",
    vary: "accept-language, cookie",
  });
};
