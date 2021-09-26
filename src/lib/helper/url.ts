import {get} from "svelte/store";
import {session} from "$app/stores";
import type {Item} from "$lib/typings";

export const generatePlayerUrl = (itemId: string, startAt: number = 0) => `/player/${itemId}?start=${startAt}`
export const generateItemUrl = (itemId: string) => `/detail/${itemId}`
export const generateImageUrl = (id: string, tag: string, type: "Backdrop" | "Primary", maxWidth: number = null, scope: string = "Items") => `${get(session).active.server}/${scope}/${id}/Images/${type}/?tag=${tag}&quality=90${maxWidth !== null ? `&fillWidth=${maxWidth}` : ""}`
export const getLargeBackdrop = ({ BackdropImageTags, Id, SeriesId, SeriesPrimaryImageTag }: Item) =>
    BackdropImageTags && BackdropImageTags.length > 0
        ? generateImageUrl(Id, BackdropImageTags[0], `Backdrop`)
        : SeriesId && SeriesPrimaryImageTag && SeriesPrimaryImageTag.length > 0
            ? generateImageUrl(SeriesId, SeriesPrimaryImageTag[0], `Backdrop`)
            : null