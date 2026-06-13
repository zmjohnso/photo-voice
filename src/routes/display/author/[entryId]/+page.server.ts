import type { PageServerLoad } from "./$types";
import { getVoicesByAuthor } from "$lib/server/contentful";
import { setCmsCache } from "$lib/server/load";

export const load: PageServerLoad = async ({ params, parent, setHeaders }) => {
  const { locale } = await parent();
  setCmsCache(setHeaders);

  return {
    voices: await getVoicesByAuthor(params.entryId, locale),
  };
};
