import { Document } from "@contentful/rich-text-types";

interface Coordinates {
    lon: number;
    lat: number;
}

export interface VoiceEntry {
    title: string;
    photo: Document;
    japaneseVoice: string;
    englishVoice?: string;
    voiceDate: string;
    voiceLocation: Coordinates;
    entryId: number;
}