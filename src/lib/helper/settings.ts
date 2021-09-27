import {settings} from "$lib/stores";
import {get} from "svelte/store";
import {subscribeButIgnoreFirst} from "$lib/helper/utils";
import {browser} from "$app/env";
import {deleteDisplayPreferences, updateDisplayPreferences} from "$lib/api/internal";

export const blurBackdropImages = () => get(settings)["images.blur"] !== "false"
export const showHeroImages = () => get(settings)["images.hero"] !== "false"
export const getMaxBitrate = () => get(settings)["bitrate"] ?? 80000000

if(browser) subscribeButIgnoreFirst(settings, updateDisplayPreferences)

export const deletePreferences = async () => {
    await deleteDisplayPreferences()
    settings.set({})
}
export const updatePreference = (identifier: string, value: any) => {
    settings.update(preferences => {
        preferences[identifier] = value
        return preferences
    })
}