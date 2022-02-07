import { activeModal } from "$lib/stores";
import type {Item} from "$lib/typings";
import { get } from "svelte/store";
import SearchOverlay from "./../../components/util/SearchOverlay.svelte"

export const getRandomIndex = (arr: any[]) => Math.floor(Math.random() * arr.length)
export const getPlayedPercentage = (item: Item): number => (item.userData?.position / item.runtime) * 100

export const getIcon = ({ type }: Item) => {
    switch(type) {
        case "episode":
            return "circle"
        case "genre":
            return "list"
        case "movie":
            return "film"
        case "person":
            return "user"
        case "season":
            return "columns"
        case "series":
            return "tv"
        case "boxset":
            return "disc"
        default:
            return "alert-circle"
    }
}

export const toggleSearchModal = () => {
    if(get(activeModal)) activeModal.set(null)
    else activeModal.set(SearchOverlay)
}