export type Locale = "en-US" | "ja";

export interface Photo {
  title: string;
  description: string;
  url: string;
  width?: number;
  height?: number;
}

export interface PhotoLocation {
  prefecture: string;
  city?: string;
  detail?: string;
}

export interface VoiceAuthor {
  id: string;
  name: string;
  biography?: string;
  groupLocation: string;
}

export interface VoiceEntry {
  id: string;
  title: string;
  voice: string;
  photos: Photo[];
  photoDate: string;
  photoLocation: PhotoLocation;
  voiceAuthor: VoiceAuthor;
}

export interface HomePage {
  logo: Photo;
  welcomeText: string;
  supportDescription: string;
}

export interface AboutPage {
  picture: Photo;
  description: string;
}

export interface SearchOptions {
  photoLocations: string[];
  authorNames: string[];
}
