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