// https://github.com/jellyfin/jellyfin-web/blob/38f486339f191af50215532cb86679f53efd0aec/src/components/mediainfo/mediainfo.js#L437
import type {JellyfinItem} from "$lib/typings/jellyfin";

export const getResolutionText = ({ Height, Width }: { Height: number, Width: number }) => {
    if(Width && Height) {
        if (Width >= 3800 || Height >= 2000) return "4K"
        else if (Width >= 2500 || Height >= 1400) return "QHD"
        else if (Width >= 1800 || Height >= 1000) return "FHD"
        else if (Width >= 1200 || Height >= 700) return "HD"
        else if (Width >= 700 || Height >= 400) return "SD"
    }

    return "?"
}

export const padding2 = (number: number) => `0${number}`.substr(-2)
export const ticksToHumanReadable = (ticks: number, offset = 1) => {
    let seconds = Math.floor(ticks / (1000 * offset))
    let hour = Math.floor((seconds / 3600) % 24)
    let minute = Math.floor((seconds / 60) % 60)
    let second = seconds % 60

    return hour === 0 ? `${padding2(minute)}:${padding2(second)}` : `${padding2(hour)}:${padding2(minute)}:${padding2(second)}`
}