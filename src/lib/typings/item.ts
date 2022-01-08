export type Item = {
    id: string,
    name: string,
    type: Type,
    overview?: string,

    tagline?: string,
    seriesInfo?: SeriesInfo,

    genres?: Genre[],
    tags?: string[],

    rating: string,
    runtime?: number,
    userData?: UserData,

    images?: {
        primary: Image,
        backdrop: Image,
    },

    externalIds: {
        imdb?: string,
    },
    ratings: {
        critic?: number,
        audience?: number,
    },
}
export type Type = "movie" | "series" | "season" | "episode" | "person" | "genre"
export type Image = {
    url: string,
    hash: string,
}
export type SeriesInfo = {
    show: string,
    season?: string,

    showName: string,
    seasonName?: string,
}
export type UserData = {
    favorite: boolean,
    watched: boolean,
    position: number,
}

export type ExtendedItem = Item & {
    chapters: Chapter[],
    people: Item[],
}
export type Chapter = {
    start: number,
    name: string,
    image: string,
}

export type Genre = {
    name: string,
    id: string,
}