import { getClient } from "../services/contentful/client";
import { VoiceEntry } from "../shared/content-types";

export const IconDisplayLoader = async () => {
  const client = getClient();
  // Add error handling
  const res = await client.getEntries<VoiceEntry>({ content_type: "entry" });
  return res.items;
};

export type IconDisplayLoaderValue = Awaited<
  ReturnType<typeof IconDisplayLoader>
>;
