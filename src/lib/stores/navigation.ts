import {writable} from "svelte/store";

// TODO: persist
export const navigationExpanded = writable<boolean>(false)