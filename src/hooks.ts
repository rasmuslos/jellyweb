import type {GetSession, Handle, RequestHandler} from '@sveltejs/kit';
import {createApiError, JWT_SECRET} from "$lib/helper";
import {DEVELOPMENT} from "$lib/env";
import {handleSession} from "svelte-kit-cookie-session";
import "./app.d.ts"

if(JWT_SECRET == null) throw new Error("provide JWT_SECRET")

export const getSession: GetSession = ({ locals, request }) => {
	return {
		data: locals.session.data,
		destroy: null,
		agent: request.headers.get("user-agent"),
	}
}
export const handle: Handle = handleSession({
	key: "session",
	expires: 365,
	secret: JWT_SECRET,
	cookie: {
		sameSite: "lax",
	},
}, <Handle>(async ({ resolve, event }): Promise<Response> => {
	try {
		return await resolve(event)
	} catch (error) {
		console.error("error while handling request", error)

		let response
		if(!!(error && error.status)) response = createApiError(error.status, error.error ?? "unknown server error")
		else response =  createApiError(500, DEVELOPMENT ? error.toString() : "unknown server error")

		return new Response(response.body as any, {
			status: response.status,
			headers: response.headers as Headers,
		})
	}
}))
