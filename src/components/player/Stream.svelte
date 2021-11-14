<script lang="ts">
    import type {MediaSource, MediaStream} from "$lib/typings/jellyfin";

    export let stream: MediaSource | MediaStream
</script>

<style>
    h2 {
        font-weight: 600;
        font-size: 30px;
    }
    p {
        margin: 0 0 3px 0;
    }

    div {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        flex: 1 1 400px;
        margin: 20px 40px;
    }

    span {
        margin: 5px 0;
    }
    code {
        padding: 4px;
        font-size: calc(var(--size) - 4px);

        border-radius: 5px;
        background-color: var(--background-light);
    }

    span, h2, p {
        word-break: break-all;
    }
</style>

<div>
    <p class="dimmed">{stream.Id ? "Media-Source" : stream.Type} - {stream.Id || stream.Index}</p>
    <h2>{stream.Name || stream.DisplayTitle || stream.Language || "unknown"}</h2>
    {#each Object.keys(stream) as key}
        {#if !["MediaStreams", "RequiredHttpHeaders", "Id", "Formats", "MediaAttachments"].includes(key)}
            <span>{key}: <code>{stream[key]}</code></span>
        {/if}
    {/each}
</div>