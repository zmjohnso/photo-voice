import { env } from "$env/dynamic/private";
import { createClient, type ContentfulClientApi } from "contentful";
import type {
  AboutPage,
  HomePage,
  Locale,
  Photo,
  PhotoLocation,
  SearchOptions,
  VoiceAuthor,
  VoiceEntry,
} from "$lib/domain/content";

interface RawEntry {
  sys?: { id?: string };
  fields?: Record<string, unknown>;
}

interface RawFile {
  url?: string;
  details?: {
    image?: {
      width?: number;
      height?: number;
    };
  };
}

const asEntry = (value: unknown) => value as RawEntry;
const asString = (value: unknown) => (typeof value === "string" ? value : "");
const asOptionalString = (value: unknown) => {
  const string = asString(value);
  return string || undefined;
};
const absoluteAssetUrl = (url: string) =>
  url.startsWith("//") ? `https:${url}` : url;

export const normalizePhoto = (value: unknown): Photo => {
  const fields = asEntry(value).fields ?? {};
  const file = (fields.file ?? {}) as RawFile;

  return {
    title: asString(fields.title),
    description: asString(fields.description),
    url: absoluteAssetUrl(asString(file.url)),
    width: file.details?.image?.width,
    height: file.details?.image?.height,
  };
};

export const normalizeAuthor = (value: unknown): VoiceAuthor => {
  const entry = asEntry(value);
  const fields = entry.fields ?? {};

  return {
    id: asString(entry.sys?.id),
    name: asString(fields.name),
    biography: asOptionalString(fields.biography),
    groupLocation: asString(fields.groupLocation),
  };
};

export const normalizeLocation = (value: unknown): PhotoLocation => {
  const fields = asEntry(value).fields ?? {};

  return {
    prefecture: asString(fields.photoPrefecture),
    city: asOptionalString(fields.photoCity),
    detail: asOptionalString(fields.photoLocationDetail),
  };
};

export const normalizeVoiceEntry = (value: unknown): VoiceEntry => {
  const entry = asEntry(value);
  const fields = entry.fields ?? {};
  const photos = Array.isArray(fields.photo) ? fields.photo : [];

  return {
    id: asString(entry.sys?.id),
    title: asString(fields.title),
    voice: asString(fields.voice),
    photos: photos.map(normalizePhoto).filter(({ url }) => url),
    photoDate: asString(fields.photoDate),
    photoLocation: normalizeLocation(fields.photoLocation),
    voiceAuthor: normalizeAuthor(fields.voiceAuthor),
  };
};

let client: ContentfulClientApi<undefined> | undefined;

const getClient = () => {
  if (client) return client;

  const space = env.CONTENTFUL_SPACE_ID ?? env.VITE_CONTENTFUL_SPACE_ID ?? "";
  const accessToken =
    env.CONTENTFUL_ACCESS_TOKEN ?? env.VITE_CONTENTFUL_API_KEY ?? "";
  const environment =
    env.CONTENTFUL_ENVIRONMENT_ID ??
    env.VITE_CONTENTFUL_ENVIRONMENT_ID ??
    "master";

  if (!space || !accessToken) {
    throw new Error(
      "Contentful is not configured. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN.",
    );
  }

  client = createClient({ space, accessToken, environment });
  return client;
};

const firstItem = (items: unknown[], contentType: string) => {
  const item = items[0];
  if (!item) {
    throw new Error(`Contentful returned no ${contentType} content.`);
  }
  return asEntry(item);
};

export const getHomePage = async (locale: Locale): Promise<HomePage> => {
  const response = await getClient().getEntries({
    content_type: "homepage",
    locale,
    limit: 1,
  });
  const fields = firstItem(response.items, "homepage").fields ?? {};

  return {
    logo: normalizePhoto(fields.logo),
    welcomeText: asString(fields.welcomeText),
    supportDescription: asString(fields.supportDescription),
  };
};

export const getAboutPage = async (locale: Locale): Promise<AboutPage> => {
  const response = await getClient().getEntries({
    content_type: "about",
    locale,
    limit: 1,
  });
  const fields = firstItem(response.items, "about").fields ?? {};

  return {
    picture: normalizePhoto(fields.aboutPicture),
    description: asString(fields.description),
  };
};

export const getVoiceEntries = async (
  locale: Locale,
): Promise<VoiceEntry[]> => {
  const response = await getClient().getEntries({
    content_type: "entry",
    locale,
    include: 2,
    limit: 1000,
  });

  return response.items.map(normalizeVoiceEntry);
};

export const getVoiceEntry = async (
  id: string,
  locale: Locale,
): Promise<VoiceEntry> => {
  const entry = await getClient().getEntry(id, { locale, include: 2 });
  return normalizeVoiceEntry(entry);
};

export const getAuthor = async (
  id: string,
  locale: Locale,
): Promise<VoiceAuthor> => {
  const entry = await getClient().getEntry(id, { locale });
  return normalizeAuthor(entry);
};

export const getVoicesByAuthor = async (
  id: string,
  locale: Locale,
): Promise<VoiceEntry[]> => {
  const voices = await getVoiceEntries(locale);
  return voices.filter(({ voiceAuthor }) => voiceAuthor.id === id);
};

export const getSearchOptions = async (
  locale: Locale,
): Promise<SearchOptions> => {
  const [locationsResponse, authorsResponse] = await Promise.all([
    getClient().getEntries({
      content_type: "photoLocation",
      locale,
      limit: 1000,
    }),
    getClient().getEntries({
      content_type: "author",
      locale,
      limit: 1000,
    }),
  ]);

  const photoLocations = locationsResponse.items.flatMap((entry) => {
    const location = normalizeLocation(entry);
    return [location.prefecture, location.city].filter(
      (value): value is string => !!value,
    );
  });
  const authorNames = authorsResponse.items
    .map((entry) => normalizeAuthor(entry).name)
    .filter(Boolean);

  return {
    photoLocations: [...new Set(photoLocations)].sort((a, b) =>
      a.localeCompare(b, locale),
    ),
    authorNames: [...new Set(authorNames)].sort((a, b) =>
      a.localeCompare(b, locale),
    ),
  };
};
