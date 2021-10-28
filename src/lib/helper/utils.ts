import type {Item, JellyfinSession} from "$lib/typings";
import {icons} from "feather-icons";
import {testBitrate} from "$lib/api/jellyfin";
import {bitrate} from "$lib/stores";
import {browser} from "$app/env";

export const getIconByType = ({ Type }: Item) => {
    let icon = "alert-triangle"

    if(Type === "Movie") icon = "film"
    else if(Type === "Series") icon = "tv"
    else if(Type === "Person") icon = "user"
    else if(Type === "Genre") icon = "bookmark"
    else if(Type === "Episode") icon = "hash"

    return icons[icon].toSvg()
}

export const removeClass = (element, className) => {
    if(element.classList) element.classList.remove(className)
    else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ")
}
export const addClass = (element, className) => {
    if (element.classList) element.classList.add(className)
    else element.className += " " + className
}

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
export const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
export const scrollUp = () => document.querySelector("#svelte > div") && document.querySelector("#svelte > div").scrollTo(0, 0)
export const bitrateTest = async (session: JellyfinSession) => {
    const byteSize = 5000000
    const now = new Date().getTime()

    await testBitrate(session)

    const responseTimeSeconds = (new Date().getTime() - now) / 1000;
    const bytesPerSecond = byteSize / responseTimeSeconds;
    const rate = Math.round(bytesPerSecond * 8);

    console.log("Bitrate", rate)
    bitrate.set(rate)
}
export const subscribeButIgnoreFirst = (store, callback) => {
    let first: boolean = true

    return store.subscribe(state => {
        try {
            if(typeof state === "object" && Object.keys(state).length === 0) return
        } catch(error) {}

        if(state == {}) return
        else if(first) first = false
        else callback(state)
    })
}

export const getBrowserName = () => {
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1 ) return "Opera"
    else if(navigator.userAgent.indexOf("Chrome") != -1 ) return "Chrome"
    else if(navigator.userAgent.indexOf("Safari") != -1) return "Safari"
    else if(navigator.userAgent.indexOf("Firefox") != -1 ) return "Firefox"
    // @ts-ignore
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) return "IE"
    else return "Unknown"
}

type osTypes = "Mac OS" | "iOS" | "Windows" | "Android" | "Linux" | "unknown"
export const getOS = (): osTypes => {
    if(!browser) return "unknown"

    const userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
        windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
        iosPlatforms = ["iPhone", "iPad", "iPod"]
    let os: osTypes = "unknown"

    if(macosPlatforms.indexOf(platform) !== -1) os = "Mac OS"
    else if(iosPlatforms.indexOf(platform) !== -1) os = "iOS"
    else if(windowsPlatforms.indexOf(platform) !== -1) os = "Windows"
    else if(/Android/.test(userAgent)) os = "Android"
    else if(/Linux/.test(platform)) os = "Linux"

    return os
}

export const changeScrollDirection = (event: WheelEvent, element: HTMLElement) => {
    if(event.deltaX !== 0) return

    // @ts-ignore
    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)))
    const scrollSpeed = 40

    element.scrollLeft -= (delta * scrollSpeed)
    event.preventDefault()
}