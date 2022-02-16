import { browser } from "$app/env";
import { getSettings, updateSettings } from "$lib/api/internal/methods/v3";
import { navigationExpanded as navigationExpandedStore, settings, theme as themeStore } from "$lib/stores"
import { Settings, Theme } from "$lib/typings";
import equal from "fast-deep-equal/es6"
import { locale } from "svelte-i18n";

let registered = false
let current: Settings

export const insertDefaultValues = (settings: Settings): Settings => Object.assign({
    language: "en",
    theme: Theme.DARK,
} as Settings, settings)
const runUpdate = (updated: Settings) => {
    const { theme, language, navigationExpanded } = updated
    current = {...updated}

    locale.set(language)
    
    themeStore.set(theme)
    navigationExpandedStore.set(navigationExpanded)
}

export const loadSettings = async () => {
    if(registered) return
    registered = true

    current = await getSettings()
    settings.set({...current})
    
    if(!browser) return

    settings.subscribe(updated => {
        if(!equal(current, updated)) {
            updateSettings(updated).catch(error => console.error("Error while updating settings", error))
            runUpdate(updated)
        }
    })
}
export const update = (key: string, value: any) => {
    settings.update(settings => {
        if(!settings) return

        // @ts-ignore
        settings[key] = value
        return settings
    })
}

export const setTheme = (theme: Theme) => update("theme", theme)
export const setLanguage = (language: string) => update("language", language)
export const setNavigationExpanded = (expanded: boolean) => update("navigationExpanded", expanded)