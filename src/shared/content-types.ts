interface Coordinates {
    lon: number;
    lat: number;
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
                }
                size: number;
            }
            fileName: string;
            url: string;
        }
        title: string;
    }  
}

export interface VoiceEntry {
    title: string;
    photo: Photo[];
    japaneseVoice: string;
    englishVoice?: string;
    voiceDate: string;
    voiceLocation: Coordinates;
    entryId: number;
}