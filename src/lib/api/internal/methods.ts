import {makeRequest} from "$lib/api/internal/index";
import type {PlaybackInfoRequest} from "$lib/typings";

export const login = async (server, username, password) => await makeRequest("session/login", "POST", { server, username, password }, false)
export const home = async () => await makeRequest("items/home")

export const genres = async () => await makeRequest("items/genres")
export const me = async (handleLoginError: boolean = false) => await makeRequest("session/me", "GET", null, handleLoginError)

export const search = async (term) => await makeRequest(`items/search?term=${term}`)
export const searchHints = async () => await makeRequest(`items/search/hints`)

export const like = async (itemId) => await makeRequest("items/like", "POST", { itemId })
export const unlike = async (itemId) => await makeRequest("items/unlike", "DELETE", { itemId })

export const getItem = async (itemId, complex: boolean = false) => await makeRequest(`items/${itemId}?complex=${complex}`)
export const getItemsByPerson = async (personId) => await makeRequest(`items/person/${personId}`)

export const getDisplayPreferences = async (handleLoginError: boolean = false) => (await makeRequest("session/preferences", "GET", null, handleLoginError)).CustomPrefs
export const updateDisplayPreferences = async (preferences) => await makeRequest("session/preferences", "POST", { preferences })
export const deleteDisplayPreferences = async () => await makeRequest("session/preferences", "DELETE", {})

export const getItemsBasedOnQuery = async (query: string) => await makeRequest(`items/query?query=${encodeURIComponent(query)}`)
export const getLatest = async () => await makeRequest("items/latest")

export const getBoxSets = async () => await makeRequest("library/sets")

export const getHostUrl = async () => await makeRequest("session/host")

export const startPlayback = async (itemId: string, info: PlaybackInfoRequest) => await makeRequest(`items/play/${itemId}`, "POST", { info })
export const stopPlayback = async (streamId: string) => await makeRequest(`items/play/${streamId}`, "DELETE")