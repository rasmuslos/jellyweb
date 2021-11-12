import {get} from "svelte/store";
import {session} from "$app/stores";
import type {JellyfinItem, JellyfinSession} from "$lib/typings/jellyfin";
import {browser} from "$app/env";

export const generatePlayerUrl = (itemId: string, startAt: number = 0) => `/player/${itemId}?start=${startAt}&url=${browser ? window.location.href : "/"}`
export const generateItemUrl = (itemId: string) => `/detail/${itemId}`
export const generateGenreUrl = (genreId: string) => `/genres/${genreId}`
export const generateImageUrl = (id: string, tag: string, type: "Backdrop" | "Primary", maxWidth: number = null, scope: string = "Items", maxHeight: number = null, jellyfinSession: JellyfinSession = null) => generateImageUrlIndex(id, tag, 0, type, maxWidth, scope, maxHeight, jellyfinSession)
export const generateImageUrlIndex = (id: string, tag: string, index: number, type: "Backdrop" | "Primary", maxWidth: number = null, scope: string = "Items", maxHeight: number = null, jellyfinSession: JellyfinSession = null) =>
    `${jellyfinSession ? jellyfinSession.server : get(session).active.server}/${scope}/${id}/Images/${type}/${index}?tag=${tag}&quality=90${maxWidth !== null ? `&fillWidth=${maxWidth}` : ""}${maxHeight !== null ? `&fillHeight=${maxHeight}` : ""}`

const getRandomBackdropWithHash = (id: string, tags: string[], hashes) => {
    const index = Math.floor(Math.random() * tags.length)

    return {
        url: generateImageUrlIndex(id, tags[index], index, "Backdrop"),
        hash: hashes ? hashes[tags[index]] : null
    }
}

export const getLargeBackdrop = ({ BackdropImageTags, Id, SeriesId, ParentBackdropImageTags }: JellyfinItem) => getLargeBackdropWithTag({ BackdropImageTags, Id, SeriesId, ParentBackdropImageTags, ImageBlurHashes: { Backdrop: null } }).url
export const getLargeBackdropWithTag = ({ BackdropImageTags, Id, SeriesId, ParentBackdropImageTags, ImageBlurHashes }) => {
    if(BackdropImageTags && BackdropImageTags.length > 0) return getRandomBackdropWithHash(Id, BackdropImageTags, ImageBlurHashes.Backdrop)
    else if(SeriesId && ParentBackdropImageTags && ParentBackdropImageTags.length > 0) return getRandomBackdropWithHash(SeriesId, ParentBackdropImageTags, ImageBlurHashes.Backdrop)

    return { url: null, hash: null }
}

export const getImageData = (item: JellyfinItem, wide: boolean) => {
    if(wide) return getLargeBackdropWithTag(item)
    if(item.ImageTags && item.ImageTags.Primary) return {
        url: generateImageUrl(item.Id, item.ImageTags.Primary, "Primary", 200),
        hash: item.ImageBlurHashes.Primary[item.ImageTags.Primary],
    }

    return { url: null, hash: null }
}