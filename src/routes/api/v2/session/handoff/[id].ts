import {isInvalidParam} from "$lib/helper";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import {create, finishHandoff, getHandoff, getSessionData, updateHandoff} from "$lib/session";
import type {JellyfinSession} from "$lib/typings/jellyfin";

export const get = async ({ params }) => {
    const { id } = params
    if(isInvalidParam(id)) return createApiError(400, "provide id & body")

    try {
        return createApiResponse(true, getHandoff(id))
    } catch (error) {
        return createApiError(400, "handoff has expired")
    }

}

export const put = async ({ params, body, locals }) => {
    const session: JellyfinSession = locals.session.data.active
    const { id } = params
    if(isInvalidParam(id) || !body) return createApiError(400, "provide id & body")

    const {
        name,
    } = body
    if(isInvalidParam(name) || !session.userId || !session.server) return createApiError(400, "provide name")

    updateHandoff(id, name, session.userId, session.server)
    return createApiResponse(true, {})
}

export const post = async ({ params, body }) => {
    const { id } = params
    if(isInvalidParam(id) || !body) return createApiError(400, "provide id & body")

    const {
        password,
    } = body
    if(isInvalidParam(password)) return createApiError(400, "provide password")

    try {
        await finishHandoff(id, password)
        return createApiResponse(true, {})
    } catch (error) {
        return createApiError(400, "login failed")
    }
}

export const del = async ({ params, body, locals }) => {
    const { id } = params
    if(isInvalidParam(id) || !body) return createApiError(400, "provide id & body")

    const {
        secret,
    } = body
    if(isInvalidParam(secret)) return createApiError(400, "provide secret")

    const {
        server,
        userId,
        session,
        uuid,
    } = await getSessionData(id, secret)

    locals.session.data = create(locals.session.data, server, userId, session, uuid, "Handoff")

    return createApiResponse(true, {})
}