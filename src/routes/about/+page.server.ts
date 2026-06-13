import type { PageServerLoad } from "./$types";
import { getAboutPage } from "$lib/server/contentful";
import { setCmsCache } from "$lib/server/load";

export const load: PageServerLoad = async ({ parent, setHeaders }) => {
  const { locale } = await parent();
  setCmsCache(setHeaders);

  return {
    aboutPage: await getAboutPage(locale),
  };
};
