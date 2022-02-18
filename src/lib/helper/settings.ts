import {settings} from "$lib/stores";
import {compareObjects} from "$lib/helper/utils";
import {browser} from "$app/env";
import {updatePreferences, deletePreferences as deleteCustomPreferences} from "$lib/api/internal";
import {preferences} from "$lib/stores/settings";

export const fallbackLocale = "en"

export const deletePreferences = async () => {
    await deleteCustomPreferences()
    settings.set({})
}
export const updatePreference = (identifier: string, value: any) => {
    settings.update(data => {
        const before = { ...data }
        data[identifier] = value

        if(!compareObjects(data, before)) updatePreferences(data).catch(console.error)
        return data
    })
}

export const init = () => {
    if(browser) {
        settings.subscribe(settings => {
            preferences.set({
                scrimBackdropImages: settings["images.scrim"] !== "false",
                showHeroImages: settings["images.hero"] !== "false",
                blurHeroImages: settings["images.blur"] === "true",
                large: settings["large"] === "true",
                showHero: settings["showHero"] === "true",

                sortOrder: settings["sort.order"] ?? null,
                orderBy: settings["sort.by"] ?? null,

                maxBitrate: settings["bitrate"] ?? 80000000,
                theme: settings["theme"] ?? "dark",
                locale: settings["locale"] ?? fallbackLocale,
            })
        })
    }
}