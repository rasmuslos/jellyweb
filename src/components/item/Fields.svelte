<script lang="ts">
    import type {ExtendedItem} from "$lib/typings";
    import {convertStreamsToText, getStreamsOfType} from "$lib/helper";
    import ApplyMeasurements from "../ApplyMeasurements.svelte";
import { _ } from "svelte-i18n";

    type Fields = Array<{
        i18n: string,
        values: Array<{
            title: string,
            value: any,
        }>
    }>

    export let item: ExtendedItem

    let fields: Fields = [
        {
            i18n: "general",
            values: [
                { title: "released", value: new Date(item.release ?? 0).getFullYear() },
                { title: "rating", value: item.rating },
                { title: "runtime", value: item.runtime },
            ],
        },
        {
            i18n: "media",
            values: [
                { title: "containers", value: item.mediaSources?.map(({ container }) => container)?.join(", ") },
                { title: "codec", value: getStreamsOfType(item.mediaSources, "video").map(streams => streams.map(({ codec }) => codec).join(", ")).join(", ") },
                { title: "bitrate", value: item.mediaSources?.map(({ bitrate }) => bitrate)?.map(bitrate => `${bitrate} Mbps`).join(", ") },
            ],
        },
        {
            i18n: "streams",
            values: [
                { title: "count", value: item.mediaSources?.map(({ mediaStreams }) => mediaStreams?.length)?.reduce((a, b) => a + b, 0) },
                { title: "audio", value: convertStreamsToText(item.mediaSources, "audio") },
                { title: "subtitles", value: convertStreamsToText(item.mediaSources, "subtitle") },
            ],
        },
    ]
</script>

<div class="holder">
    <ApplyMeasurements>
        <div class="specs">
            {#each fields as { i18n, values }}
                <div class="fields">
                    <h3>{$_(`items.fields.${i18n}.title`)}</h3>
                    {#each values as { title, value }}
                        <div class="field">
                            <b>{$_(`items.fields.${i18n}.${title}`)}</b>
                            <span>{value}</span>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </ApplyMeasurements>
</div>

<style lang="less">
    div.holder {
        color: var(--grey);
        background-color: var(--background-secondary);
    }

    div.specs {
        padding: 50px;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        div.fields {
            flex: 1 0 calc(33% - 30px);
            margin: 10px 0;

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;

            h3 {
                color: var(--text);
                margin: 0 0 7px 0;
            }
            div.field {
                flex: 0 0 auto;
                margin: 5px 0;

                height: fit-content;
                width: fit-content;

                display: flex;
                flex-direction: column;
            }
        }
    }

    :global(#root.mobile) {
        div.specs {
            padding: 25px;
            border-radius: 0;

            div.fields {
                flex: 1 1 300px;
            }
        }
    }
</style>