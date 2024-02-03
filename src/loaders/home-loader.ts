import { getClient } from "../services/contentful/client";
import { HomePage } from "../shared/content-types";

export const HomeLoader = async () => {
  const client = getClient();
  const res = await client.getEntries<HomePage>({ content_type: "homepage" });
  // TODO: update the schema; there will only every be one home page
  return res.items;
};

export type HomeLoaderValue = Awaited<ReturnType<typeof HomeLoader>>;
