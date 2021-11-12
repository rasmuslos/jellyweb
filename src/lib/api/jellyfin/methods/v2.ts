import type {JellyfinSession} from "$lib/typings/jellyfin";
import {createRequest} from "$lib/api/jellyfin";
import {convert, convertGenre} from "$lib/helper";

const includeFilterEpisode = "includeItemTypes=Movie,Episode"
const includeFilterSeries = "includeItemTypes=Movie,Series"
const includeFilterBoth = "includeItemTypes=Movie,Episode,Series"
const fields = `fields=Overview,Height,Width,SeasonName,EpisodeTitle,ParentId,ParentBackdropImageTags,Taglines`

export const getUnfinishedItems = async (session: JellyfinSession) => (await createRequest(`Users/${session.userId}/Items/Resume?${includeFilterEpisode}&${fields}&filters=IsUnplayed`, session)).Items.map(convert)
export const getNextUpItems = async (session: JellyfinSession) => (await createRequest(`Shows/NextUp?userId=${session.userId}&${includeFilterEpisode}&${fields}&filters=IsUnplayed`, session)).Items.map(convert)
export const getGenres = async (session: JellyfinSession) => (await createRequest(`Genres`, session)).Items.map(convertGenre)
export const getRandomItem = async (session: JellyfinSession) => {
    const items = (await createRequest(`Users/${session.userId}/Items?SortBy=IsFavoriteOrLiked,Random&Limit=1&Recursive=true&EnableTotalRecordCount=false&${includeFilterSeries}&${fields}`, session)).Items.map(convert)

    if(items.length > 0) return items[0]
    else return null
}
export const getBestRatedItems = async (session: JellyfinSession) => (await createRequest(`Users/${session.userId}/Items?SortBy=CommunityRating&Limit=15&Recursive=true&EnableTotalRecordCount=false&${fields}&includeItemTypes=Movie&sortOrder=Descending`, session)).Items.map(convert)
export const getRecommendedItems = async (session: JellyfinSession) => {
    const items = (await createRequest(`Movies/Recommendations?Limit=15&${fields}&${includeFilterSeries}&userId=${session.userId}`, session))
    const recommended = []

    items.forEach(recommendation => {
        recommendation.Items.forEach(item => {
            if(!item.UserData || (item.UserData && (item.UserData.Played == false || item.UserData.PlayedPercentage == 100))) recommended.push(convert(item))
        })
    })

    return recommended
}
export const getLatestItems = async (session: JellyfinSession) => (await createRequest(`Users/${session.userId}/Items/Latest?Limit=25&${fields}`, session)).map(convert)

export const getGenre = async (session: JellyfinSession, genreId: string) => convertGenre(await createRequest(`Users/${session.userId}/Items/${genreId}`, session))

export const getItem = async (session: JellyfinSession, itemId: string) => convert(await createRequest(`Users/${session.userId}/Items/${itemId}`, session))
export const getNextUpItem = async (session: JellyfinSession, showId: string) => {
    const items = (await createRequest(`Shows/NextUp?userId=${session.userId}&limit=1&seriesId=${showId}&${fields}`, session)).Items

    if(items && items.length > 0) return convert(items[0])
    else return null
}

export const getSimilarItems = async (session: JellyfinSession, itemId: string) => (await createRequest(`Items/${itemId}/Similar?limit=14&${includeFilterBoth}`, session)).Items.map(convert)
export const getItemsBasedOnPerson = async (session: JellyfinSession, personId: string) => (await createRequest(`Users/${session.userId}/Items?personIds=${personId}&Recursive=true&EnableTotalRecordCount=false&includeItemTypes=${includeFilterSeries}`, session)).Items.map(convert)

export const getSeasons = async (session: JellyfinSession, showId: string) => (await createRequest(`Shows/${showId}/Seasons?Fields=ItemCounts,ChildCount&userId=${session.userId}`, session)).Items.map(convert)
export const getEpisodes = async (session: JellyfinSession, seriesId: string, seasonId: string) => (await createRequest(`Shows/${seriesId}/Episodes?seasonId=${seasonId}&userId=${session.userId}&${includeFilterBoth}&${fields}`, session)).Items.map(convert)
