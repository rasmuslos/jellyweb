import {writable} from "svelte/store";
import {Theme} from "$lib/typings";

export const mobile = writable<boolean>(true)
export const theme = writable<Theme>(Theme.DARK)