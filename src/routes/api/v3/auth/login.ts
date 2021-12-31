import type {RequestHandler} from "@sveltejs/kit";
import type {Locals} from "$lib/typings";

type Input = {
    server: string,
    username: string,
    password?: string,
}
export const post: RequestHandler<Locals, Input> = ({ body, locals }) => {
    const {} = body
}