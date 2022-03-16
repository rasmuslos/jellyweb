import {activeModal} from "$lib/stores";
import {Item, Settings, Theme} from "$lib/typings";
import {get} from "svelte/store";
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
    if(get(activeModal)) closeModal()
    else activeModal.set(SearchOverlay)
}
export const closeModal = () => activeModal.set(null)

export const insertDefaultValues = (settings: Settings): Settings => Object.assign({
    language: "en",
    theme: Theme.DARK,
    navigationExpanded: true,
} as Settings, settings)

export const capitaliseFirst = (text: string) => text.substring(0, 1).toUpperCase() + text.substring(1)