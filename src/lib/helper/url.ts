import {get} from "svelte/store";
import {session} from "$app/stores";
import type {Item, JellyfinSession} from "$lib/typings";
import {browser} from "$app/env";

export const generatePlayerUrl = (itemId: string, startAt: number = 0) => `/player/${itemId}?start=${startAt}&url=${browser ? window.location.href : "/"}`
export const generateItemUrl = (itemId: string) => `/detail/${itemId}`
export const generateImageUrl = (id: string, tag: string, type: "Backdrop" | "Primary", maxWidth: number = null, scope: string = "Items", maxHeight: number = null, jellyfinSession: JellyfinSession = null) => generateImageUrlIndex(id, tag, 0, type, maxWidth, scope, maxHeight, jellyfinSession)
export const generateImageUrlIndex = (id: string, tag: string, index: number, type: "Backdrop" | "Primary", maxWidth: number = null, scope: string = "Items", maxHeight: number = null, jellyfinSession: JellyfinSession = null) =>
    `${jellyfinSession ? jellyfinSession.server : get(session).active.server}/${scope}/${id}/Images/${type}/${index}?tag=${tag}&quality=90${maxWidth !== null ? `&fillWidth=${maxWidth}` : ""}${maxHeight !== null ? `&fillHeight=${maxHeight}` : ""}`
const getRandomBackdrop = (id: string, tags: string[]) => {
    const index = Math.floor(Math.random() * (tags.length - 1))

    console.log(index, tags[index], generateImageUrlIndex(id, tags[index], index, "Backdrop"))

    return generateImageUrlIndex(id, tags[index], index, "Backdrop")
}
export const getLargeBackdrop = ({ BackdropImageTags, Id, SeriesId, ParentBackdropImageTags }: Item) => {
    if(BackdropImageTags && BackdropImageTags.length > 0) return getRandomBackdrop(Id, BackdropImageTags)
    else if(SeriesId && ParentBackdropImageTags && ParentBackdropImageTags.length > 0) return getRandomBackdrop(SeriesId, ParentBackdropImageTags)

    return null
}