import {makeRequest} from "$lib/api/internal/index";

export const login = async (server, username, password) => await makeRequest("session/login", "POST", JSON.stringify({ server, username, password }), false)
export const home = async () => await makeRequest("items/home")

export const genres = async () => await makeRequest("items/genres")