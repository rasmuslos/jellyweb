import {parseSession} from "$lib/sessionHelper";

export async function get({ locals }) {
    return {
        body: parseSession(locals.session.data)
    }
}