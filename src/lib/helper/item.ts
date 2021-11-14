import type {Chapter as JellyfinChapter, JellyfinItem, Person as JellyfinPerson} from "$lib/typings/jellyfin";
import type {Badges, Chapter, Genre, Item, ItemImage, ShowData} from "$lib/typings/internal";
import type {ItemType} from "$lib/typings/internal";
import {getResolutionText} from "$lib/helper/text";
import {VALID_TYPES} from "$lib/typings/internal";
import type {Person} from "$lib/typings/internal/person";
import {convertTicksToMillis} from "$lib/helper/utils";

const UNKNOWN = "unknown"

const getRandomEntry = (entries: any[]) => {
    const index = Math.floor(Math.random() * entries.length)
    return entries[index]
}
const getBadges = ({ CommunityRating, CriticRating, OfficialRating, HasSubtitles, Height, Width, MediaStreams, MediaSources }: JellyfinItem, watchable: boolean): Badges => {
    const videoStream = MediaStreams && MediaStreams.find(stream => stream.Type === "Video")
    const mediaSource = MediaSources && MediaSources.length > 0 && MediaSources[0]

    return {
        ageRating: OfficialRating === "0" ? "PG-0" : OfficialRating,
        communityRating: CommunityRating,
        criticRating: CriticRating,
        hasSubtitles: HasSubtitles,

        videoRange: watchable ? videoStream && videoStream.VideoRange ? videoStream.VideoRange : "SDR" : null,
        resolution: watchable ? getResolutionText({ Height, Width }) : null,
        runtime: mediaSource ? convertTicksToMillis(mediaSource.RunTimeTicks) : null,
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
const getPrimaryImage = (primary: string, ImageBlurHashes: any) => {
    return {
        tag: primary,
        hash: ImageBlurHashes ? ImageBlurHashes.Primary[primary] : null,
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
    } else if(ImageTags && ImageTags.Primary) return getPrimaryImage(ImageTags.Primary, ImageBlurHashes)

    return { tag: null, hash: null }
}

export const convert = (jellyfinItem: JellyfinItem, complex: boolean = false): Item => {
    const { Id, Name, Taglines, UserData, Type } = jellyfinItem

    let type = Type === "Series" ? "show" : Type.toLowerCase() as ItemType
    const watchable = type === "movie" || type === "episode"

    if(!VALID_TYPES.includes(type)) return null

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

        people: complex && jellyfinItem.People && jellyfinItem.People.length > 0 ? jellyfinItem.People.map(convertSimplePerson) : null,
        chapters: complex && jellyfinItem.Chapters && jellyfinItem.Chapters.length > 0 ? jellyfinItem.Chapters.map(convertChatper) : null
    }
}
export const convertGenre = (jellyfinItem: JellyfinItem): Genre => {
    return {
        id: jellyfinItem.Id,
        name: jellyfinItem.Name || UNKNOWN,
    }
}
export const convertPerson = (jellyfinItem: JellyfinItem): Person => {
    return {
        id: jellyfinItem.Id,
        name: jellyfinItem.Name || UNKNOWN,
        role: null,
        overview: jellyfinItem.Overview || UNKNOWN,
        images: {
            normal: getImageData(jellyfinItem, false),
            wide: null,
        }
    }
}
export const convertSimplePerson = (person: JellyfinPerson): Person => {
    return {
        id: person.Id,
        name: person.Name || UNKNOWN,
        role: person.Role || person.Type || UNKNOWN,
        images: {
            normal: getPrimaryImage(person.PrimaryImageTag, person.ImageBlurHashes),
            wide: null,
        },
    }
}
export const convertChatper = (chapter: JellyfinChapter): Chapter => {
    return {
        name: chapter.Name,
        start: chapter.StartPositionTicks,
        tag: chapter.ImageTag,
    }
}