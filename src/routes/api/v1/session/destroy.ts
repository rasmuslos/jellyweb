import {logout} from "$lib/api/jellyfin";

export async function del({ locals }) {
    if(locals.session.data.active) logout(locals.session.data.active).catch(error => console.error("Cannot logout of session", error))
    locals.session.data = {
        ...locals.session.data,
        active: null,
    }

    return {
        body: {
            ok: locals.session.data.active,
        },
    }
}