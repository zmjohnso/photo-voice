import { Entry } from "contentful";
import {
  PhotoLocation,
  VoiceAuthor,
  Photo,
  VoiceEntry,
} from "../src/shared/content-types";
import {
  NameOrLocationData,
  LogicalOperators,
  DateData,
  DateLogicalOperators,
} from "../src/shared/utilities";

const mockPhotoLocation: PhotoLocation = {
  photoPrefecture: "Tokyo",
  photoCity: "Shinjuku",
  photoLocationDetail: "Shinjuku Gyoen Park",
};

const mockVoiceAuthor: VoiceAuthor = {
  name: "Taro Yamada",
  biography: "Voice actor's biography",
  groupLocation: "Tokyo, Japan",
};

const mockPhoto: Photo = {
  fields: {
    description: "A beautiful scene",
    file: {
      contentType: "image/jpeg",
      details: {
        image: {
          width: 1920,
          height: 1080,
        },
        size: 123456,
      },
      fileName: "photo123.jpg",
      url: "https://example.com/photo123.jpg",
    },
    title: "Scenic View",
  },
};

export const mockVoiceEntry: Entry<VoiceEntry> = {
  sys: {
    id: "entryId123",
    type: "",
    createdAt: "",
    updatedAt: "",
    locale: "",
    contentType: {
      sys: undefined as any,
    },
  },
  fields: {
    title: "Title",
    voice: "Voice Data",
    photo: [mockPhoto],
    photoDate: new Date(),
    photoLocation: mockPhotoLocation as unknown as Entry<PhotoLocation>,
    entryId: 1,
    voiceAuthor: mockVoiceAuthor as unknown as Entry<VoiceAuthor>,
  },
  metadata: undefined as any,
  toPlainObject: function (): object {
    throw new Error("Function not implemented.");
  },
  update: function (): Promise<Entry<VoiceEntry>> {
    throw new Error("Function not implemented.");
  },
};

export const mockPhotoLocations: NameOrLocationData[] = [
  { value: "Tokyo", operator: LogicalOperators.And },
  { value: "Kyoto", operator: LogicalOperators.Or },
];

export const mockEnglishAuthorNames: NameOrLocationData[] = [
  { value: "Taro Yamada", operator: LogicalOperators.And },
  { value: "Hanako Suzuki", operator: LogicalOperators.Or },
];

export const mockPhotoStartDate: DateData = {
  value: new Date("2023-01-01"),
  operator: DateLogicalOperators.After,
};

export const mockPhotoEndDate: DateData = {
  value: new Date("2023-12-31"),
  operator: DateLogicalOperators.Before,
};
