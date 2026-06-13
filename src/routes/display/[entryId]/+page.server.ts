import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getVoiceEntry } from "$lib/server/contentful";
import { setCmsCache } from "$lib/server/load";

export const load: PageServerLoad = async ({ params, parent, setHeaders }) => {
  const { locale } = await parent();
  setCmsCache(setHeaders);

  try {
    return {
      voice: await getVoiceEntry(params.entryId, locale),
    };
  } catch {
    error(404, "Voice not found");
  }
};
