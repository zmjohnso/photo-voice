export interface VoiceEntry {
  japaneseTitle: string;
  englishTitle: string;
  japaneseVoice: string;
  englishVoice?: string;
  photo: Photo[];
  photoDate: Date;
  photoLocation: PhotoLocation;
  voiceDate: string;
  // voiceLocation: Coordinates;
  entryId: number;
  voiceAuthor: string;
}

interface Photo {
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

interface PhotoLocation {
  fields: {
    photoPrefecture: string;
    photoCity: string;
    photoLocationDetail?: string;
  };
}
