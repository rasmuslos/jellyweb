import {createApiResponse} from "$lib/apiHelper";
import {cleanUp, createHandoff} from "$lib/session";

export const post = async () => {
    cleanUp()
    return createApiResponse(true, await createHandoff())
}