import type {JellyfinSession, Session} from "$lib/typings/jellyfin";

export const destroy = (session: Session): Session => {
    return {
        ...session,
        active: null,
    }
}

export const create = (session: Session, server: string, userId: string, token: string, deviceId: string, name: string): Session => {
    const active: JellyfinSession = {
        server,
        userId,
        token,
        name,
        deviceId,
    }

    if(!session) generateSessionObject(active, [])
    const old = session.active

    if(session && session.stored && session.stored.length) generateSessionObject(active, old ? [...session.stored, old] : session.stored)
    else return generateSessionObject(active, old ? [old] : [])
}
export const generateSessionObject = (active: JellyfinSession, stored: JellyfinSession[]): Session => {
    return {
        active,
        stored,
    }
}