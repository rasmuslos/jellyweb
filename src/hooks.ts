import type {GetSession, Handle} from '@sveltejs/kit';
import {createApiError, JWT_SECRET} from "$lib/helper";
import type {Locals, Session} from "$lib/typings";
import {DEVELOPMENT} from "$lib/env";
import {handleSession} from "svelte-kit-cookie-session";

if(JWT_SECRET == null) throw new Error("provide JWT_SECRET")

export const getSession: GetSession<Locals> = ({ locals, headers }) => {
	return {
		data: locals.session.data,
		agent: headers["user-agent"],
	}
}
export const handle: Handle<Locals> = handleSession<Session, Locals>({
	key: "session",
	expires: 365,
	secret: JWT_SECRET,
	cookie: {
		sameSite: "lax",
	},
}, async ({ request, resolve }) => {
	try {
		const response = await resolve(request)
		return {
			...response,
			headers: {
				...response.headers
			}
		};
	} catch (error) {
		console.error("error while handling request", error)

		if(error && error.status) return createApiError(error.status, error.error ?? "unknown server error")
		return createApiError(500, DEVELOPMENT ? error : "unknown server error")
	}
})
