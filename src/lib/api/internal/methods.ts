import {makeRequest} from "$lib/api/internal/index";

export const login = async (server, username, password) => await makeRequest("session/login", "POST", JSON.stringify({ server, username, password }), false)