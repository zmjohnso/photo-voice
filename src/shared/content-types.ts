import { Photo } from "@mui/icons-material";
import { Entry } from "contentful";

export interface VoiceEntry {
  title: string;
  voice: string;
  photo: Photo[];
  photoDate: Date;
  photoLocation: Entry<PhotoLocation>;
  voiceAuthor: Entry<VoiceAuthor>;
  entryId: number;
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
  name: string;
  biography?: string;
  groupLocation: string;
}

export interface HomePage {
  logo: Photo;
  logoDark: Photo;
  welcomeText: string;
  supportDescription: string;
}

export interface AboutPage {
  aboutPicture: Photo;
  description: string;
}
