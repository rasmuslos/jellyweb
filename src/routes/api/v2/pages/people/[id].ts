import {
    getItemsBasedOnPerson,
    getPerson
} from "$lib/api/jellyfin/methods";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import {isValidParam} from "$lib/helper";

export const get = async ({ locals, params }) => {
    const session = locals.session.data.active
    const { id } = params

    if(isValidParam(id)) createApiError(400, "Include person id")
    const [person, media] = await Promise.all([getPerson(session, id), getItemsBasedOnPerson(session, id)])

    return createApiResponse(true, {
        person,
        media,
    })
}