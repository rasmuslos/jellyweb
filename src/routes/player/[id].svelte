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
        requestFullscreen, subscribeButIgnoreFirst,
        ticksToHumanReadable
    } from "$lib/helper";
    import {onDestroy, onMount} from "svelte";
    import {startPlayback, stopPlayback} from "$lib/api/internal";
    import {activeAudioTrack, activeMediaSource, activeSubtitleTrack, bitrate, modal} from "$lib/stores";
    import {session} from "$app/stores";
    import {icons} from "feather-icons";
    import {browser} from "$app/env";

    type ProgressSegment = {
        start: number,
        end: number,
    }

    export let item: Item

    // Get media-sources & streams
    let mediaSources = item.MediaSources
    activeMediaSource.set(mediaSources[0].Id)

    let mediaSource = mediaSources.find(source => source.Id === $activeMediaSource)

    activeAudioTrack.set(mediaSource.DefaultAudioStreamIndex)
    activeSubtitleTrack.set(mediaSource.DefaultSubtitleStreamIndex)

    let audioStreams = mediaSource.MediaStreams.filter(stream => stream.Type === "Audio")
    let subtitleStreams = mediaSource.MediaStreams.filter(stream => stream.Type === "Subtitle")

    let actualBitrate: number = $bitrate

    // General vars
    let playerHolder
    let url = getLargeBackdrop(item)
    let showTrackSelection = false

    // Playback
    let id: string
    let liveStreamId: string
    let src: string

    // Controls
    let showControlsHover: boolean = false
    let showControls: boolean
    let hideTimeout: number

    $: showControls = paused || showControlsHover

    // Bindings
    let duration: number = 0
    let currentTime: number = 0
    let paused: boolean = true
    let videoHeight: number
    let videoWidth: number

    let played: ProgressSegment[] = []
    let buffered: ProgressSegment[] = []

    const playItem = async () => {
        if(!browser) return

        // 1 tick = 10.000
        const startAt = src ? Math.round(currentTime * (1000 * 10000)) : new URLSearchParams(window.location.search).get("start") as number ?? 0

        const response: PlaybackInfo = await startPlayback(item.Id, {
            DeviceProfile: {
                "MaxStreamingBitrate":120000000,
                "MaxStaticBitrate":100000000,
                "MusicStreamingTranscodingBitrate":384000,
                "DirectPlayProfiles":[{"Container":"webm","Type":"Video","VideoCodec":"vp8,vp9","AudioCodec":"vorbis"},{"Container":"mp4,m4v","Type":"Video","VideoCodec":"h264,vp8,vp9","AudioCodec":"aac,mp3,ac3,eac3,flac,alac,vorbis"},{"Container":"mov","Type":"Video","VideoCodec":"h264","AudioCodec":"aac,mp3,ac3,eac3,flac,alac,vorbis"},{"Container":"mp3","Type":"Audio"},{"Container":"aac","Type":"Audio"},{"Container":"m4a","AudioCodec":"aac","Type":"Audio"},{"Container":"m4b","AudioCodec":"aac","Type":"Audio"},{"Container":"flac","Type":"Audio"},{"Container":"alac","Type":"Audio"},{"Container":"m4a","AudioCodec":"alac","Type":"Audio"},{"Container":"m4b","AudioCodec":"alac","Type":"Audio"},{"Container":"webma","Type":"Audio"},{"Container":"webm","AudioCodec":"webma","Type":"Audio"},{"Container":"wav","Type":"Audio"}],
                "TranscodingProfiles":[{"Container":"aac","Type":"Audio","AudioCodec":"aac","Context":"Streaming","Protocol":"hls","MaxAudioChannels":"6","MinSegments":"2","BreakOnNonKeyFrames":true},{"Container":"aac","Type":"Audio","AudioCodec":"aac","Context":"Streaming","Protocol":"http","MaxAudioChannels":"6"},{"Container":"mp3","Type":"Audio","AudioCodec":"mp3","Context":"Streaming","Protocol":"http","MaxAudioChannels":"6"},{"Container":"wav","Type":"Audio","AudioCodec":"wav","Context":"Streaming","Protocol":"http","MaxAudioChannels":"6"},{"Container":"mp3","Type":"Audio","AudioCodec":"mp3","Context":"Static","Protocol":"http","MaxAudioChannels":"6"},{"Container":"aac","Type":"Audio","AudioCodec":"aac","Context":"Static","Protocol":"http","MaxAudioChannels":"6"},{"Container":"wav","Type":"Audio","AudioCodec":"wav","Context":"Static","Protocol":"http","MaxAudioChannels":"6"},{"Container":"ts","Type":"Video","AudioCodec":"aac,mp3,ac3,eac3","VideoCodec":"h264","Context":"Streaming","Protocol":"hls","MaxAudioChannels":"6","MinSegments":"2","BreakOnNonKeyFrames":true},{"Container":"webm","Type":"Video","AudioCodec":"vorbis","VideoCodec":"vpx","Context":"Streaming","Protocol":"http","MaxAudioChannels":"6"},{"Container":"mp4","Type":"Video","AudioCodec":"aac,mp3,ac3,eac3,flac,alac,vorbis","VideoCodec":"h264","Context":"Static","Protocol":"http"}],
                "ContainerProfiles":[],
                "CodecProfiles":[{"Type":"Video","Codec":"h264","Conditions":[{"Condition":"NotEquals","Property":"IsAnamorphic","Value":"true","IsRequired":false},{"Condition":"EqualsAny","Property":"VideoProfile","Value":"high|main|baseline|constrained baseline","IsRequired":false},{"Condition":"LessThanEqual","Property":"VideoLevel","Value":"51","IsRequired":false},{"Condition":"NotEquals","Property":"IsInterlaced","Value":"true","IsRequired":false}]},{"Type":"Video","Codec":"hevc","Conditions":[{"Condition":"NotEquals","Property":"IsAnamorphic","Value":"true","IsRequired":false},{"Condition":"EqualsAny","Property":"VideoProfile","Value":"main|main 10","IsRequired":false},{"Condition":"LessThanEqual","Property":"VideoLevel","Value":"183","IsRequired":false},{"Condition":"NotEquals","Property":"IsInterlaced","Value":"true","IsRequired":false}]}],
                "ResponseProfiles":[{"Type":"Video","Container":"m4v","MimeType":"video/mp4"}],
                "SubtitleProfiles": [
                    /*
                    {"Format":"ass","Method":"External"},
                    {"Format":"ssa","Method":"External"},
                    */
                ],
            },
            UserId: $session.active.userId,
            MaxStreamingBitrate: actualBitrate,
            AutoOpenLiveStream: true,
            StartTimeTicks: startAt,

            MediaSourceId: $activeMediaSource,
            AudioStreamIndex: $activeAudioTrack,
            SubtitleStreamIndex: $activeSubtitleTrack,
        })

        id = response.PlaySessionId
        liveStreamId = response.MediaSources[0].LiveStreamId

        const source = response.MediaSources.find(ms => ms.Id === $activeMediaSource)

        if(source == null) return

        if(source.TranscodingUrl) src = `${$session.active.server}${response.MediaSources[0].TranscodingUrl}`
        else src = ` ${$session.active.server}/Videos/${item.Id}/stream.${source.Container}?Static=true&mediaSourceId=${$activeMediaSource}&deviceId=${$session.active.deviceId}`

        currentTime = startAt / (1000 * 10000)
        src += `#t=${currentTime}`
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

    const toggleTrackSelection = () => showTrackSelection = !showTrackSelection
    const handleKeydown = (event: KeyboardEvent) => {
        displayControls()

        if(event.code === "Space") togglePaused()
    }

    // update player on change
    const mediaSourceUnsubscribe = subscribeButIgnoreFirst(activeMediaSource, playItem)
    const audioTrackUnsubscribe = subscribeButIgnoreFirst(activeAudioTrack, playItem)
    const subtitleTrackUnsubscribe = subscribeButIgnoreFirst(activeSubtitleTrack, playItem)
    const bitrateUnsubscribe = subscribeButIgnoreFirst(bitrate, playItem)

    onMount(async () => {
        await bitrateTest($session.active)
        await playItem()
        displayControls()
    })
    onDestroy(() => {
        if(liveStreamId) stopPlayback(liveStreamId)

        mediaSourceUnsubscribe()
        audioTrackUnsubscribe()
        subtitleTrackUnsubscribe()
        bitrateUnsubscribe()
    })
</script>

<svelte:window on:keydown={handleKeydown} />
<svelte:head>
    <title>{item.Name}</title>
</svelte:head>

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
        position: relative;

        width: 24px;
        height: 24px;

        margin: 0 10px;
        cursor: pointer;
    }
    div.control span.control {
        margin: 0;
    }
    .control.left {
        margin-left: auto;
    }
    .text {
        margin: 0 5px;
    }

    div.setting {
        position: absolute;
        right: 0;
        bottom: 40px;

        display: none;
        padding: 20px;
        cursor: auto;

        border-radius: 10px;
        background-color: var(--background-secondary);
    }
    div.setting.show {
        display: block;
    }

    select {
        display: block;
        margin: 5px 0 10px 0;

        background-color: var(--background-light);
        border: none;

        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        cursor: pointer;
        padding: 3px;

        color: var(--secondary);
    }
    select[disabled] {
        color: var(--dimmed);
    }

    span.paused {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        cursor: pointer;
        display: none;

        height: 50px;
        width: 50px;

        box-sizing: content-box;
        border-radius: 50%;

        padding: 20px;
        background-color: rgba(0, 0, 0, 0.4);
    }
    span.paused.show {
        display: block;
    }

    div.debug {
        position: absolute;
        top: 0;
        right: 0;

        background-color: black;
        color: white;
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
    <div on:mousemove={displayControls} on:click={() => {
        togglePaused()
        showTrackSelection = false
    }} class="overlay" class:show={showControls}></div>

    <a class="back" class:show={showControls} href="/">{@html icons["arrow-left"].toSvg()}</a>
    <span class="paused" class:show={paused} on:click={togglePaused}>{@html icons["pause"].toSvg({ height: 50, width: 50 })}</span>

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
            <div class="control left">
                <div class="setting" class:show={showTrackSelection}>
                    <span>Video</span>
                    <select disabled={mediaSources.length < 2}} on:change={({ target }) => activeMediaSource.set(target.value)}>
                        {#each mediaSources as {Id, Name}}
                            <option selected={$activeMediaSource === Id} value={Id}>{Name}</option>
                        {/each}
                    </select>

                    <span>Audio</span>
                    <select disabled={audioStreams.length < 2}  on:change={({ target }) => activeAudioTrack.set(target.value)}>
                        {#each audioStreams as {Index, Title, Language}}
                            <option selected={$activeAudioTrack === Index} value={Index}>{Title ?? Language}</option>
                        {/each}
                    </select>

                    <span>Subtitles</span>
                    <select disabled={subtitleStreams.length < 2} on:change={({ target }) => activeSubtitleTrack.set(target.value)}>
                        <option value={-1}>none</option>
                        {#each subtitleStreams as {Index, Title, Language}}
                            <option selected={$activeSubtitleTrack === Index} value={Index}>{Title ?? Language}</option>
                        {/each}
                    </select>

                    <span>Bitrate</span>
                    <select on:change={({ target }) => actualBitrate = target.value}>
                        {#each [$bitrate, 120000000, 80000000, 60000000, 40000000, 20000000, 15000000, 1000000, 400000, 100000] as bits}
                            <option selected={actualBitrate === bits} value={bits}>{Math.round(bits / 1000000)}Mbps</option>
                        {/each}
                    </select>
                </div>
                <span on:click={toggleTrackSelection} class="control">{@html icons["settings"].toSvg()}</span>
            </div>
            <span on:click={togglePiP} class="control">{@html icons["minimize-2"].toSvg()}</span>
            <span on:click={toggleFullscreen} class="control">{@html icons["maximize"].toSvg()}</span>
        </div>
    </div>

    <div class="debug">
        HEIGHT: {videoHeight}px | WIDTH: {videoWidth}px
        <br>
        MEDIA-SOURCES: {mediaSources.length} ({mediaSources.map(source => source.Id).join(", ")}) / ACTIVE: {$activeMediaSource}
        <br>
        AUDIO-STREAMS: {audioStreams.length} ({audioStreams.map(stream => stream.Index).join(", ")}) / ACTIVE: {$activeAudioTrack}
        <br>
        SUBTITLE-STREAMS: {subtitleStreams.length} ({subtitleStreams.map(stream => stream.Index).join(", ")}) / ACTIVE: {$activeSubtitleTrack}
        <br>
        {currentTime} / {duration}
        <br>
        {$bitrate} / {actualBitrate}
    </div>
</div>