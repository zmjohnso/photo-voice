import { getClient } from "../services/contentful/client";
import { AboutPage } from "../shared/content-types";
import { Locale } from "../shared/utilities";

export const AboutLoader = async (languageMode: Locale) => {
  const client = getClient();
  // TODO: add error handling
  const res = await client.getEntries<AboutPage>({
    content_type: "about",
    locale: languageMode,
  });
  // TODO: update the schema; there will only every be one about page
  return res.items[0];
};

export type AboutLoaderValue = Awaited<ReturnType<typeof AboutLoader>>;
