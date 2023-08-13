import { Entry } from "contentful";

export interface VoiceEntry {
  japaneseTitle: string;
  englishTitle: string;
  japaneseVoice: string;
  englishVoice?: string;
  photo: Photo[];
  photoDate: Date;
  photoLocation: Entry<PhotoLocation>;
  voiceDate: Date;
  entryId: number;
  voiceAuthor: Entry<VoiceAuthor>;
}

// TODO: can this type be cleaned up?
export interface Photo {
  fields: {
    description: string;
    file: {
      contentType: string;
      details: {
        image: {
          width: number;
          height: number;
        };
        size: number;
      };
      fileName: string;
      url: string;
    };
    title: string;
  };
}

export interface PhotoLocation {
  photoPrefecture: string;
  photoCity?: string;
  photoLocationDetail?: string;
}

export interface VoiceAuthor {
  japaneseName: string;
  englishName: string;
  japaneseBiography?: string;
  englishBiography?: string;
  groupLocation: string;
}

export interface HomePage {
  logo: Photo;
}

export interface AboutPage {
  aboutPicture: Photo;
}
