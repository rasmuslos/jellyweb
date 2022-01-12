import type {
    Chapter,
    ExtendedItem,
    Genre,
    Image,
    Item,
    MediaSource,
    Person,
    Recommendation,
    SeriesInfo,
    Type
} from "$lib/typings";
import type {JellyfinItem, RecommendationCategory} from "$lib/typings/jellyfin/item";
import {getRandomIndex} from "$lib/helper/util";
import {RecommendationReason} from "$lib/typings";

export const convertToMillis = (ticks: number) => ticks / 10000
export const convertItem = (item: JellyfinItem): Item => {
    const {
        Id, Name, Type,
        MediaSources, UserData, ProviderIds,
        Overview, Tags, Taglines, GenreItems,
        OfficialRating, CommunityRating, CriticRating,
    } = item
    
    const type: Type = Type.toLowerCase() as unknown as Type

    return {
        id: Id,
        name: Name,
        type: type,
        overview: Overview ?? "?",

        tags: Tags,
        tagline: Taglines?.[0],
        genres: GenreItems?.map(convertGenre),

        images: {
            primary: getPrimaryImage(item),
            backdrop: getBackdropImage(item),
        },
        externalIds: {
            imdb: ProviderIds?.Imdb,
        },

        seriesInfo: getSeriesInfo(type, item),
        runtime: convertToMillis(MediaSources?.[0].RunTimeTicks),

        rating: OfficialRating,
        ratings: {
            critic: CriticRating,
            audience: CommunityRating,
        },

        userData: {
            favorite: UserData?.IsFavorite ?? false,
            watched: UserData?.Played ?? false,
            position: convertToMillis(UserData?.PlaybackPositionTicks ?? 0)
        }
    }
}
export const convertItemExtended = (item: JellyfinItem): ExtendedItem => {
    return {
        ...convertItem(item),
        chapters: convertChapters(item),
        people: convertPeople(item),
        mediaSources: getMediaSources(item)
    }
}

export const convertChapters = ({ Id, Chapters }: JellyfinItem): Chapter[] => {
    return Chapters?.map(({ Name, StartPositionTicks, ImageTag }, index) => {
        return {
            name: Name,
            start: convertToMillis(StartPositionTicks),
            image: {
                url: `Items/${Id}/Images/Chapter/${index}?tag=${ImageTag}`,
                hash: null,
            }
        }
    })
}
export const convertPeople = ({ People }: JellyfinItem): Person[] => {
    return People?.map(({ Id, Name, Type, Role, PrimaryImageTag, ImageBlurHashes }) => {
        return {
            id: Id,
            name: Name,
            role: Role ?? Type ?? "?",
            image: getPrimaryPersonImage(Id, PrimaryImageTag, ImageBlurHashes),
        }
    })
}
export const convertGenre = ({ Id, Name }: JellyfinItem): Genre => {
    return {
        id: Id,
        name: Name,
    }
}

const getMediaSources = ({ MediaSources }: JellyfinItem): MediaSource[] => {
    return MediaSources?.map(({ Id, Container, RunTimeTicks, Bitrate, MediaStreams }) => {
        return {
            id: Id,
            container: Container,
            runtime: convertToMillis(RunTimeTicks),
            bitrate: Bitrate,
            mediaStreams: MediaStreams.map(({ Codec, Type, VideoRange, DisplayTitle, Language }) => {
                return {
                    codec: Codec,
                    type: Type.toLowerCase(),
                    range: VideoRange?.toLowerCase(),
                    title: DisplayTitle,
                    language: Language,
                }
            }),
        }
    })
}
const getSeriesInfo = (type: Type, item: JellyfinItem): SeriesInfo => {
    const { SeriesId, SeriesName, SeasonId, SeasonName } = item

    if(type === "season") return {
        show: SeriesId,
        showName: SeriesName,
        primaryImage: getShowPrimaryImage(item),
    }
    else if(type === "episode") return {
        show: SeriesId,
        showName: SeriesName,
        season: SeasonId,
        seasonName: SeasonName,
        primaryImage: getShowPrimaryImage(item),
    }
    else return null
}

const getShowPrimaryImage = ({ SeriesId, SeriesPrimaryImageTag, ImageBlurHashes }: JellyfinItem): Image => {
    const index = 0

    return {
        url: `Items/${SeriesId}/Images/Primary/${index}`,
        hash: ImageBlurHashes?.Primary?.[SeriesPrimaryImageTag],
    }
}
const getPrimaryPersonImage = (id: string, primaryImageTag: string, imageBlurHashes: any): Image => {
    return {
        url: `Items/${id}/Images/Primary/0?tag=${primaryImageTag}`,
        hash: imageBlurHashes?.[primaryImageTag],
    }
}
const getPrimaryImage = ({ Id, ImageTags, ImageBlurHashes }: JellyfinItem): Image => {
    const index = 0
    const tag: string = ImageTags?.Primary

    return {
        url: `Items/${Id}/Images/Primary/${index}?tag=${tag}`,
        hash: ImageBlurHashes?.Primary?.[tag],
    }
}
const getBackdropImage = ({ Id, BackdropImageTags, ImageBlurHashes, SeriesId, ParentBackdropImageTags }: JellyfinItem): Image => {
    if(BackdropImageTags.length) {
        const index = getRandomIndex(BackdropImageTags)
        const tag: string = BackdropImageTags?.[index]
        return {
            url: `Items/${Id}/Images/Backdrop/${index}?tag=${tag}`,
            hash: ImageBlurHashes?.Backdrop?.[tag],
        }
    } else if(SeriesId && ParentBackdropImageTags && ParentBackdropImageTags.length) {
        const index = getRandomIndex(ParentBackdropImageTags)
        const tag: string = ParentBackdropImageTags?.[index]
        return {
            url: `Items/${SeriesId}/Images/Backdrop/${index}?tag=${tag}`,
            hash: ImageBlurHashes?.Backdrop?.[tag],
        }
    }
}

const getReason = (reason: RecommendationCategory): RecommendationReason => RecommendationReason[reason]
export const convertRecommendation = ({ RecommendationType, BaselineItemName, Items }: any): Recommendation => {
    return {
        reason: getReason(RecommendationType),
        title: BaselineItemName,
        items: Items.map(convertItem),
    }
}

export const getVideoRange = (item: ExtendedItem): "hdr" | "sdr" => {
    return item.mediaSources?.[0].mediaStreams?.find(({ range }) => range != null)?.range as any
}