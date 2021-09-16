import {browser} from "$app/env";

let SECRET
if(!browser) SECRET = process.env["COOKIE_SECRET"]

export {SECRET}
