import { getClient } from "../services/contentful/client";
import { PhotoLocation, VoiceAuthor } from "../shared/content-types";
import { Locale } from "../shared/utilities";

export const SearchLoader = async (languageMode: Locale) => {
  const client = getClient();

  // TODO: add error handling
  const photoLocation = await client.getEntries<PhotoLocation>({
    content_type: "photoLocation",
    locale: languageMode,
  });
  const voiceAuthors = await client.getEntries<VoiceAuthor>({
    content_type: "author",
    locale: languageMode,
  });

  return {
    photoLocations: photoLocation.items,
    voiceAuthors: voiceAuthors.items,
  };
};

export type SearchLoaderValue = Awaited<ReturnType<typeof SearchLoader>>;
