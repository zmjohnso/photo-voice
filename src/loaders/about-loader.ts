import { getClient } from "../services/contentful/client";
import { AboutPage } from "../shared/content-types";

export const AboutLoader = async () => {
  const client = getClient();
  // TODO: add error handling
  const res = await client.getEntries<AboutPage>({ content_type: "about" });
  // TODO: update the schema; there will only every be one about page
  return res.items[0];
};

export type AboutLoaderValue = Awaited<ReturnType<typeof AboutLoader>>;
