<script lang="ts">
    import type {Item} from "$lib/typings";
    import {activeMediaSource, modal} from "$lib/stores";
    import {icons} from "feather-icons";

    export let item: Item

    let mediaSources = item.MediaSources
    let mediaSource = mediaSources.find(source => source.Id === $activeMediaSource)
    let audioStreams = mediaSource.MediaStreams.filter(stream => stream.Type === "Audio")
    let subtitleStreams = mediaSource.MediaStreams.filter(stream => stream.Type === "Subtitle")
</script>

<style>
    div.holder {
        position: relative;
        overflow: hidden;

        height: 100%;
        width: 100%;
        max-width: 400px;

        border-radius: 10px;
        background-color: var(--background-light);

        margin: 0 auto;
        padding: 20px;

        color: var(--text);
        font-family: var(--font);
    }
    div.close {
        position: absolute;
        top: 15px;
        right: 20px;

        cursor: pointer;
    }

    h1 {
        text-align: center;
    }
</style>

<div class="holder">
    <div class="close" on:click={() => modal.set(null)}>{@html icons["x"].toSvg({ height: 17, width: 17, stroke: "var(--text)" })}</div>

    <h1>Playback-Settings</h1>

    Video
    <select disabled={mediaSources.length < 2}>
        {#each mediaSources as {Id, Name}}
            <option>{Name}</option>
        {/each}
    </select>

    <br>
    Audio
    <select disabled={audioStreams.length < 2}>
        {#each audioStreams as {Index, Title, Language}}
            <option>{Title ?? Language}</option>
        {/each}
    </select>

    <br>
    Subtitle
    <select disabled={subtitleStreams.length < 2}>
        {#each subtitleStreams as {Index, Title, Language}}
            <option>{Title ?? Language}</option>
        {/each}
    </select>
</div>