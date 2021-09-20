import {createRequest} from "$lib/api/jellyfin";
import type {JellyfinSession} from "$lib/typings";

/**
 * I know that this isn't the best way to build an api. But i dont care
 * */

const includeFilter = "includeItemTypes=Movie,Episode"
const fields = `fields=Overview,Height,Width,SeasonName,EpisodeTitle,ParentId,ParentBackdropImageTags`

export const authoriseUserByName = (server, username, password, deviceId) => createRequest("Users/AuthenticateByName", { server, deviceId, token: "", userId: null }, "POST", JSON.stringify({ "Username": username, "Pw": password }))

export const resume = (session: JellyfinSession) => createRequest(`Users/${session.userId}/Items/Resume?${includeFilter}&${fields}`, session)
export const nextUp = (session: JellyfinSession) => createRequest(`Shows/NextUp?userId=${session.userId}&enableImages&$${includeFilter}&{homeFilter}`, session)

export const genres = (session: JellyfinSession) => createRequest("Genres", session)
export const me = (session: JellyfinSession) => createRequest("Users/Me", session)

export const search = (session: JellyfinSession, term: string) => createRequest(`Users/${session.userId}/Items?searchTerm=${encodeURIComponent(term)}&IncludeItemTypes=Movie,Series,Genre,Person,Episode&limit=15&&IncludeMedia=true&includePeople=true&includeGenres=true&Recursive=true&EnableTotalRecordCount=false`, session)
export const searchHints = (session: JellyfinSession) => createRequest(`Users/${session.userId}/Items?SortBy=IsFavoriteOrLiked,Random&IncludeItemTypes=Movie,Series&Limit=10&Recursive=true&EnableTotalRecordCount=false`, session)
export const searchPersons = (session: JellyfinSession, term: string) => createRequest(`Persons?searchTerm=${encodeURIComponent(term)}`, session)

export const likeItem = (session: JellyfinSession, itemId: string) => createRequest(`Users/${session.userId}/FavoriteItems/${itemId}`, session, "POST")
export const unlikeItem = (session: JellyfinSession, itemId: string) => createRequest(`Users/${session.userId}/FavoriteItems/${itemId}`, session, "DELETE")

export const getItem = (session: JellyfinSession, itemId: string) => createRequest(`Users/${session.userId}/Items/${itemId}`, session)
export const getSeasons = (session: JellyfinSession, itemId: string) => createRequest(`Shows/${itemId}/Seasons?&Fields=ItemCounts`, session)
export const searchByPerson = (session: JellyfinSession, itemId: string) => createRequest(`Users/${session.userId}/Items?personIds=${itemId}&Recursive=true&EnableTotalRecordCount=false&includeItemTypes=Movie,Series`, session)
export const getEpisodesOfSeason = (session: JellyfinSession, seriesId: string, seasonId: string) => createRequest(`Shows/${seriesId}/Episodes?seasonId=${seasonId}&${fields}`, session)
export const getSimilarItems = (session: JellyfinSession, itemId: string) => createRequest(`Items/${itemId}/Similar?limit=7`, session)

export const getRandomItem = (session: JellyfinSession) => createRequest(`Users/${session.userId}/Items?SortBy=IsFavoriteOrLiked,Random&Limit=1&Recursive=true&EnableTotalRecordCount=false&${fields}&includeItemTypes=Movie,Series`, session)
export const bestRated = (session: JellyfinSession) => createRequest(`Users/${session.userId}/Items?SortBy=CommunityRating&Limit=15&Recursive=true&EnableTotalRecordCount=false&${fields}&includeItemTypes=Movie&sortOrder=Descending`, session)
export const getRecommendations = (session: JellyfinSession) => createRequest(`Movies/Recommendations?Limit=15&${fields}&userId=${session.userId}`, session)

export const getDevice = (session: JellyfinSession) => createRequest(`Devices/Info?id=${session.deviceId}`, session)
export const getDisplayPreferences = (session: JellyfinSession) => createRequest(`DisplayPreferences/jellyweb?client=jellyweb&userId=${session.userId}`, session)
export const updateDisplayPreferences = (session: JellyfinSession, preferences: any) => createRequest(`DisplayPreferences/jellyweb?client=jellyweb&userId=${session.userId}`, session, "POST", JSON.stringify({ ...preferences }))

export const nextUpEpisode = (session: JellyfinSession, itemId: string) => createRequest(`Shows/NextUp?userId=${session.userId}&limit=1&seriesId=${itemId}&${fields}`, session)