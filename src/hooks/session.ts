import { handleSession } from "svelte-kit-cookie-session";
import {SECRET} from "$lib/env";

export async function getSession({ locals }) {
    return locals.session.data;
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