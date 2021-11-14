import {createApiResponse} from "$lib/apiHelper";
import {HOST} from "$lib/environment";

export const get = async () => {
    return createApiResponse(true, HOST)
}