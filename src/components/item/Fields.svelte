<script lang="ts">
    import type {ExtendedItem} from "$lib/typings";
    import {convertStreamsToText, getStreamsOfType} from "$lib/helper";
    import ApplyMeasurements from "../ApplyMeasurements.svelte";

    type Fields = Array<{
        title: string,
        values: Array<{
            title: string,
            value: any,
        }>
    }>

    export let item: ExtendedItem

    let fields: Fields = [
        {
            title: "General",
            values: [
                { title: "Released", value: new Date(item.release ?? 0).getFullYear() },
                { title: "Rating", value: item.rating },
                { title: "Runtime (MS)", value: item.runtime },
            ],
        },
        {
            title: "Media",
            values: [
                { title: "Container", value: item.mediaSources?.map(({ container }) => container)?.join(", ") },
                { title: "Codec", value: getStreamsOfType(item.mediaSources, "video").map(streams => streams.map(({ codec }) => codec).join(", ")).join(", ") },
                { title: "Bitrate", value: item.mediaSources?.map(({ bitrate }) => bitrate)?.map(bitrate => `${bitrate} Mbps`).join(", ") },
            ],
        },
        {
            title: "Streams",
            values: [
                { title: "Count", value: item.mediaSources?.map(({ mediaStreams }) => mediaStreams?.length)?.reduce((a, b) => a + b, 0) },
                { title: "Languages", value: convertStreamsToText(item.mediaSources, "audio") },
                { title: "Subtitles", value: convertStreamsToText(item.mediaSources, "subtitle") },
            ],
        },
    ]
</script>

<div class="holder">
    <ApplyMeasurements>
        <div class="specs">
            {#each fields as { title, values }}
                <div class="fields">
                    <h3>{title}</h3>
                    {#each values as { title, value }}
                        <div class="field">
                            <b>{title}</b>
                            <span>{value}</span>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </ApplyMeasurements>
</div>

<style>
    div.holder {
        color: var(--grey);
        background-color: var(--background-secondary);
    }

    div.specs {
        padding: 50px;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    div.specs div.fields {
        flex: 1 0 calc(33% - 30px);
        margin: 10px 0;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }
    div.specs div.fields h3 {
        color: var(--text);
        margin: 0 0 7px 0;
    }
    div.specs div.fields div.field {
        flex: 0 0 auto;
        margin: 5px 0;

        height: fit-content;
        width: fit-content;

        display: flex;
        flex-direction: column;
    }

    :global(#root.mobile) div.specs {
        padding: 25px;
        border-radius: 0;
    }
    :global(#root.mobile) div.specs div.fields {
        flex: 1 1 300px;
    }
</style>