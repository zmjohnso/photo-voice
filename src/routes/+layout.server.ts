import type { LayoutServerLoad } from "./$types";
import { localeFromRequest } from "$lib/server/load";

export const load: LayoutServerLoad = ({ url, request, cookies }) => ({
  locale: localeFromRequest(url, request, cookies.get("photo_voice_locale")),
});
