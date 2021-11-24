import {randomBytes} from "crypto"
import {authoriseUserByName, destroySession} from "$lib/api/jellyfin";

type Handoff = {
    start: number,
    secret: string,

    name?: string,
    userId?: string,
    avatar?: string,
    server?: string,
    uuid?: string,

    session?: string,
}
let ongoing: {
    [x: string]: Handoff
} = {}

export const createSecret = async () => randomBytes(32).toString("hex")
export const isHandoffValid = (handoff: Handoff) => handoff && handoff.start + 50000 > new Date().getTime()

export const cleanUp = async () => {
    Object.keys(ongoing).forEach(key => {
        const handoff = ongoing[key]
        if(!isHandoffValid(handoff)) destroy(key)
    })
}
export const destroy = async (hash: string, logout: boolean = true) => {
    try {
        const {
            server,
            userId,
            uuid,
            session,
        } = ongoing[hash]

        if(session && logout) await destroySession({
            server,
            userId,
            deviceId: uuid,
            token: session,
            name: "Handoff",
        })
    } catch (error) {}

    delete ongoing[hash]
}

export const getHandoff = (hash: string) => {
    const handoff: Handoff = ongoing[hash]
    if(!isHandoffValid(handoff)) throw new Error("handoff has expired")

    const { name, userId, session } = handoff
    return {
        name,
        userId,

        ready: session != null,
    }
}
export const getSessionData = async (hash: string, validate: string) => {
    const handoff = ongoing[hash]
    if(!isHandoffValid(handoff)) throw new Error("handoff has expired")

    const {
        session,
        secret,
        userId,
        server,
        uuid,
    } = handoff
    await destroy(hash, false)

    if(secret === validate) return {
        session,
        userId,
        server,
        uuid,
    }
    else throw new Error("secret is invalid, aborting")
}

export const createHandoff = async () => {
    let hash = await createSecret()
    while(ongoing[hash] != null) hash = await createSecret()

    const secret = await createSecret()

    ongoing[hash] = {
        start: new Date().getTime(),
        secret,
    }

    return {
        hash,
        secret,
    }
}
export const updateHandoff = (hash: string, name: string, userId: string, server: string) => {
    const handoff = ongoing[hash]
    if(!isHandoffValid(handoff)) throw new Error("handoff has expired")

    ongoing[hash] = {
        ...handoff,

        name,
        userId,
        server,
    }
}
export const finishHandoff = async (hash: string, password: string) => {
    const handoff: Handoff = ongoing[hash]
    if(!isHandoffValid(handoff)) throw new Error("handoff has expired")

    const {
        name,
        server,
    } = handoff
    const uuid = Date.now().toString(36) + Math.random().toString(36).substring(2)

    const { AccessToken } = await authoriseUserByName(server, name, password, uuid, "Handoff")
    ongoing[hash] = {
        ...handoff,

        uuid,
        session: AccessToken,
    }
}