import {HOST} from "$lib/environment";
import {createApiResponse} from "$lib/apiHelper";

export async function get({}) {
    return createApiResponse(true, HOST)
}