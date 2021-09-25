<script lang="ts" context="module">
    import {getItem, setFetcher} from "$lib/api/internal";

    export async function load({ fetch, page }) {
        const { id } = page.params

        try {
            setFetcher(fetch);
            const { item } = await getItem(id, false)

            return {
                status: 200,
                props: { item }
            }
        } catch(error) {
            return {
                status: 301,
                redirect: "/error"
            }
        }
    }
</script>
<script lang="ts">
    import type {Item, PlaybackInfo} from "$lib/typings";
    import {
        bitrateTest, exitFullscreen, fullscreenElement,
        fullscreenSupport,
        generateItemUrl,
        getLargeBackdrop,
        requestFullscreen,
        ticksToHumanReadable
    } from "$lib/helper";
    import {onDestroy, onMount} from "svelte";
    import {startPlayback, stopPlayback} from "$lib/api/internal";
    import {bitrate} from "$lib/stores";
    import {session} from "$app/stores";
    import {icons} from "feather-icons";
    import {browser} from "$app/env";

    type ProgressSegment = {
        start: number,
        end: number,
    }

    export let item: Item

    let playerHolder
    let url = getLargeBackdrop(item)

    let id: string
    let liveStreamId: string
    let src: string

    let showControlsHover: boolean = false
    let showControls: boolean
    let hideTimeout: number

    let duration: number = 0
    let currentTime: number = 0
    let paused: boolean = true
    let videoHeight: number
    let videoWidth: number

    let played: ProgressSegment[] = []
    let buffered: ProgressSegment[] = []

    $: showControls = paused || showControlsHover

    const playItem = async () => {
        if(!browser) return

        const startAt = new URLSearchParams(window.location.search).get("start") as number ?? 0

        await bitrateTest($session.active)
        const response: PlaybackInfo = await startPlayback(item.Id, {
            DeviceProfile: {"MaxStreamingBitrate":120000000,"MaxStaticBitrate":100000000,"MusicStreamingTranscodingBitrate":384000,"DirectPlayProfiles":[{"Container":"webm","Type":"Video","VideoCodec":"vp8,vp9","AudioCodec":"vorbis"},{"Container":"mp4,m4v","Type":"Video","VideoCodec":"h264,vp8,vp9","AudioCodec":"aac,mp3,ac3,eac3,flac,alac,vorbis"},{"Container":"mov","Type":"Video","VideoCodec":"h264","AudioCodec":"aac,mp3,ac3,eac3,flac,alac,vorbis"},{"Container":"mp3","Type":"Audio"},{"Container":"aac","Type":"Audio"},{"Container":"m4a","AudioCodec":"aac","Type":"Audio"},{"Container":"m4b","AudioCodec":"aac","Type":"Audio"},{"Container":"flac","Type":"Audio"},{"Container":"alac","Type":"Audio"},{"Container":"m4a","AudioCodec":"alac","Type":"Audio"},{"Container":"m4b","AudioCodec":"alac","Type":"Audio"},{"Container":"webma","Type":"Audio"},{"Container":"webm","AudioCodec":"webma","Type":"Audio"},{"Container":"wav","Type":"Audio"}],"TranscodingProfiles":[{"Container":"aac","Type":"Audio","AudioCodec":"aac","Context":"Streaming","Protocol":"hls","MaxAudioChannels":"6","MinSegments":"2","BreakOnNonKeyFrames":true},{"Container":"aac","Type":"Audio","AudioCodec":"aac","Context":"Streaming","Protocol":"http","MaxAudioChannels":"6"},{"Container":"mp3","Type":"Audio","AudioCodec":"mp3","Context":"Streaming","Protocol":"http","MaxAudioChannels":"6"},{"Container":"wav","Type":"Audio","AudioCodec":"wav","Context":"Streaming","Protocol":"http","MaxAudioChannels":"6"},{"Container":"mp3","Type":"Audio","AudioCodec":"mp3","Context":"Static","Protocol":"http","MaxAudioChannels":"6"},{"Container":"aac","Type":"Audio","AudioCodec":"aac","Context":"Static","Protocol":"http","MaxAudioChannels":"6"},{"Container":"wav","Type":"Audio","AudioCodec":"wav","Context":"Static","Protocol":"http","MaxAudioChannels":"6"},{"Container":"ts","Type":"Video","AudioCodec":"aac,mp3,ac3,eac3","VideoCodec":"h264","Context":"Streaming","Protocol":"hls","MaxAudioChannels":"6","MinSegments":"2","BreakOnNonKeyFrames":true},{"Container":"webm","Type":"Video","AudioCodec":"vorbis","VideoCodec":"vpx","Context":"Streaming","Protocol":"http","MaxAudioChannels":"6"},{"Container":"mp4","Type":"Video","AudioCodec":"aac,mp3,ac3,eac3,flac,alac,vorbis","VideoCodec":"h264","Context":"Static","Protocol":"http"}],"ContainerProfiles":[],"CodecProfiles":[{"Type":"Video","Codec":"h264","Conditions":[{"Condition":"NotEquals","Property":"IsAnamorphic","Value":"true","IsRequired":false},{"Condition":"EqualsAny","Property":"VideoProfile","Value":"high|main|baseline|constrained baseline","IsRequired":false},{"Condition":"LessThanEqual","Property":"VideoLevel","Value":"51","IsRequired":false},{"Condition":"NotEquals","Property":"IsInterlaced","Value":"true","IsRequired":false}]},{"Type":"Video","Codec":"hevc","Conditions":[{"Condition":"NotEquals","Property":"IsAnamorphic","Value":"true","IsRequired":false},{"Condition":"EqualsAny","Property":"VideoProfile","Value":"main|main 10","IsRequired":false},{"Condition":"LessThanEqual","Property":"VideoLevel","Value":"183","IsRequired":false},{"Condition":"NotEquals","Property":"IsInterlaced","Value":"true","IsRequired":false}]}],"SubtitleProfiles":[{"Format":"vtt","Method":"External"},{"Format":"ass","Method":"External"},{"Format":"ssa","Method":"External"}],"ResponseProfiles":[{"Type":"Video","Container":"m4v","MimeType":"video/mp4"}]},
            UserId: $session.active.userId,
            MaxStreamingBitrate: $bitrate,
            AutoOpenLiveStream: true,
            StartTimeTicks: startAt,
        })

        id = response.PlaySessionId
        liveStreamId = response.MediaSources[0].LiveStreamId

        src = `${$session.active.server}${response.MediaSources[0].TranscodingUrl}`
    }
    const togglePaused = () => paused = !paused
    const toggleFullscreen = () => {
        if(fullscreenSupport) {
            if(fullscreenElement()) exitFullscreen()
            else requestFullscreen(playerHolder)
        }
    }
    const togglePiP = () => {
        if(document.pictureInPictureEnabled) {
            if(document.pictureInPictureElement) document.exitPictureInPicture()
            else playerHolder.querySelector("video").requestPictureInPicture()
        }
    }

    const seek = (seconds: number) => currentTime += seconds
    const displayControls = () => {
        if(hideTimeout) clearTimeout(hideTimeout)

        showControlsHover = true
        hideTimeout = window.setTimeout(() => showControlsHover = false, 3000)
    }

    const handleKeydown = (event: KeyboardEvent) => {
        displayControls()

        if(event.code === "Space") togglePaused()
    }

    onMount(() => {
        playItem()
        displayControls()
    })
    onDestroy(() => {
        if(liveStreamId) stopPlayback(liveStreamId)
    })
</script>
<svelte:window on:keydown={handleKeydown} />

<style>
    div.player {
        position: relative;
        background-color: black;

        height: 100%;
        width: 100%;
    }
    a.back {
        position: absolute;
        top: 20px;
        left: 20px;

        display: none;
    }
    a.back.show {
        display: block;
    }

    video {
        height: 100%;
        width: 100%;
    }
    div.overlay {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;

        cursor: none;
    }
    div.overlay.show {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.4);
    }

    div.control_holder {
        position: absolute;
        left: 0;
        bottom: 0;

        width: 100%;

        display: none;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;

        align-items: center;
        padding: 25px 35px;
    }
    div.control_holder.show {
        display: grid;
    }

    div.progress_wrapper {
        display: grid;
        grid-template-columns: 1fr auto;

        align-items: center;
        padding: 0 0 15px 0;
    }
    div.progress_wrapper span {
        font-size: 15px;
        margin: 0 0 0 15px;
    }
    div.progress_holder {
        width: 100%;
        height: 2px;

        position: relative;
        background-color: var(--background-light);
    }
    div.progress {
        position: absolute;
        top: 0;

        height: 100%;
    }
    div.progress.buffered {
        background-color: var(--background);
    }
    div.progress.played {
        background-color: #81A1C1;
    }
    div.current {
        position: absolute;
        top: -2px;
        height: 6px;
        width: 6px;

        background-color: #81A1C1;
    }

    div.controls {
        display: flex;
        grid-template-columns: auto 1fr;
        align-items: center;

        user-select: none;
    }
    .control {
        width: 24px;
        height: 24px;

        margin: 0 10px;
        cursor: pointer;
    }
    .control.left {
        margin-left: auto;
    }
    .text {
        margin: 0 5px;
    }

    div.debug {
        position: absolute;
        top: 0;
        right: 0;

        background-color: black;
        color: white;

        display: none;
    }

    @media screen and (max-width: 1000px) {
        .text {
            display: none;
        }
    }
</style>

<div class="player" bind:this={playerHolder}>
    <video
            bind:paused bind:videoHeight bind:videoWidth bind:duration bind:currentTime bind:played bind:buffered
            {src} poster={url} preload="metadata"></video>
    <div on:mousemove={displayControls} on:click={togglePaused} class="overlay" class:show={showControls}></div>

    <a class="back" class:show={showControls} href="/">{@html icons["arrow-left"].toSvg()}</a>
    <div class="control_holder" class:show={showControls}>
        <div class="progress_wrapper">
            <div class="progress_holder">
                {#each buffered as { start, end }}
                    <div class="progress buffered" style="left: {(start / duration) * 100}px; width: {((end / duration) - (start / duration)) * 100}px"></div>
                {/each}
                {#each played as { start, end }}
                    <div class="progress played" style="left: {(start / duration) * 100}px; width: {((end / duration) - (start / duration)) * 100}px"></div>
                {/each}
                <div class="current" style="left: {(currentTime / duration) * 100}px;"></div>
            </div>
            <span>{ticksToHumanReadable((duration - currentTime) * 1000)}</span>
        </div>
        <div class="controls" on:click={displayControls}>
            <span on:click={togglePaused} class="control">{@html icons[paused ? "play" : "pause"].toSvg()}</span>
            <span class="control" on:click={() => seek(-15)}>{@html icons["rewind"].toSvg()}</span>
            <span class="control" on:click={() => seek(15)}>{@html icons["fast-forward"].toSvg()}</span>
            <div class="text">
                <span>{item.Name}</span>
                {#if item.SeasonName && item.SeriesName}
                    <span class="dimmed"> | </span>
                    <a class="dimmed" href={generateItemUrl(item.SeasonId)}>{item.SeasonName}</a>
                    <span class="dimmed"> - </span>
                    <a class="dimmed" href={generateItemUrl(item.ServerId)}>{item.SeriesName}</a>
                {/if}
            </div>
            <span on:click={togglePiP} class="control left">{@html icons["minimize-2"].toSvg()}</span>
            <span on:click={toggleFullscreen} class="control">{@html icons["maximize"].toSvg()}</span>
        </div>
    </div>

    <div class="debug">
        HEIGHT: {videoHeight}px WIDTH: {videoWidth}px
    </div>
</div>