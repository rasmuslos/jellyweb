import type {Theme} from "$lib/helper";

export type Preferences = {
    scrimBackdropImages: boolean,
    showHeroImages: boolean,
    blurHeroImages: boolean,
    large: boolean,
    showHero: boolean,

    sortOrder: string,
    orderBy: string,

    maxBitrate: number,
    locale: string,
    theme: Theme,
}