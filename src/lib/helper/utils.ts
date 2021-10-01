import type {Item, JellyfinSession} from "$lib/typings";
import {icons} from "feather-icons";
import {testBitrate} from "$lib/api/jellyfin";
import {bitrate} from "$lib/stores";

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
            if(Object.keys(state).length === 0) return
        } catch(error) {}

        if(state == {}) return
        else if(first) first = false
        else callback(state)
    })
}