import { handleSession } from "svelte-kit-cookie-session";
import {SECRET} from "$lib/env";
import {parseSession} from "$lib/sessionHelper";

export async function getSession({ locals }) {
    return parseSession(locals.session.data);
}

export const handle = handleSession(
    {
        secret: SECRET,
        expires: 365,
    },
    ({ request, resolve }) => {
        return resolve(request);
    }
)