import {createRequest} from "$lib/api/jellyfin";
import type {JellyfinSession, PlaybackInfoRequest} from "$lib/typings";

/**
 * I know that this isn't the best way to build an api. But i dont care
 * */

const includeFilterEpisode = "includeItemTypes=Movie,Episode"
const includeFilterSeries = "includeItemTypes=Movie,Series"
const includeFilterBoth = "includeItemTypes=Movie,Episode,Series"
const fields = `fields=Overview,Height,Width,SeasonName,EpisodeTitle,ParentId,ParentBackdropImageTags,Taglines`

export const authoriseUserByName = (server, username, password, deviceId, name) => createRequest("Users/AuthenticateByName", { server, deviceId, token: "", userId: null, name }, "POST", JSON.stringify({ "Username": username, "Pw": password }))

export const resume = (session: JellyfinSession) => createRequest(`Users/${session.userId}/Items/Resume?${includeFilterEpisode}&${fields}&filters=IsUnplayed`, session)
export const nextUp = (session: JellyfinSession) => createRequest(`Shows/NextUp?userId=${session.userId}&${includeFilterEpisode}&${fields}&filters=IsUnplayed`, session)

export const genres = (session: JellyfinSession) => createRequest("Genres", session)
export const me = (session: JellyfinSession) => createRequest("Users/Me", session)

export const search = (session: JellyfinSession, term: string) => createRequest(`Users/${session.userId}/Items?searchTerm=${encodeURIComponent(term)}&IncludeItemTypes=Movie,Series,Genre,Person,Episode&limit=15&&IncludeMedia=true&includePeople=true&includeGenres=true&Recursive=true&EnableTotalRecordCount=false`, session)
export const searchHints = (session: JellyfinSession) => createRequest(`Users/${session.userId}/Items?SortBy=IsFavoriteOrLiked,Random&IncludeItemTypes=Movie,Series&Limit=10&Recursive=true&EnableTotalRecordCount=false`, session)
export const searchPersons = (session: JellyfinSession, term: string) => createRequest(`Persons?searchTerm=${encodeURIComponent(term)}`, session)

export const likeItem = (session: JellyfinSession, itemId: string) => createRequest(`Users/${session.userId}/FavoriteItems/${itemId}`, session, "POST")
export const unlikeItem = (session: JellyfinSession, itemId: string) => createRequest(`Users/${session.userId}/FavoriteItems/${itemId}`, session, "DELETE")

export const getItem = (session: JellyfinSession, itemId: string) => createRequest(`Users/${session.userId}/Items/${itemId}`, session)
export const getSeasons = (session: JellyfinSession, itemId: string) => createRequest(`Shows/${itemId}/Seasons?Fields=ItemCounts,ChildCount&userId=${session.userId}`, session)
export const searchByPerson = (session: JellyfinSession, itemId: string) => createRequest(`Users/${session.userId}/Items?personIds=${itemId}&Recursive=true&EnableTotalRecordCount=false&includeItemTypes=Movie,Series`, session)
export const getEpisodesOfSeason = (session: JellyfinSession, seriesId: string, seasonId: string) => createRequest(`Shows/${seriesId}/Episodes?seasonId=${seasonId}&userId=${session.userId}&${includeFilterBoth}&${fields}`, session)
export const getSimilarItems = (session: JellyfinSession, itemId: string) => createRequest(`Items/${itemId}/Similar?limit=7&${includeFilterBoth}`, session)

export const getRandomItem = (session: JellyfinSession) => createRequest(`Users/${session.userId}/Items?SortBy=IsFavoriteOrLiked,Random&Limit=1&Recursive=true&EnableTotalRecordCount=false&${includeFilterSeries}&${fields}`, session)
export const bestRated = (session: JellyfinSession) => createRequest(`Users/${session.userId}/Items?SortBy=CommunityRating&Limit=15&Recursive=true&EnableTotalRecordCount=false&${fields}&includeItemTypes=Movie&sortOrder=Descending`, session)
export const getRecommendations = (session: JellyfinSession) => createRequest(`Movies/Recommendations?Limit=15&${fields}&${includeFilterSeries}&userId=${session.userId}`, session)

export const getDevice = (session: JellyfinSession) => createRequest(`Devices/Info?id=${session.deviceId}`, session)
export const getDisplayPreferences = (session: JellyfinSession) => createRequest(`DisplayPreferences/jellyweb?client=jellyweb&userId=${session.userId}`, session)
export const updateDisplayPreferences = (session: JellyfinSession, preferences: any) => createRequest(`DisplayPreferences/jellyweb?client=jellyweb&userId=${session.userId}`, session, "POST", JSON.stringify({ ...preferences }))

export const nextUpEpisode = (session: JellyfinSession, itemId: string) => createRequest(`Shows/NextUp?userId=${session.userId}&limit=1&seriesId=${itemId}&${fields}`, session)

export const getItemsBasedOnQuery = (session: JellyfinSession, query: string) => createRequest(`Users/${session.userId}/Items?includeGenres=true&Recursive=true&EnableTotalRecordCount=false&IncludeMedia=true&includePeople=true&${query}`, session)
export const getLatest = (session: JellyfinSession) => createRequest(`Users/${session.userId}/Items/Latest?Limit=25&${fields}`, session)

export const getBoxSets = (session: JellyfinSession) => createRequest("Library/VirtualFolders", session)
export const testBitrate = (session: JellyfinSession) => createRequest("Playback/BitrateTest", session, "GET", null, false)

export const startPlayback = (session: JellyfinSession, itemId: string, info: PlaybackInfoRequest) => createRequest(`Items/${itemId}/PlaybackInfo`, session, "POST", JSON.stringify(info))
export const stopPlayback = (session: JellyfinSession, streamId: string) => createRequest("LiveStreams/Close", session, "POST", JSON.stringify({ liveStreamId: streamId }))

export const reportPlaybackStart = (session: JellyfinSession, body: any) => createRequest("Sessions/Playing", session, "POST", JSON.stringify(body))
export const reportPlaybackStop = (session: JellyfinSession, body: any) => createRequest("Sessions/Playing/Stopped", session, "POST", JSON.stringify(body))
export const reportPlaybackProgress = (session: JellyfinSession, body: any) => createRequest("Sessions/Playing/Progress", session, "POST", JSON.stringify(body))

export const markItemAsPlayed = (session: JellyfinSession, itemId: string) => createRequest(`Users/${session.userId}/PlayedItems/${itemId}`, session, "POST")
export const markItemAsUnplayed = (session: JellyfinSession, itemId: string) => createRequest(`Users/${session.userId}/PlayedItems/${itemId}`, session, "DELETE")

export const logout = (session: JellyfinSession) => createRequest("Sessions/Logout", session)