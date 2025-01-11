import { getClient } from "../services/contentful/client";
import { VoiceEntry } from "../shared/content-types";
import { Locale } from "../shared/utilities";

export const DisplayEntryLoader = async (
  languageMode: Locale,
  entryId: string | undefined,
) => {
  const client = getClient();
  // Add error handling
  const res = await client.getEntry<VoiceEntry>(entryId ?? "", {
    locale: languageMode,
  });
  return res;
};

export type DisplayEntryLoaderValue = Awaited<
  ReturnType<typeof DisplayEntryLoader>
>;
