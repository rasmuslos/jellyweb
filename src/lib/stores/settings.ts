import {writable} from "svelte/store";
import type {Settings} from "$lib/typings/jellyfin";
import type {Preferences} from "$lib/typings/internal/preferences";

export const settings = writable<Settings>({})
export const preferences = writable<Preferences>({
    showHeroImages: true,
    blurHeroImages: false,
    scrimBackdropImages: true,
    large: false,
    showHero: false,

    orderBy: null,
    sortOrder: null,

    theme: "dark",
    locale: "en",
    maxBitrate: -1,
})