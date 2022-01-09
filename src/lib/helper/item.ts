import type { Genre, Image, Item, SeriesInfo, Type } from "$lib/typings";
import type { JellyfinItem } from "$lib/typings/jellyfin/item";
import {getRandomIndex} from "$lib/helper/util";

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
        overview: Overview,

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
export const convertGenre = (item: JellyfinItem): Genre => {
    return {
        id: item.Id,
        name: item.Name,
    }
}

const getSeriesInfo = (type: Type, { SeriesId, SeriesName, SeasonId, SeasonName }: JellyfinItem): SeriesInfo => {
    if(type === "season") return {
        show: SeriesId,
        showName: SeriesName,
    }
    else if(type === "episode") return {
        show: SeriesId,
        showName: SeriesName,
        season: SeasonId,
        seasonName: SeasonName,
    }
    else return null
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