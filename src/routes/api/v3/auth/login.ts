import type {RequestHandler} from "@sveltejs/kit";
import type {Locals} from "$lib/typings";
import {createApiError, createApiSuccess, isValidString, normaliseServer} from "$lib/helper";

type Input = {
    server: string,
    username: string,
    password?: string,
}
export const post: RequestHandler<Locals, Input> = ({ body, locals }) => {
    const {
        server,
        username,
        password,
    } = body

    if(!isValidString(server) || !isValidString(username)) return createApiError(400, "auth.login.error.missing")
    const url = normaliseServer(server)

    if(url == null) return createApiError(400, "auth.login.error.server")

    return createApiSuccess("why")
}