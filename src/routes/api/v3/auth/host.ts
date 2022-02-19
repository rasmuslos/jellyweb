import { createApiSuccess, FORCED_HOST } from "$lib/helper";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = () => createApiSuccess(FORCED_HOST)