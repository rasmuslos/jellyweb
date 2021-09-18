import {makeRequest} from "$lib/api/internal/index";

export const login = async (server, username, password) => await makeRequest("session/login", "POST", { server, username, password }, false)
export const home = async () => await makeRequest("items/home")

export const genres = async () => await makeRequest("items/genres")
export const me = async () => await makeRequest("session/me")

export const search = async (term) => await makeRequest(`items/search?term=${term}`)

export const like = async (itemId) => await makeRequest("items/like", "POST", { itemId })
export const unlike = async (itemId) => await makeRequest("items/unlike", "DELETE", { itemId })