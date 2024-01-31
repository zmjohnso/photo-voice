import { getClient } from "../services/contentful/client";
import { AboutPage } from "../shared/content-types";

export const AboutLoader = async () => {
  const client = getClient();
  const res = await client.getEntries<AboutPage>({ content_type: "about" });
  // TODO: add error handling
  // TODO: update the schema; there will only every be one about page
  return res.items[0];
};
