import { getClient } from "../services/contentful/client";
import { VoiceAuthor } from "../shared/content-types";
import { Locale } from "../shared/utilities";

export const AuthorLoader = async (
  languageMode: Locale,
  entryId: string | undefined,
) => {
  const client = getClient();
  // Add error handling
  const res = await client.getEntry<VoiceAuthor>(entryId ?? "", {
    locale: languageMode,
  });
  return res;
};

export type AuthorLoaderValue = Awaited<ReturnType<typeof AuthorLoader>>;
