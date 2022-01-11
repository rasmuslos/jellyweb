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

    primaryImage: Image,
}
export type UserData = {
    favorite: boolean,
    watched: boolean,
    position: number,
}

export type ExtendedItem = Item & {
    chapters?: Chapter[],
    people?: Person[],
    mediaSources?: MediaSource[],
}
export type Chapter = {
    start: number,
    name: string,
    image: Image,
}
export type Person = {
    name: string,
    id: string,
    role: string,
    image: Image,
}
export type MediaSource = {
    id: string,
    container: string,
    bitrate: number,
    runtime: number,
    mediaStreams: MediaStream[],
}
export type MediaStreamType = "video" | "audio" | "subtitle"
export type MediaStream = {
    codec: string,
    type: MediaStreamType,
    range?: "sdr" | "hdr",
    title?: string,
    language?: string,
}

export type Genre = {
    name: string,
    id: string,
}

export enum RecommendationReason {
    SimilarToRecentlyPlayed = "recommendation.reason.recent.played",
    SimilarToLikedItem = "recommendation.reason.liked.similar",
    HasDirectorFromRecentlyPlayed = "recommendation.reason.recent.director",
    HasActorFromRecentlyPlayed = "recommendation.reason.recent.actor",
    HasLikedDirector = "recommendation.reason.liked.director",
    HasLikedActor = "recommendation.reason.liked.actor",
}
export type Recommendation = {
    reason: RecommendationReason,
    title: string,
    items: Item[],
}