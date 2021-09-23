import {browser} from "$app/env";

let SECRET
let HOST

if(!browser) {
    SECRET = process.env["COOKIE_SECRET"]
    HOST = process.env["HOST"] ?? ""
}

export {SECRET, HOST}
