import {createRequest} from "$lib/api/jellyfin";
import type {JellyfinSession} from "$lib/typings";

const includeFilter = "includeItemTypes=Movie,Episode"
export const authoriseUserByName = (server, username, password, deviceId) => createRequest("Users/AuthenticateByName", { server, deviceId, token: "", userId: null }, "POST", JSON.stringify({ "Username": username, "Pw": password }))

const homeFilter = `fields=Overview,Height,Width,SeasonName,EpisodeTitle,ParentId,ParentBackdropImageTags&${includeFilter}`
export const resume = (session: JellyfinSession) => createRequest(`Users/${session.userId}/Items/Resume?${homeFilter}`, session)
export const nextUp = (session: JellyfinSession) => createRequest(`Shows/NextUp?userId=${session.userId}&enableImages&${homeFilter}`, session)
export const genres = (session: JellyfinSession) => createRequest("Genres", session)
export const me = (session: JellyfinSession) => createRequest("Users/Me", session)