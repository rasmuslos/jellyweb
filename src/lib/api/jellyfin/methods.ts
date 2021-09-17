import {createRequest} from "$lib/api/jellyfin";
import type {JellyfinSession} from "$lib/typings";

export const authoriseUserByName = (server, username, password, deviceId) => createRequest("Users/AuthenticateByName", { server, deviceId, token: "", userId: null }, "POST", JSON.stringify({ "Username": username, "Pw": password }))

export const resume = (session: JellyfinSession) => createRequest(`Users/${session.userId}/Items/Resume?fields=Overview,Height,Width,SeasonName,EpisodeTitle`, session)
export const nextUp = (session: JellyfinSession) => createRequest(`Shows/NextUp?userId=${session.userId}&enableImages&fields=Overview,Height,Width,SeasonName,EpisodeTitle`, session)