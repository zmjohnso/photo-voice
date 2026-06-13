import type { PageServerLoad } from "./$types";
import { getHomePage } from "$lib/server/contentful";
import { setCmsCache } from "$lib/server/load";

export const load: PageServerLoad = async ({ parent, setHeaders }) => {
  const { locale } = await parent();
  setCmsCache(setHeaders);

  return {
    homePage: await getHomePage(locale),
  };
};
