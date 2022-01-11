<script lang="ts">
    import type {Chapter} from "$lib/typings";
    import ApplyMeasurements from "../ApplyMeasurements.svelte";
    import Image from "../item/Image.svelte";
    import {wrap} from "$lib/helper";
    import {applyMaxWidth} from "$lib/helper";
    import {_} from "svelte-i18n";

    export let chapters: Chapter[]
</script>

<ApplyMeasurements>
    <h2>{$_("items.sections.chapters")}</h2>
    <div class="wrapper">
        {#each chapters as { name, image }, index}
            <!--TODO: GOTO Player-->
            <a class="holder">
                <Image alt="Chapter {index}" url={wrap(applyMaxWidth(image.url, 300))} />
                <span>{name}</span>
            </a>
        {/each}
    </div>
</ApplyMeasurements>

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
    }
    .holder {
        display: grid;
        grid-template-rows: min(25vw, 125px) auto;
        grid-template-columns: 1fr;
        flex: min(calc(25vw * 2), 250px) 0 0;

        margin: 0 15px;

        background-color: transparent;
        color: transparent;
    }
    span {
        margin-top: 10px;

        text-align: center;
        color: var(--grey);
    }
</style>