<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {icons} from "feather-icons";
    import type {Item, ProgressSegment} from "$lib/typings";
    import {generateItemUrl, getMediaData, maxBitrate, ticksToHumanReadable, updatePreference} from "$lib/helper";
    import Setting from "./Setting.svelte";
    import {activeAudioTrack, activeMediaSource, activeSubtitleTrack} from "$lib/stores";

    export let item: Item
    let progressHolder

    export let show: boolean
    export let paused: boolean

    export let played: ProgressSegment[]
    export let buffered: ProgressSegment[]

    export let duration: number
    export let currentTime: number

    let showTrackSelection: boolean = false
    const mediaData = getMediaData(item)
    const dispatcher = createEventDispatcher()

    const showControls = () => dispatcher("show")
    const togglePaused = () => dispatcher("pause")
    const toggleFullscreen = () => dispatcher("fullscreen")
    const togglePiP = () => dispatcher("pip")

    const seek = (duration: number) => dispatcher("seek", duration)
    const toggleTrackSelection = () => showTrackSelection = !showTrackSelection

    const handleClick = (event: MouseEvent) => {
        event.target

        let bounds = progressHolder.getBoundingClientRect()

        let max = bounds.width
        let pos = event.pageX - bounds.left
        let dual = Math.round(pos / max * 100)

        seek(duration * (dual / 100) - currentTime)
    }

    const bitRates = [120000000, 80000000, 60000000, 40000000, 20000000, 15000000, 1000000, 400000, 100000].map(rate => {return { index: rate, value: `${Math.round(rate / 1000000)}Mbps` }})
</script>
<svelte:window on:click={() => showTrackSelection = showTrackSelection} />

<style>
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

        cursor: pointer;
        position: relative;
        background-color: var(--background);
    }
    div.progress {
        position: absolute;
        top: 0;

        height: 100%;
    }
    div.progress.buffered {
        background-color: var(--background-light);
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

    @media screen and (max-width: 1000px) {
        .text {
            display: none;
        }
    }
</style>

<div class="control_holder" class:show={show}>
    <div class="progress_wrapper">
        <div class="progress_holder" bind:this={progressHolder} on:click={handleClick}>
            {#each buffered as { start, end }}
                <div class="progress buffered" style="left: {(start / duration) * 100}%; width: {((end / duration) - (start / duration)) * 100}%"></div>
            {/each}
            {#each played as { start, end }}
                <div class="progress played" style="left: {(start / duration) * 100}%; width: {((end / duration) - (start / duration)) * 100}%"></div>
            {/each}
            <div class="current" style="left: {(currentTime / duration) * 100}%;"></div>
        </div>
        <span>{ticksToHumanReadable((duration - currentTime) * 1000)}</span>
    </div>
    <div class="controls" on:click={showControls}>
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
                <Setting title="Video" activeIndex={$activeMediaSource} arr={mediaData.mediaSources.map(source => { return { index: source.Id, value: source.Name } })} on:set={({detail}) => activeMediaSource.set(detail)} />
                <Setting title="Audio" activeIndex={$activeAudioTrack} arr={mediaData.audioStreams.map(source => { return { index: source.Index, value: source.Title || source.Language } })} on:set={({detail}) => activeAudioTrack.set(detail)} />
                <Setting title="Subtitles" activeIndex={$activeSubtitleTrack} arr={mediaData.subtitleStreams.map(source => { return { index: source.Index, value: source.Index === -1 ? source.Title : `${source.Title || source.Language} [${(source.Codec || "?").toUpperCase()}]` } })} on:set={({detail}) => activeSubtitleTrack.set(detail)} />
                <Setting title="Max-Bitrate" activeIndex={$maxBitrate} arr={bitRates} on:set={({ detail }) => updatePreference("bitrate", detail)} />
            </div>
            <span on:click={toggleTrackSelection} class="control">{@html icons["settings"].toSvg()}</span>
        </div>
        <span on:click={togglePiP} class="control">{@html icons["minimize-2"].toSvg()}</span>
        <span on:click={toggleFullscreen} class="control">{@html icons["maximize"].toSvg()}</span>
    </div>
</div>