import type {Item} from "$lib/typings";
import {activeAudioTrack, activeMediaSource, activeSubtitleTrack} from "$lib/stores";
import {get} from "svelte/store";
import {reportPlaybackProgress, reportPlaybackStart, reportPlaybackStop} from "$lib/api/internal";

export const getMediaData = (item: Item, update: boolean = false) => {
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
}

export const isTranscoding = (url: string) => getTranscodingReasons(url)
export const getTranscodingReasons = (url: string) => {
    const parsed = new URL(url)
    const reason = parsed.searchParams.get("TranscodeReasons")

    if(!reason) return false
    return reason.split(",").join(", ")
}

export const reportPlayStart = async (item: Item, paused: boolean, ticks: number, playbackId: string) => reportPlaybackStart({
    CanSeek: true,
    ItemId: item.Id,
    SessionId: playbackId,

    MediaSourceId: get(activeMediaSource),
    AudioStreamIndex: get(activeAudioTrack),
    SubtitleStreamIndex: get(activeSubtitleTrack),

    PlaybackStartTimeTicks: ticks,

    // TODO: include VolumeLevel
})
export const reportPlayProgress = async (item: Item, paused: boolean, currentTime: number, playbackId: string) => await reportPlaybackProgress({
        CanSeek: true,
        ItemId: item.Id,
        SessionId: playbackId,

        MediaSourceId: get(activeMediaSource),
        AudioStreamIndex: get(activeAudioTrack),
        SubtitleStreamIndex: get(activeSubtitleTrack),

        IsPaused: paused,
        PositionTicks: Math.round(currentTime * (1000 * 10000)),

        // TODO: include VolumeLevel & IsMuted
    })
export const reportPlayStop = async (itemId: string, ticks: number, playbackId: string) => await reportPlaybackStop({ itemId: itemId, SessionId: playbackId, PositionTicks: ticks })