import {requestResource} from "$lib/api/internal";
import type {ExtendedItem, Item, PageIndex} from "$lib/typings";

export const performLogin = (server: string, username: string, password: string) => requestResource<any>("auth/login", {
    method: "POST",
    body: {
        server,
        username,
        password,
    },
})

export const getHomeItems = () => requestResource<PageIndex>("pages/home")

export const getExtendedItem = (id: string) => requestResource<ExtendedItem>(`items/${id}/extended`)
export const getSimilarItems = (id: string) => requestResource<Item[]>(`items/${id}/similar`)
export const getItemsStarring = (id: string) => requestResource<Item[]>(`items/${id}/starring`)