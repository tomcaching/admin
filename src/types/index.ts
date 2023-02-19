export type GeocacheType = "traditional" | "mystery";

export type GeocacheCoordinates = {
    lat: number;
    lng: number;
};

type GeocacheDtoBase = {
    id: number;
    type: GeocacheType;
    title: string;
    hint: string;
    content: string;
    found: boolean;
    coordinates: GeocacheCoordinates;
};

type TraditionalGeocacheDto = GeocacheDtoBase & {
    type: "traditional";
    locked: false;
    fakeCoordinates: null;
    question: null;
    solution: null;
};

type MysteryGeocacheDto = GeocacheDtoBase & {
    type: "mystery";
    locked: boolean;
    fakeCoordinates: GeocacheCoordinates;
    question: string;
    solution: string;
};

export type GeocacheDto = TraditionalGeocacheDto | MysteryGeocacheDto;

export type GeocacheRequest = {
    title: string;
    content: string;
    type: GeocacheType;
    latitude: number;
    longitude: number;
    fakeLatitude?: number;
    fakeLongitude?: number;
    question?: string;
    solution?: string;
};
