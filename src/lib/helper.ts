import {get} from "svelte/store";
import {session} from "$app/stores";
import type {Item} from "$lib/typings";

export const generateImageUrl = (id: string, tag: string, type: "Backdrop" | "Primary", maxWidth: number = null) => `${get(session).active.server}/Items/${id}/Images/${type}/?tag=${tag}${maxWidth !== null ? `&fillWidth=${maxWidth}` : ""}`
export const getLargeBackdrop = ({ BackdropImageTags, Id, SeriesId, SeriesPrimaryImageTag }: Item) =>
    BackdropImageTags && BackdropImageTags.length > 0
    ? generateImageUrl(Id, BackdropImageTags[0], `Backdrop`)
    : SeriesId && SeriesPrimaryImageTag && SeriesPrimaryImageTag.length > 0
        ? generateImageUrl(SeriesId, SeriesPrimaryImageTag[0], `Backdrop`)
        : null

// https://github.com/jellyfin/jellyfin-web/blob/38f486339f191af50215532cb86679f53efd0aec/src/components/mediainfo/mediainfo.js#L437
export const getResolutionText = ({ Height, Width }: Item) => {
    if(Width && Height) {
        if (Width >= 3800 || Height >= 2000) return "4K"
        else if (Width >= 2500 || Height >= 1400) return "1440p"
        else if (Width >= 1800 || Height >= 1000) return "1080p"
        else if (Width >= 1200 || Height >= 700) return "720p"
        else if (Width >= 700 || Height >= 400) return "480p"
    }

    return "?"
}

export const generateItemUrl = (itemId: string) => `/item/${itemId}`