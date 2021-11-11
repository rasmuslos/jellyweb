export type Item = {
    name: string,
    tagline: string,
    type: ItemType,
    id: string,

    images: ItemImages,
    showData: ShowData,

    watched: boolean,
    playable: boolean,
    favorite: boolean,

    lastPlayed: string | number,
    playedPercentage: number,
}

export type ItemType = "movie" | "episode" | "season" | "show"

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