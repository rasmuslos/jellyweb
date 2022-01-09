import {createRequest} from "$lib/api/jellyfin";
import { convertItem } from "$lib/helper";
import type { Session } from "$lib/typings";
import type {AuthenticationResponse} from "$lib/typings/jellyfin/user";

const fields = "enableUserData=true&fields=Id,Name,Type,MediaSources,UserData,ProviderIds,Overview,Tags,Taglines,GenreItems,OfficialRating,CommunityRating,CriticRating,SeriesId,SeriesName,SeasonId,SeasonName,ImageTags,ImageBlurHashes,BackdropImageTags,ImageBlurHashes"

export const authenticateByName = (server: string, username: string, password: string, deviceId: string): Promise<AuthenticationResponse> => createRequest("Users/AuthenticateByName", {
    server,

    device: deviceId,
    name: username,

    id: null,
    token: "",
    administrator: null,
}, {
    method: "POST",
    body: JSON.stringify({
        Username: username,
        Pw: password,
    })
})

export const getUnfinishedItems = async (session: Session) => (await createRequest(`Users/${session.id}/Items/Resume?${fields}`, session)).Items.map(convertItem)
export const getNextUpItems = async (session: Session) => (await createRequest(`Shows/NextUp?userId=${session.id}&${fields}`, session)).Items.map(convertItem)
export const getSuggestedItems = async (amount: number, session: Session) => (await createRequest(`Users/${session.id}/Suggestions?limit=${amount}&type=Movie,Series&${fields}`, session)).Items.map(convertItem)