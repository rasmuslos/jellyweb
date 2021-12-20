import {settings} from "$lib/stores";
import {writable} from "svelte/store";
import {compareObjects} from "$lib/helper/utils";
import {browser} from "$app/env";
import {updatePreferences, deletePreferences as deleteCustomPreferences} from "$lib/api/internal";

let last = {}

export const fallbackLocale = "en"

export const scrimBackdropImages = writable<boolean>(false)
export const showHeroImages = writable<boolean>(false)
export const blurHeroImages = writable<boolean>(false)

export const maxBitrate = writable<number>(-1)

export const lightMode = writable<boolean>(false)
export const locale = writable<string>(fallbackLocale)

export const sortOrder = writable<string>()
export const orderBy = writable<string>(null)

export const large = writable<boolean>(false)
export const showHero = writable<boolean>(false)

export const deletePreferences = async () => {
    await deleteCustomPreferences()
    settings.set({})
}
export const updatePreference = (identifier: string, value: any) => {
    settings.update(preferences => {
        preferences[identifier] = value
        last = {}
        return preferences
    })
}

export const init = () => {
    if(browser) {
        settings.subscribe(data => {
            console.log(data, last, compareObjects(data, last))
            if(!compareObjects(data, last)) updatePreferences(data)
            last = data
        })
        settings.subscribe(settings => {
            scrimBackdropImages.set(settings["images.scrim"] !== "false")
            showHeroImages.set(settings["images.hero"] !== "false")
            blurHeroImages.set(settings["images.blur"] === "true")
            maxBitrate.set(settings["bitrate"] ?? 80000000)

            lightMode.set(settings["theme"] === "light")
            locale.set(settings["locale"] ?? fallbackLocale)

            sortOrder.set(settings["sort.order"] ?? null)
            orderBy.set(settings["sort.by"] ?? null)

            large.set(settings["large"] === "true")
            showHero.set(settings["showHero"] === "true")
        })
    }
}