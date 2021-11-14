import {
    getItemsBasedOnPerson,
    getPerson
} from "$lib/api/jellyfin/methods/v2";
import {createApiError, createApiResponse} from "$lib/apiHelper";

export const get = async ({ locals, params }) => {
    const session = locals.session.data.active
    const { id } = params

    if(id === null || id === "" || id == "null") createApiError(400, "Include person id")
    const [person, media] = await Promise.all([getPerson(session, id), getItemsBasedOnPerson(session, id)])

    return createApiResponse(true, {
        person,
        media,
    })
}