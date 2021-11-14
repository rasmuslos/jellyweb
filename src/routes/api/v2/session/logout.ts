import {createApiResponse} from "$lib/apiHelper";

export async function del({ locals }) {
    locals.session.data = {
        ...locals.session.data,
        active: null,
    }

    return createApiResponse(true, locals.session.data)
}