import {browser} from "$app/env";

export const JWT_SECRET = !browser && process.env["JWT_SECRET"];
export const FORCED_HOST = !browser && process.env["FORCED_HOST"];

export const VERSION = import.meta.env.VITE_VERSION ?? "0.0.0"
export const DEVELOPMENT = import.meta.env.DEV