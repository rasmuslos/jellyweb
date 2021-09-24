import {get} from "svelte/store";
import {session} from "$app/stores";
import type {Item, JellyfinSession} from "$lib/typings";
import {icons} from "feather-icons";
import {testBitrate} from "$lib/api/jellyfin";
import {bitrate} from "$lib/stores";

export const getIconByType = ({ Type }: Item) => {
    let icon = "alert-triangle"

    if(Type === "Movie") icon = "film"
    else if(Type === "Series") icon = "tv"
    else if(Type === "Person") icon = "user"
    else if(Type === "Genre") icon = "bookmark"
    else if(Type === "Episode") icon = "hash"

    return icons[icon].toSvg()
}
export const generateImageUrl = (id: string, tag: string, type: "Backdrop" | "Primary", maxWidth: number = null, scope: string = "Items") => `${get(session).active.server}/${scope}/${id}/Images/${type}/?tag=${tag}&quality=90${maxWidth !== null ? `&fillWidth=${maxWidth}` : ""}`
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

export const generateItemUrl = (itemId: string) => `/detail/${itemId}`

export const removeClass = (element, className) => {
    if(element.classList) element.classList.remove(className)
    else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ")
}
export const addClass = (element, className) => {
    if (element.classList) element.classList.add(className)
    else element.className += " " + className
}

export const padding2 = (number: number) => `0${number}`.substr(-2)
export const ticksToHumanReadable = (ticks: number, offset = 1) => {
    // * 10000 because jellyfin returns an absurdly high number
    let seconds = Math.floor(ticks / (1000 * offset))
    let hour = Math.floor((seconds / 3600) % 24)
    let minute = Math.floor((seconds / 60) % 60)
    let second = seconds % 60

    return hour === 0 ? `${padding2(minute)}:${padding2(second)}` : `${padding2(hour)}:${padding2(minute)}:${padding2(second)}`
}

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
export const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export const scrollUp = () => document.querySelector("#svelte > div") && document.querySelector("#svelte > div").scrollTo(0, 0)

export const bitrateTest = async (session: JellyfinSession) => {
    const byteSize = 5000000
    const now = new Date().getTime()

    await testBitrate(session)

    const responseTimeSeconds = (new Date().getTime() - now) / 1000;
    const bytesPerSecond = byteSize / responseTimeSeconds;
    const rate = Math.round(bytesPerSecond * 8);

    console.log("Bitrate", rate)
    bitrate.set(rate)
}