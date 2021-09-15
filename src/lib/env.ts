import {browser} from "$app/env";

export const HOST: string = import.meta.env.VITE_HOST

let SECRET
if(!browser) SECRET = process.env["COOKIE_SECRET"]

export {SECRET}
