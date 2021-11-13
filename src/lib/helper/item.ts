import type {JellyfinItem} from "$lib/typings/jellyfin";
import type {Badges, Genre, Item, ItemImage, ShowData} from "$lib/typings/internal";
import type {ItemType} from "$lib/typings/internal";
import {getResolutionText} from "$lib/helper/text";

const UNKNOWN = "unknown"

const getRandomEntry = (entries: any[]) => {
    const index = Math.floor(Math.random() * entries.length)
    return entries[index]
}
const getBadges = ({ CommunityRating, CriticRating, OfficialRating, HasSubtitles, Height, Width, MediaStreams }: JellyfinItem, watchable: boolean): Badges => {
    const videoStream = MediaStreams && MediaStreams.find(stream => stream.Type === "Video")

    return {
        ageRating: OfficialRating === "0" ? "PG-0" : OfficialRating,
        communityRating: CommunityRating,
        criticRating: CriticRating,
        hasSubtitles: HasSubtitles,

        videoRange: watchable ? videoStream && videoStream.VideoRange ? videoStream.VideoRange : "SDR" : null,
        resolution: watchable ? getResolutionText({ Height, Width }) : null,
    }
}

const getShowData = ({ SeriesId, SeasonId, SeriesName, SeasonName, UserData }: JellyfinItem): ShowData => {
    if(SeriesId == null) return null

    return {
        showId: SeriesId,
        seasonId: SeasonId,

        showName: SeriesName || UNKNOWN,
        seasonName: SeasonName || UNKNOWN,

        unplayedItems: UserData ? UserData.UnplayedItemCount : null
    }
}
const getImageData = ({ BackdropImageTags, ImageBlurHashes, ParentBackdropImageTags, ImageTags }: JellyfinItem, wide: boolean): ItemImage => {
    if(wide) {
        let tag
        let parent = false

        if(BackdropImageTags && BackdropImageTags.length > 0) tag = getRandomEntry(BackdropImageTags)
        else if(ParentBackdropImageTags && ParentBackdropImageTags.length > 0) {
            tag = getRandomEntry(ParentBackdropImageTags)
            parent = true
        }

        if(tag) {
            const hash = ImageBlurHashes && ImageBlurHashes.Backdrop ? ImageBlurHashes.Backdrop[tag] || null : null
            return {tag, hash, parent}
        }
    } else if(ImageTags && ImageTags.Primary) return {
        tag: ImageTags.Primary,
        hash: ImageBlurHashes.Primary[ImageTags.Primary]
    }

    return { tag: null, hash: null }
}

export const convert = (jellyfinItem: JellyfinItem): Item => {
    const { Id, Name, Taglines, UserData, Type } = jellyfinItem

    let type = Type === "Series" ? "show" : Type.toLowerCase() as ItemType
    const watchable = type === "movie" || type === "episode"

    return {
        id: Id,
        name: Name || UNKNOWN,

        badges: getBadges(jellyfinItem, watchable),
        type,

        overview: jellyfinItem.Overview,
        tagline: Taglines && Taglines.length > 0 ? Taglines[0] : null,
        lastPlayed: UserData && UserData.LastPlayedDate ? UserData.LastPlayedDate : 0,

        playable: watchable,
        watched: UserData && (UserData.UnplayedItemCount === 0 || UserData.Played),
        favorite: UserData && UserData.IsFavorite,

        images: {
            normal: getImageData(jellyfinItem, false),
            wide: getImageData(jellyfinItem, true),
        },

        playbackTicks: watchable && UserData ? UserData.PlaybackPositionTicks : null,
        playedPercentage: watchable && UserData ? UserData.PlayedPercentage : null,
        showData: getShowData(jellyfinItem),
    }
}
export const convertGenre = (jellyfinItem: JellyfinItem): Genre => {
    return {
        id: jellyfinItem.Id,
        name: jellyfinItem.Name || UNKNOWN,
    }
}