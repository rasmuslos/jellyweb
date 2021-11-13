export const VALID_TYPES = ["movie", "episode", "season", "show"]

export type Item = {
    name: string,
    overview: string,
    tagline: string,

    badges: Badges,
    type: ItemType,
    id: string,

    images: ItemImages,
    showData: ShowData,

    watched: boolean,
    playable: boolean,
    favorite: boolean,

    lastPlayed: string | number,
    playedPercentage: number,
    playbackTicks: number,

    chapters?,
    people?,
}

export type ItemType = "movie" | "episode" | "season" | "show"

export type Badges = {
    ageRating: string,
    resolution: string,
    videoRange: string,

    criticRating: number,
    communityRating: number,

    hasSubtitles: boolean,
}

export type ShowData = {
    showId: string,
    seasonId: string,

    showName: string,
    seasonName: string,

    unplayedItems: number,
}

export type ItemImages = {
    normal: ItemImage,
    wide: ItemImage,
}
export type ItemImage = {
    tag: string,
    hash: string,
    parent?: boolean,
}