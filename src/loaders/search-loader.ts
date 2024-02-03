import { getClient } from "../services/contentful/client";
import { PhotoLocation, VoiceAuthor } from "../shared/content-types";

export const SearchLoader = async () => {
  const client = getClient();

  // TODO: add error handling
  const photoLocation = await client.getEntries<PhotoLocation>({
    content_type: "photoLocation",
  });
  const voiceAuthors = await client.getEntries<VoiceAuthor>({
    content_type: "author",
  });

  return {
    photoLocations: photoLocation.items,
    voiceAuthors: voiceAuthors.items,
  };
};

export type SearchLoaderValue = Awaited<ReturnType<typeof SearchLoader>>;
