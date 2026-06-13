import { describe, expect, test } from "vitest";
import {
  normalizeAuthor,
  normalizePhoto,
  normalizeVoiceEntry,
} from "./contentful";

describe("Contentful normalization", () => {
  test("converts vendor entries into application-owned voice models", () => {
    const entry = {
      sys: { id: "voice-1" },
      fields: {
        title: "A voice",
        voice: "**Remember this.**",
        photoDate: "2024-02-15",
        photo: [
          {
            fields: {
              title: "Coast",
              description: "A coastal photograph",
              file: {
                url: "//images.ctfassets.net/photo.jpg",
                details: { image: { width: 1200, height: 800 } },
              },
            },
          },
        ],
        photoLocation: {
          fields: {
            photoPrefecture: "Miyagi",
            photoCity: "Ishinomaki",
          },
        },
        voiceAuthor: {
          sys: { id: "author-1" },
          fields: {
            name: "Hanako",
            groupLocation: "Miyagi",
          },
        },
      },
    };

    expect(normalizeVoiceEntry(entry)).toEqual({
      id: "voice-1",
      title: "A voice",
      voice: "**Remember this.**",
      photoDate: "2024-02-15",
      photos: [
        {
          title: "Coast",
          description: "A coastal photograph",
          url: "https://images.ctfassets.net/photo.jpg",
          width: 1200,
          height: 800,
        },
      ],
      photoLocation: {
        prefecture: "Miyagi",
        city: "Ishinomaki",
        detail: undefined,
      },
      voiceAuthor: {
        id: "author-1",
        name: "Hanako",
        biography: undefined,
        groupLocation: "Miyagi",
      },
    });
  });

  test("returns safe empty values for incomplete optional content", () => {
    expect(normalizePhoto({ fields: {} }).url).toBe("");
    expect(normalizeAuthor({ sys: { id: "author-2" }, fields: {} })).toEqual({
      id: "author-2",
      name: "",
      biography: undefined,
      groupLocation: "",
    });
  });
});
