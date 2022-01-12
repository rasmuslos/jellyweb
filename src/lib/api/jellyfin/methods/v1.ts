import {createRequest} from "$lib/api/jellyfin";
import {convertItem, convertItemExtended, convertRecommendation} from "$lib/helper";
import type {Session} from "$lib/typings";
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
export const getRecommendedItems = async (session: Session) => (await createRequest(`Movies/Recommendations?userId=${session.id}&Limit=15&${fields}`, session)).map(convertRecommendation)

export const getExtendedItem = async (id: string, session: Session) => convertItemExtended(await createRequest(`Users/${session.id}/Items/${id}?${fields},Chapters,People,MediaSources`, session))
export const getSimilarItems = async (id: string, session: Session) => (await createRequest(`Items/${id}/Similar?${fields}&limit=21`, session)).Items.map(convertItem)

export const getItemsStarring = async (id: string, session: Session) => (await createRequest(`Users/${session.id}/Items?personIds=${id}&Recursive=true&EnableTotalRecordCount=false&${fields}&includeItemTypes=Movie,Series`, session)).Items.map(convertItem)