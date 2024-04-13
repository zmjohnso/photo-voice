import { getClient } from "../services/contentful/client";
import { HomePage } from "../shared/content-types";
import { Locale } from "../shared/utilities";

export const HomeLoader = async (languageMode: Locale) => {
  const client = getClient();
  const res = await client.getEntries<HomePage>({
    content_type: "homepage",
    locale: languageMode,
  });
  // There will only every be one home page, so we can safely return the first item
  return res.items[0];
};

export type HomeLoaderValue = Awaited<ReturnType<typeof HomeLoader>>;
