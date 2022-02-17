import {createRequest} from "$lib/api/jellyfin";
import {convertItem, convertItemExtended, convertRecommendation} from "$lib/helper";
import type {SessionData as Session, Settings} from "$lib/typings";
import type {AuthenticationResponse} from "$lib/typings/jellyfin/user";

const fields = "enableUserData=true&EnableTotalRecordCount=false&Recursive=true&fields=Id,Name,Type,MediaSources,UserData,ProviderIds,Overview,Tags,Taglines,GenreItems,OfficialRating,CommunityRating,CriticRating,SeriesId,SeriesName,SeasonId,SeasonName,ImageTags,ImageBlurHashes,BackdropImageTags,ImageBlurHashes"

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
export const destroySession = async (session: Session): Promise<void> => await createRequest("Sessions/Logout", session, {
    method: "POST",
    parse: false,
})

export const getUnfinishedItems = async (session: Session) => (await createRequest(`Users/${session.id}/Items/Resume?${fields}&Limit=14`, session)).Items.map(convertItem)
export const getNextUpItems = async (session: Session) => (await createRequest(`Shows/NextUp?userId=${session.id}&${fields}&Limit=14`, session)).Items.map(convertItem)
export const getSuggestedItems = async (amount: number, session: Session) => (await createRequest(`Users/${session.id}/Suggestions?Limit=${amount}&type=Movie,Series&${fields}`, session)).Items.map(convertItem)
export const getRecommendedItems = async (session: Session) => (await createRequest(`Movies/Recommendations?userId=${session.id}&Limit=15&${fields}`, session)).map(convertRecommendation)
export const getLatestMedia = async (session: Session) => (await createRequest(`Users/${session.id}/Items/Latest?Limit=21&${fields}&includeItemTypes=Movie,Series`, session)).map(convertItem)
export const getRandomItems = async (session: Session) => (await createRequest(`Users/${session.id}/Items?SortBy=Random&Limit=1&includeItemTypes=Movie,Series&${fields}`, session)).Items.map(convertItem)
export const getBestRatedMovies = async (session: Session) => (await createRequest(`Users/${session.id}/Items?SortBy=CommunityRating&sortOrder=Descending&Limit=21&includeItemTypes=Movie&${fields}`, session)).Items.map(convertItem)

export const getGenres = async (session: Session) => (await createRequest(`Genres?userId=${session.id}&${fields}`, session)).Items.map(convertItem)

export const getExtendedItem = async (id: string, session: Session) => convertItemExtended(await createRequest(`Users/${session.id}/Items/${id}?${fields},Chapters,People,MediaSources`, session))
export const getSimilarItems = async (id: string, session: Session) => (await createRequest(`Items/${id}/Similar?${fields}&Limit=21&userId=${session.id}`, session)).Items.map(convertItem)

export const getItemsStarring = async (id: string, session: Session) => (await createRequest(`Users/${session.id}/Items?personIds=${id}&Recursive=true&EnableTotalRecordCount=false&${fields}&includeItemTypes=Movie,Series`, session)).Items.map(convertItem)
export const getEpisodesInSeason = async (showId: string, seasonId: string, session: Session) => (await createRequest(`Shows/${showId}/Episodes?SeasonId=${seasonId}&UserId=${session.id}&${fields}`, session)).Items.map(convertItem)
export const getEpisodesInSeasonExtended = async (showId: string, seasonId: string, session: Session) => (await createRequest(`Shows/${showId}/Episodes?SeasonId=${seasonId}&UserId=${session.id}&${fields},Chapters,People,MediaSources`, session)).Items.map(convertItemExtended)
export const getSeasons = async (id: string, session: Session) => (await createRequest(`Shows/${id}/Seasons?UserId=${session.id}&${fields}`, session)).Items.map(convertItem)
export const getNextUpItem = async (id: string, session: Session) => (await createRequest(`Shows/NextUp?SeriesId=${id}&UserId=${session.id}&${fields}`, session)).Items.map(convertItem)[0]

export const searchItems = async (term: string, session: Session) => (await createRequest(`Users/${session.id}/Items?searchTerm=${term}&${fields}&Limit=14&includeItemTypes=Boxset,Movie,Series,Season,Episode,Person`, session)).Items.map(convertItem)
export const searchPeople = async (term: string, session: Session) => (await createRequest(`Persons?searchTerm=${term}&${fields}&Limit=7`, session)).Items.map(convertItem)

export const queryServer = async (term: string, session: Session) => (await createRequest(`Users/${session.id}/Items?${term}&${fields}&userId=${session.id}`, session)).Items.map(convertItem)

export const getSettings = async (session: Session) => (await createRequest(`DisplayPreferences/jellyweb2?client=jellyweb&userId=${session.id}`, session)).CustomPrefs ?? {}
export const updateSettings = async (updated: Settings, session: Session) => (createRequest(`DisplayPreferences/jellyweb2?client=jellyweb&userId=${session.id}`, session, {
    method: "POST",
    body: JSON.stringify({
        "CustomPrefs": {
            ...updated,
        },

        "RememberIndexing": true,
        "PrimaryImageHeight": 0,
        "PrimaryImageWidth": 0,
        "ScrollDirection": "Horizontal",
        "ShowBackdrop": true,
        "RememberSorting": true,
        "SortOrder": "Ascending",
        "ShowSidebar": true,
        "Client": "jellyweb",

        "Id": "string",
        "ViewType": "string",
        "SortBy": "string",
        "IndexBy": "string",
    })
}))