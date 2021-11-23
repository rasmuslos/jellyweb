import {createApiResponse} from "$lib/apiHelper";
import {createHandoff} from "$lib/session";

export const post = async ({ body }) => {
    return createApiResponse(true, await createHandoff())
}