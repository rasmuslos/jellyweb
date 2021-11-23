import {createRequest} from "$lib/api/internal";
import type {PlaybackInfoRequest} from "$lib/typings/jellyfin";

/**
 * API V2
 */

export const getHomeItems = async () => await createRequest("pages/home")
export const getGenres = async () => await createRequest("pages/genres")

export const getGenre = async genreId => await createRequest(`pages/genres/${genreId}`)
export const getPerson = async personId => await createRequest(`pages/people/${personId}`)
export const getItem = async (itemId, complex: boolean = false) => await createRequest(`pages/detail/${itemId}?complex=${complex}`)
export const getEpisodes = async (seasonId: string, showId: string) => await createRequest(`items/${seasonId}/${showId}/episodes`)

export const getSearchHints = async () => await createRequest("pages/search/hints")
export const searchItems = async term => await createRequest(`pages/search?term=${encodeURIComponent(term)}`)

export const getItemsByQuery = async (term: string) => await createRequest(`items/query?term=${encodeURIComponent(term)}`)
export const getJellyfinItem = async (itemId: string) => await createRequest(`items/jellyfin/${itemId}`)

export const getHostUrl = async () => await createRequest("session/host")
export const createHandoff = async () => await createRequest("session/handoff", {
    method: "POST",
})

export const getMe = async (handleLoginError: boolean = true) => await createRequest("session/me", {
    handleLoginError,
})
export const logout = async () => await createRequest("session/logout", {
    method: "DELETE",
    handleLoginError: false,
})
export const authoriseUserByName = async (server, username, password, name) => await createRequest("session/login", {
    method: "POST",
    body: {
        server,
        username,
        password,
        name,
    },
    handleLoginError: true,
})

export const markItemAsFavorite = async (itemId: string) => await createRequest(`items/${itemId}/favorite`, {
    method: "GET",
})
export const markItemAsUnFavorite = async (itemId: string) => await createRequest(`items/${itemId}/favorite`, {
    method: "DELETE",
})

export const markItemAsWatched = async (itemId: string) => await createRequest(`items/${itemId}/watched`, {
    method: "GET",
})
export const markItemAsUnWatched = async (itemId: string) => await createRequest(`items/${itemId}/watched`, {
    method: "DELETE",
})

export const getPreferences = async () => await createRequest("session/preferences", {
    method: "GET",
    handleLoginError: false,
})
export const deletePreferences = async () => await createRequest("session/preferences", {
    method: "DELETE",
})
export const updatePreferences = async (preferences) => await createRequest("session/preferences", {
    method: "POST",
    body: {
        preferences
    },
})

export const startPlayback = async (itemId: string, info: PlaybackInfoRequest) => await createRequest(`items/${itemId}/play`, {
    method: "POST",
    body: {
        info,
    }
})
export const stopPlayback = async (streamId: string) => await createRequest(`items/${streamId}/play`, {
    method: "DELETE"
})

export const reportPlaybackStart = async body => await createRequest("playback", {
    method: "POST",
    body,
})
export const reportPlaybackProgress = async body => await createRequest("playback", {
    method: "PUT",
    body,
})
export const reportPlaybackStop = async body => await createRequest("playback", {
    method: "DELETE",
    body,
})