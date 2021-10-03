import {writable} from "svelte/store";
import {browser} from "$app/env";

export const bitrate = writable<number>(-1)

export const activeMediaSource = writable<string>(null)
export const activeAudioTrack = writable<number>(null)
export const activeSubtitleTrack = writable<number>(null)

if(browser) activeSubtitleTrack.subscribe(console.log)