import {session} from "$app/stores";
import {get} from "svelte/store";

export const wrap = (url: string): string => `${get(session).data.server}/${url}`

export const applyHeight = (url: string, height: number): string => `${url}&fillHeight=${height}`
export const applyWidth = (url: string, width: number): string => `${url}&fillWidth=${width}`

export const applyMaxHeight = (url: string, height: number): string => `${url}&maxHeight=${height}`
export const applyMaxWidth = (url: string, width: number): string => `${url}&maxWidth=${width}`

export const hash = (value: string) => {
    let hash = 5381, i = value.length
    while(i) hash = (hash * 33) ^ value.charCodeAt(--i)

    return hash >>> 0
}
export const getFallbackGradient = (text: string) => {
    const hashed = hash(text)
    return `background-image: linear-gradient(${hashed % 360}deg, hsl(${hashed % 360}, 95%, 50%), hsl(${hashed + 120 % 360}, 95%, 50%))`
}