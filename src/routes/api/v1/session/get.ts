import {getDevice, getDisplayPreferences} from "$lib/api/jellyfin";

export async function get({ locals }) {
    const session = locals.session.data

    return {
        body: {
            session: locals.session.data,
            device: await getDevice(session.active),
            preferences: await getDisplayPreferences(session.active),
        }
    }
}