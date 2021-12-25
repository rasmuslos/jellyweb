import type {JellyfinItem} from "$lib/typings/jellyfin";
import {get} from "svelte/store";
import {reportPlaybackProgress, reportPlaybackStart, reportPlaybackStop} from "$lib/api/internal";

export const getMediaData = (item: JellyfinItem, update: boolean = false) => {
    return
    /*

    // Get media-sources & streams
    let mediaSources = item.MediaSources
    if(update) activeMediaSource.set(mediaSources[0].Id)

    let mediaSource = mediaSources.find(source => source.Id === get(activeMediaSource))

    if(update) {
        activeAudioTrack.set(mediaSource.DefaultAudioStreamIndex)
        activeSubtitleTrack.set(mediaSource.DefaultSubtitleStreamIndex || -1)
    }

    let audioStreams = mediaSource.MediaStreams.filter(stream => stream.Type === "Audio")
    let subtitleStreams = mediaSource.MediaStreams.filter(stream => stream.Type === "Subtitle")

    // @ts-ignore
    subtitleStreams.push({ Title: "none", Index: -1 })

    return {
        mediaSources,
        audioStreams,
        subtitleStreams,
    }
     */
}

export const isTranscoding = (url: string) => getTranscodingReasons(url)
export const getTranscodingReasons = (url: string) => {
    try {
        const parsed = new URL(url)
        const reason = parsed.searchParams.get("TranscodeReasons")

        if(!reason) return false
        return reason.split(",").join(", ")
    } catch (error) {
        return "INVALID URL"
    }
}

export const reportPlayStart = async (item: JellyfinItem, paused: boolean, ticks: number, playbackId: string) => reportPlaybackStart({
    CanSeek: true,
    ItemId: item.Id,
    SessionId: playbackId,

    MediaSourceId: null, // get(activeMediaSource),
    AudioStreamIndex: null, // get(activeAudioTrack),
    SubtitleStreamIndex: null, // get(activeSubtitleTrack),

    PlaybackStartTimeTicks: ticks,

    // TODO: include VolumeLevel
})
export const reportPlayProgress = async (item: JellyfinItem, paused: boolean, currentTime: number, playbackId: string) => await reportPlaybackProgress({
        CanSeek: true,
        ItemId: item.Id,
        SessionId: playbackId,

        MediaSourceId: null, // get(activeMediaSource),
        AudioStreamIndex: null, // get(activeAudioTrack),
        SubtitleStreamIndex: null, // get(activeSubtitleTrack),

        IsPaused: paused,
        PositionTicks: Math.round(currentTime * (1000 * 10000)),

        // TODO: include VolumeLevel & IsMuted
    })
export const reportPlayStop = async (itemId: string, ticks: number, playbackId: string) => await reportPlaybackStop({ itemId: itemId, SessionId: playbackId, PositionTicks: ticks })