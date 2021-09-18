import {writable} from "svelte/store";
import SearchOverlay from "../../components/search/overlay/SearchOverlay.svelte";

export const noPadding = writable<boolean>(false)
export const modal = writable(SearchOverlay) // TODO: Remove me