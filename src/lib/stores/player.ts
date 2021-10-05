import {writable} from "svelte/store";


export const bitrate = writable<number>(-1)

export const activeMediaSource = writable<string>(null)
export const activeAudioTrack = writable<number>(null)
export const activeSubtitleTrack = writable<number>(null)