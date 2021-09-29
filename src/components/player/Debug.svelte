<script lang="ts">
    import {getMediaData, getTranscodingReasons, isTranscoding} from "$lib/helper";
    import type {Item} from "$lib/typings";
    import {activeAudioTrack, activeMediaSource, activeSubtitleTrack, bitrate} from "$lib/stores";

    export let item: Item

    export let videoWidth: number
    export let videoHeight: number

    export let src: string
    export let actualBitrate: number

    export let duration: number
    export let currentTime: number

    const mediaData = getMediaData(item)
</script>

<style>
    div {
        position: absolute;
        top: 0;
        right: 0;

        background-color: black;
        color: white;
    }
</style>

<div>
    HEIGHT: {videoHeight}px | WIDTH: {videoWidth}px
    <br>
    MEDIA-SOURCES: {mediaData.mediaSources.length} ({mediaData.mediaSources.map(source => source.Id).join(", ")}) / ACTIVE: {$activeMediaSource}
    <br>
    AUDIO-STREAMS: {mediaData.audioStreams.length} ({mediaData.audioStreams.map(stream => stream.Index).join(", ")}) / ACTIVE: {$activeAudioTrack}
    <br>
    SUBTITLE-STREAMS: {mediaData.subtitleStreams.length} ({mediaData.subtitleStreams.map(stream => stream.Index).join(", ")}) / ACTIVE: {$activeSubtitleTrack}
    <br>
    {currentTime} / {duration}
    <br>
    {$bitrate} / {actualBitrate}
    <br>
    {#key src}
        {#if !src}
            NOT LOADED
        {:else if isTranscoding(src)}
            {getTranscodingReasons(src)}
        {:else}
            DIRECT PLAY
        {/if}
    {/key}
</div>