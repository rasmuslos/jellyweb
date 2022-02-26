import {writable} from "svelte/store";

export const activeModal = writable<any>(null)
export const currentItemId = writable<string>(null)
export const currentExpandedItemId = writable<string>(null)