import type {Item} from "$lib/typings";
import {activeAudioTrack, activeMediaSource, activeSubtitleTrack} from "$lib/stores";
import {get} from "svelte/store";

export const getMediaData = (item: Item) => {
    // Get media-sources & streams
    let mediaSources = item.MediaSources
    activeMediaSource.set(mediaSources[0].Id)

    let mediaSource = mediaSources.find(source => source.Id === get(activeMediaSource))

    activeAudioTrack.set(mediaSource.DefaultAudioStreamIndex)
    activeSubtitleTrack.set(mediaSource.DefaultSubtitleStreamIndex)

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