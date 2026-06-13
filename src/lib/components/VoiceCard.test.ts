import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import VoiceCard from "./VoiceCard.svelte";

describe("VoiceCard", () => {
  test("links a voice preview to its localized detail route", async () => {
    render(VoiceCard, {
      entry: {
        id: "voice-1",
        title: "A voice",
        voice: "",
        photos: [
          {
            title: "Photo",
            description: "A test photo",
            url: "https://example.com/photo.jpg",
          },
        ],
        photoDate: "2024-01-01",
        photoLocation: { prefecture: "Tokyo" },
        voiceAuthor: {
          id: "author-1",
          name: "Taro",
          groupLocation: "Tokyo",
        },
      },
      locale: "ja",
    });

    expect(screen.getByRole("heading", { name: "A voice" })).toBeVisible();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/display/voice-1?lang=ja",
    );
    const image = screen.getByAltText("A test photo");
    expect(image).not.toHaveClass("loaded");

    await fireEvent.load(image);

    expect(image).toHaveClass("loaded");
  });
});
