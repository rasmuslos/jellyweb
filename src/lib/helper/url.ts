import {get} from "svelte/store";
import {session} from "$app/stores";
import type {Item, JellyfinSession} from "$lib/typings";
import {browser} from "$app/env";

export const generatePlayerUrl = (itemId: string, startAt: number = 0) => `/player/${itemId}?start=${startAt}&url=${browser ? window.location.href : "/"}`
export const generateItemUrl = (itemId: string) => `/detail/${itemId}`
export const generateImageUrl = (id: string, tag: string, type: "Backdrop" | "Primary", maxWidth: number = null, scope: string = "Items", maxHeight: number = null, jellyfinSession: JellyfinSession = null) =>
    `${jellyfinSession ? jellyfinSession.server : get(session).active.server}/${scope}/${id}/Images/${type}/?tag=${tag}&quality=90${maxWidth !== null ? `&fillWidth=${maxWidth}` : ""}${maxHeight !== null ? `&fillHeight=${maxHeight}` : ""}`
export const getLargeBackdrop = ({ BackdropImageTags, Id, SeriesId, SeriesPrimaryImageTag }: Item) =>
    BackdropImageTags && BackdropImageTags.length > 0
        ? generateImageUrl(Id, BackdropImageTags[0], `Backdrop`)
        : SeriesId && SeriesPrimaryImageTag && SeriesPrimaryImageTag.length > 0
            ? generateImageUrl(SeriesId, SeriesPrimaryImageTag[0], `Backdrop`)
            : null