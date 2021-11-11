import { handleSession } from "svelte-kit-cookie-session";
import {SECRET} from "$lib/environment";
import {handleError} from "$lib/api/jellyfin";

export async function getSession({ locals }) {
    return locals.session.data;
}

export const handle = handleSession(
    {
        secret: SECRET,
        expires: 365,
        rolling: true,
    },
    async ({ request, resolve }) => {
        try {
            return await resolve(request)
        } catch(error) {
            const { status, body } = handleError(error)

            return {
                status: status,
                headers: {},
                body: JSON.stringify(body),
            }
        }
    }
)