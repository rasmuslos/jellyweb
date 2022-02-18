import {writable} from "svelte/store";

export const noPadding = writable<boolean>(false)
export const modal = writable(null)