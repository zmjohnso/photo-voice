import { getClient } from "../services/contentful/client";
import { VoiceEntry } from "../shared/content-types";
import { Locale } from "../shared/utilities";

export const AuthorEntryLoader = async (
  languageMode: Locale,
  authorEntryId: string | undefined,
) => {
  const client = getClient();
  // Add error handling
  const res = await client
    .getEntries<VoiceEntry>({
      content_type: "entry",
      locale: languageMode,
    })
    .then((res) => {
      return res.items.filter(
        (item) => item.fields.voiceAuthor.sys.id === authorEntryId,
      );
    });
  return res;
};

export type AuthorEntryLoaderValue = Awaited<
  ReturnType<typeof AuthorEntryLoader>
>;
