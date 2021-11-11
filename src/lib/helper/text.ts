// https://github.com/jellyfin/jellyfin-web/blob/38f486339f191af50215532cb86679f53efd0aec/src/components/mediainfo/mediainfo.js#L437
import type {JellyfinItem} from "$lib/typings/jellyfin";

export const getResolutionText = ({ Height, Width }: JellyfinItem) => {
    if(Width && Height) {
        if (Width >= 3800 || Height >= 2000) return "4K"
        else if (Width >= 2500 || Height >= 1400) return "1440p"
        else if (Width >= 1800 || Height >= 1000) return "1080p"
        else if (Width >= 1200 || Height >= 700) return "720p"
        else if (Width >= 700 || Height >= 400) return "480p"
    }

    return "?"
}

export const padding2 = (number: number) => `0${number}`.substr(-2)
export const ticksToHumanReadable = (ticks: number, offset = 1) => {
    // * 10000 because jellyfin returns an absurdly high number
    let seconds = Math.floor(ticks / (1000 * offset))
    let hour = Math.floor((seconds / 3600) % 24)
    let minute = Math.floor((seconds / 60) % 60)
    let second = seconds % 60

    return hour === 0 ? `${padding2(minute)}:${padding2(second)}` : `${padding2(hour)}:${padding2(minute)}:${padding2(second)}`
}