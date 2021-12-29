import type {GetSession, Handle} from '@sveltejs/kit';
import {JWT_SECRET} from "$lib/helper";
import type {Locals} from "$lib/typings";
import {verify} from "$lib/session";

if(JWT_SECRET == null) throw new Error("provide JWT_SECRET")

export const getSession: GetSession<Locals> = (request) => {
	return {
		data: request.locals.session,
		agent: request.headers["user-agent"],
	}
}
export const handle: Handle<Locals> = async ({ request, resolve }) => {
	try {
		request.locals.session = verify(null)
	} catch (error) {
		request.locals.session = null
	}

	try {
		const response = await resolve(request);
		return {
			...response,
			headers: {
				...response.headers
			}
		};
	} catch (error) {
		return {
			headers: {},
			status: 500,
			body: "yikes",
		}
	}
};
