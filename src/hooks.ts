import { handleSession } from "svelte-kit-cookie-session";
import {SECRET} from "$lib/environment";
import {handleError as handleApiError} from "$lib/api/jellyfin";
import type {Session} from "$lib/typings/jellyfin";

export async function getSession({ locals }) {
    return locals.session.data
}

export const handle = handleSession<Session>(
    {
        secret: SECRET,
        expires: 365,
        key: "session",
    },
    async ({ request, resolve }) => {
        try {
            return await resolve(request)
        } catch(error) {
            console.log("error", error)
            const { status, body } = handleApiError(error)

            return {
                status: status,
                headers: {},
                body: JSON.stringify(body),
            }
        }
    }
)