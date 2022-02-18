import {writable} from "svelte/store"
import type {Source} from "$lib/typings/internal";
import type {BITRATES} from "$lib/typings/internal";

export const bitrate = writable<typeof BITRATES[number]>(80000000)
export const source = writable<Source>(null)