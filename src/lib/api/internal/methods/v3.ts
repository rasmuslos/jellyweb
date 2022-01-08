import {requestResource} from "$lib/api/internal";
import type { PageIndex } from "$lib/typings";

export const performLogin = (server: string, username: string, password: string) => requestResource<any>("auth/login", {
    method: "POST",
    body: {
        server,
        username,
        password,
    },
})

export const getHomeItems = () => requestResource<PageIndex>("pages/home")