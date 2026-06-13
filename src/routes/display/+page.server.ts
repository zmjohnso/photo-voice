import type { PageServerLoad } from "./$types";
import {
  filterVoiceEntries,
  searchCriteriaFromParams,
} from "$lib/domain/search";
import { getVoiceEntries } from "$lib/server/contentful";
import { setCmsCache } from "$lib/server/load";

export const load: PageServerLoad = async ({ parent, setHeaders, url }) => {
  const { locale } = await parent();
  const criteria = searchCriteriaFromParams(url.searchParams);
  const voices = await getVoiceEntries(locale);
  setCmsCache(setHeaders);

  return {
    voices: filterVoiceEntries(voices, criteria),
  };
};
