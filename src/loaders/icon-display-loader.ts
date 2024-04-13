import { getClient } from "../services/contentful/client";
import { VoiceEntry } from "../shared/content-types";
import { Locale } from "../shared/utilities";

export const IconDisplayLoader = async (languageMode: Locale) => {
  const client = getClient();
  // Add error handling
  const res = await client.getEntries<VoiceEntry>({
    content_type: "entry",
    locale: languageMode,
  });
  return res.items;
};

export type IconDisplayLoaderValue = Awaited<
  ReturnType<typeof IconDisplayLoader>
>;
