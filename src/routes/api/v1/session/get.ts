import {getDevice, getDisplayPreferences} from "$lib/api/jellyfin";

export async function get({ locals }) {
    const session = locals.session.data
    let device, preferences

    try {
        device = await getDevice(session.active)
        preferences = await getDisplayPreferences(session.active)
    } catch (error) {}

    return {
        body: {
            session: locals.session.data,
            device,
            preferences,
        }
    }
}