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
    import type {JellyfinItem, PlaybackInfo, ProgressSegment} from "$lib/typings/jellyfin";
    import {
        bitrateTest,
        exitFullscreen,
        fullscreenElement,
        fullscreenSupport, generateImageUrl, getDeviceProfile,
        getLargeBackdrop, getMediaData, maxBitrate,
        reportPlayProgress,
        reportPlayStart, reportPlayStop,
        requestFullscreen,
        subscribeButIgnoreFirst,
    } from "$lib/helper";
    import {onDestroy, onMount} from "svelte";
    import {
        startPlayback,
        stopPlayback
    } from "$lib/api/internal";
    import {activeAudioTrack, activeMediaSource, activeSubtitleTrack, bitrate} from "$lib/stores";
    import {session} from "$app/stores";
    import {icons} from "feather-icons";
    import {browser, dev} from "$app/env";
    import Controls from "../../components/player/Controls.svelte";
    import Debug from "../../components/player/Debug.svelte";
    import {goto} from "$app/navigation";
    import Info from "../../components/player/Info.svelte";
    import {SubtitleSegment} from "$lib/typings/jellyfin";

    export let item: JellyfinItem
    let returnUrl: string = "/"

    getMediaData(item, true)

    let actualBitrate: number = -1
    let showDebugStats: boolean = dev

    let waiting: boolean = false

    let subtitleData: SubtitleSegment[]
    let subtitleInterval
    let displaySubtitle: string

    // binds
    let playerHolder

    // General vars
    let url = getLargeBackdrop(item)
    let reportInterval

    // Playback
    let id: string
    let liveStreamId: string
    let src: string

    // Controls
    let showControlsHover: boolean = false
    let showControls: boolean
    let hideTimeout: number

    $: showControls = waiting || paused || showControlsHover

    // Bindings
    let duration: number = 0
    let currentTime: number = 0
    let paused: boolean = true
    let videoHeight: number
    let videoWidth: number
    let playbackRate: number = 1

    let played: ProgressSegment[] = []
    let buffered: ProgressSegment[] = []

    const playItem = async () => {
        if(!browser) return

        actualBitrate = $bitrate <= $maxBitrate ? $bitrate : $maxBitrate

        displaySubtitle = null
        subtitleData = null
        clearInterval(subtitleInterval)

        // 1 tick = 10.000
        const ticks = Math.round(currentTime * (1000 * 10000))
        const startAt = src ? ticks : new URLSearchParams(window.location.search).get("start") as number ?? 0

        if(liveStreamId) stopPlayback(liveStreamId).then(() => console.log("Stopped playback", liveStreamId))
        if(reportInterval) clearInterval(reportInterval)

        const response: PlaybackInfo = await startPlayback(item.Id, {
            DeviceProfile: getDeviceProfile(actualBitrate),
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

        if(source.TranscodingUrl) src = `${$session.active.server}${source.TranscodingUrl}`
        else src = ` ${$session.active.server}/Videos/${item.Id}/stream.${source.Container}?Static=true&mediaSourceId=${$activeMediaSource}&deviceId=${$session.active.deviceId}`

        currentTime = startAt / (1000 * 10000)
        src += `#t=${currentTime}`

        const subtitleTrack = source.MediaStreams.find(item => item.Index === $activeSubtitleTrack)
        if(subtitleTrack && subtitleTrack.DeliveryMethod === "External") {
            fetch(`${$session.active.server}${subtitleTrack.DeliveryUrl.replace("Stream.vtt", "Stream.js")}`).then(response => response.json()).then((data: { TrackEvents: SubtitleSegment[] }) => subtitleData = data.TrackEvents).catch(error => console.error("Failed to load subtitle data", error))
            subtitleInterval = setInterval(updateSubtitles, 100)
        }

        try {
            setMediaSession()
        } catch (error) {
            console.error("Failed to update mediaSession", error)
        }

        if(id) await reportPlayStop(item.Id, ticks, id)
        reportPlayStart(item, paused, ticks, id).then(() => console.log("Reported play start"))
        reportInterval = setInterval(() => reportPlayProgress(item, paused, currentTime, id), 1000 * 60)
    }
    const togglePaused = () => {
        paused = !paused
        reportPlayProgress(item, paused, currentTime, id)
    }
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

    const setMediaSession = () => {
        if(browser && "mediaSession" in navigator) {
            const artwork: MediaImage[] =
                item.Id && item.ImageTags.Primary
                ? [
                    {
                        src: generateImageUrl(item.Id, item.ImageTags.Primary, "Primary", 96, "Items", 96, $session.active),
                        sizes: "96x96"
                    },
                    {
                        src: generateImageUrl(item.Id, item.ImageTags.Primary, "Primary", 128, "Items", 128, $session.active),
                        sizes: "128x128"
                    },
                    {
                        src: generateImageUrl(item.Id, item.ImageTags.Primary, "Primary", 192, "Items", 192, $session.active),
                        sizes: "192x192"
                    },
                    {
                        src: generateImageUrl(item.Id, item.ImageTags.Primary, "Primary", 256, "Items", 256, $session.active),
                        sizes: "256x256"
                    },
                    {
                        src: generateImageUrl(item.Id, item.ImageTags.Primary, "Primary", 384, "Items", 384, $session.active),
                        sizes: "384x384"
                    },
                    {
                        src: generateImageUrl(item.Id, item.ImageTags.Primary, "Primary", 512, "Items", 512, $session.active),
                        sizes: "512x512"
                    },
                ]
                : item.SeriesId && item.SeriesPrimaryImageTag
                ?[
                    {
                        src: generateImageUrl(item.SeriesId, item.SeriesPrimaryImageTag, "Primary", 96, "Items", 96, $session.active),
                        sizes: "96x96"
                    },
                    {
                        src: generateImageUrl(item.SeriesId, item.SeriesPrimaryImageTag, "Primary", 128, "Items", 128, $session.active),
                        sizes: "128x128"
                    },
                    {
                        src: generateImageUrl(item.SeriesId, item.SeriesPrimaryImageTag, "Primary", 192, "Items", 192, $session.active),
                        sizes: "192x192"
                    },
                    {
                        src: generateImageUrl(item.SeriesId, item.SeriesPrimaryImageTag, "Primary", 256, "Items", 256, $session.active),
                        sizes: "256x256"
                    },
                    {
                        src: generateImageUrl(item.SeriesId, item.SeriesPrimaryImageTag, "Primary", 384, "Items", 384, $session.active),
                        sizes: "384x384"
                    },
                    {
                        src: generateImageUrl(item.SeriesId, item.SeriesPrimaryImageTag, "Primary", 512, "Items", 512, $session.active),
                        sizes: "512x512"
                    },
                ]
                : null

            navigator.mediaSession.metadata = new MediaMetadata({
                title: item.Name,
                artist: item.SeriesName || item.ProductionYear || null,
                artwork
            } as MediaMetadata)

            navigator.mediaSession.setActionHandler("play", togglePaused)
            navigator.mediaSession.setActionHandler("pause", togglePaused)

            navigator.mediaSession.setActionHandler("seekbackward", () => seek(-15))
            navigator.mediaSession.setActionHandler("seekforward", () => seek(15))
            navigator.mediaSession.setActionHandler("seekto", ({ seekTime }) => seekTime && (currentTime = seekTime))
        }
    }
    const updateSubtitles = () => {
        if(!subtitleData) return
        let now = currentTime * 1000 * 10000
        let found = false

        for(let subtitle of subtitleData) {
            if(subtitle.StartPositionTicks < now && subtitle.EndPositionTicks > now) {
                displaySubtitle = subtitle.Text
                found = true
                break
            }
        }

        if(!found) displaySubtitle = null
    }

    $: {
        if(browser && "mediaSession" in navigator) {
            navigator.mediaSession.playbackState = paused ? "paused" : "playing"
            try {
                navigator.mediaSession.setPositionState({ position: currentTime > duration ? 0 : currentTime, duration: duration, playbackRate })
            } catch (error) {
                console.error("Failed to update mediaSession", error)
            }
        }
    }

    const seek = (seconds: number) => currentTime += seconds
    const displayControls = () => {
        if(hideTimeout) clearTimeout(hideTimeout)

        showControlsHover = true
        hideTimeout = window.setTimeout(() => showControlsHover = false, 3000)
    }

    const handleKeydown = (event: KeyboardEvent) => {
        if(event.code === "Space") togglePaused()
        else if(event.code === "KeyP") togglePaused()
        else if(event.code === "KeyD") showDebugStats = !showDebugStats
        else if(event.code === "KeyF") toggleFullscreen()
        else if(event.code === "KeyM") toggleFullscreen()
        else if(event.code === "ArrowLeft") seek(-15)
        else if(event.code === "ArrowRight") seek(15)
        else if(event.code === "Escape") goto(returnUrl)

        displayControls()
        event.preventDefault()
    }

    let mediaSourceUnsubscribe = () => {}
    let audioTrackUnsubscribe = () => {}
    let subtitleTrackUnsubscribe = () => {}
    let bitrateUnsubscribe = () => {}
    let maxBitrateUnsubscribe = () => {}

    onMount(async () => {
        await bitrateTest($session.active)

        await playItem()
        displayControls()

        if(browser) {
            // update player on change
            mediaSourceUnsubscribe = subscribeButIgnoreFirst(activeMediaSource, playItem)
            audioTrackUnsubscribe = subscribeButIgnoreFirst(activeAudioTrack, playItem)
            subtitleTrackUnsubscribe = subscribeButIgnoreFirst(activeSubtitleTrack, playItem)
            bitrateUnsubscribe = subscribeButIgnoreFirst(bitrate, playItem)
            maxBitrateUnsubscribe = subscribeButIgnoreFirst(maxBitrate, playItem)

            returnUrl = new URLSearchParams(window.location.search).get("url")
        }
    })
    onDestroy(() => {
        if(liveStreamId) stopPlayback(liveStreamId)
        if(reportInterval) clearInterval(reportInterval)

        clearInterval(subtitleInterval)

        mediaSourceUnsubscribe()
        audioTrackUnsubscribe()
        subtitleTrackUnsubscribe()
        bitrateUnsubscribe()
        maxBitrateUnsubscribe()
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
    div.player * {
        position: relative;
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

    span.icon {
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
    }
    span.icon.show {
        display: block;
    }

    span.paused {
        padding: 20px;
        background-color: rgba(0, 0, 0, 0.4);
    }
    span.waiting :global(svg) {
        animation: spin 3s infinite;
    }

    div.subtitles {
        position: absolute;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);

        padding: 5px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.4);

        /* TODO: Allow users to customise this */
        font-size: 30px;
    }
</style>

<div class="player" bind:this={playerHolder}>
    <video
            on:waiting={() => waiting = true} on:playing={() => waiting = false}
            bind:paused bind:videoHeight bind:videoWidth bind:duration bind:currentTime bind:played bind:buffered bind:playbackRate
            {src} poster={url} preload="metadata"></video>
    <div on:mousemove={displayControls} on:click={() => {
        togglePaused()
    }} class="overlay" class:show={showControls}></div>

    <a class="back" class:show={showControls} href={returnUrl}>{@html icons["arrow-left"].toSvg()}</a>
    <span class="icon paused" class:show={paused && !waiting} on:click={togglePaused}>{@html icons["pause"].toSvg({ height: 50, width: 50 })}</span>
    <span class="icon waiting" class:show={waiting} on:click={togglePaused}>{@html icons["loader"].toSvg({ height: 50, width: 50 })}</span>

    {#if displaySubtitle}
        <div class="subtitles">{displaySubtitle}</div>
    {/if}
    <Controls
            {item} show={showControls} {paused} {played} {buffered} {duration} {currentTime}
            on:seek={({detail}) => seek(detail)} on:show={displayControls} on:pause={togglePaused} on:fullscreen={toggleFullscreen} on:pip={togglePiP} />

    {#if showDebugStats}
        <Debug {src} {currentTime} {duration} {videoWidth} {videoHeight} {actualBitrate} {item} {waiting} />
    {/if}
</div>

<Info {item} {returnUrl} on:seek={({detail}) => currentTime = detail / (10000 * 1000)} />