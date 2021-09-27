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
    import type {Item, PlaybackInfo, ProgressSegment} from "$lib/typings";
    import {
        bitrateTest, exitFullscreen, fullscreenElement,
        fullscreenSupport,
        getLargeBackdrop, getMaxBitrate, getMediaData,
        requestFullscreen, subscribeButIgnoreFirst,
    } from "$lib/helper";
    import {onDestroy, onMount} from "svelte";
    import {
        reportPlaybackProgress,
        reportPlaybackStart,
        reportPlaybackStop,
        startPlayback,
        stopPlayback
    } from "$lib/api/internal";
    import {activeAudioTrack, activeMediaSource, activeSubtitleTrack, bitrate} from "$lib/stores";
    import {session} from "$app/stores";
    import {icons} from "feather-icons";
    import {browser} from "$app/env";
    import Controls from "../../components/player/Controls.svelte";
    import Hero from "../../components/sections/Hero.svelte";

    export let item: Item
    let returnUrl: string = "/"

    let actualBitrate: number = -1
    const mediaData = getMediaData(item)

    // General vars
    let playerHolder
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
        const ticks = Math.round(currentTime * (1000 * 10000))
        const startAt = src ? ticks : new URLSearchParams(window.location.search).get("start") as number ?? 0

        if(id) await reportPlaybackStop({ itemId: item.Id, SessionId: id, PositionTicks: ticks })
        if(liveStreamId) stopPlayback(liveStreamId).then(() => console.log("Stopped playback", liveStreamId))
        if(reportInterval) clearInterval(reportInterval)

        const response: PlaybackInfo = await startPlayback(item.Id, {
            DeviceProfile: {
                "MaxStreamingBitrate": actualBitrate,
                "MaxStaticBitrate": actualBitrate,

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

        reportPlaybackStart({
            CanSeek: true,
            ItemId: item.Id,
            SessionId: id,

            MediaSourceId: $activeMediaSource,
            AudioStreamIndex: $activeAudioTrack,
            SubtitleStreamIndex: $activeSubtitleTrack,

            PlaybackStartTimeTicks: ticks,

            // TODO: include VolumeLevel
        }).then(() => console.log("Reported playback start"))
        reportInterval = setInterval(() => reportPlaybackProgress({
            CanSeek: true,
            ItemId: item.Id,
            SessionId: id,

            MediaSourceId: $activeMediaSource,
            AudioStreamIndex: $activeAudioTrack,
            SubtitleStreamIndex: $activeSubtitleTrack,

            IsPaused: paused,
            PositionTicks: Math.round(currentTime * (1000 * 10000)),

            // TODO: include VolumeLevel & IsMuted
        }), 1000 * 60)
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

    let mediaSourceUnsubscribe = () => {}
    let audioTrackUnsubscribe = () => {}
    let subtitleTrackUnsubscribe = () => {}
    let bitrateUnsubscribe = () => {}

    onMount(async () => {
        await bitrateTest($session.active)
        actualBitrate = $bitrate <= getMaxBitrate() ? $bitrate : getMaxBitrate()

        await playItem()
        displayControls()

        if(browser) {
            // update player on change
            mediaSourceUnsubscribe = subscribeButIgnoreFirst(activeMediaSource, playItem)
            audioTrackUnsubscribe = subscribeButIgnoreFirst(activeAudioTrack, playItem)
            subtitleTrackUnsubscribe = subscribeButIgnoreFirst(activeSubtitleTrack, playItem)
            bitrateUnsubscribe = subscribeButIgnoreFirst(bitrate, playItem)

            returnUrl = new URLSearchParams(window.location.search).get("url")
        }
    })
    onDestroy(() => {
        if(liveStreamId) stopPlayback(liveStreamId)
        if(reportInterval) clearInterval(reportInterval)

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
</style>

<div class="player" bind:this={playerHolder}>
    <video
            bind:paused bind:videoHeight bind:videoWidth bind:duration bind:currentTime bind:played bind:buffered
            {src} poster={url} preload="metadata"></video>
    <div on:mousemove={displayControls} on:click={() => {
        togglePaused()
    }} class="overlay" class:show={showControls}></div>

    <a class="back" class:show={showControls} href={returnUrl}>{@html icons["arrow-left"].toSvg()}</a>
    <span class="paused" class:show={paused} on:click={togglePaused}>{@html icons["pause"].toSvg({ height: 50, width: 50 })}</span>

    <Controls
            {item} show={showControls} {paused} {played} {buffered} {duration} {currentTime}
            on:seek={({detail}) => seek(detail)} on:show={displayControls} on:pause={togglePaused} on:fullscreen={toggleFullscreen} on:pip={togglePiP} />

    <div class="debug">
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
    </div>
</div>

<!--CHANGE ME-->
<Hero {item} />