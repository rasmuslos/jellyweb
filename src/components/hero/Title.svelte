<script lang="ts">
    import type {Item} from "$lib/typings";
    import {wrap} from "$lib/helper";
    import Image from "../item/Image.svelte";
    import ApplyMeasurements from "../ApplyMeasurements.svelte";
    import {getItemPath} from "$lib/helper";

    export let item: Item
</script>

<ApplyMeasurements>
    <div class="wrapper">
        {#if item.seriesInfo}
            <a href={getItemPath(item.seriesInfo.show)}>
                <Image url={wrap(item.seriesInfo.primaryImage?.url)} alt={item?.seriesInfo.showName} />
            </a>
        {:else}
            <Image url={wrap(item.images?.primary.url)} alt={item.name} />
        {/if}
        <div class="holder">
            <h1>{item.name}</h1>
        </div>
    </div>
</ApplyMeasurements>

<style>
    div.wrapper {
        display: grid;
        grid-template-columns: 200px auto;

        margin: 100px auto;

        max-width: 700px;
        height: 300px;

        align-items: center;
        justify-content: center;

        overflow: hidden;
    }
    a {
        height: 100%;
        width: 100%;
    }

    div.holder {
        margin-left: 25px;
        padding-left: 25px;
        border-left: 2px solid var(--grey);

        height: min(calc(100% - 20px), fit-content);
        overflow: hidden;
    }
    h1 {
        font-size: 50px;
        margin: 0;
    }

    :global(#root.mobile) div.wrapper {
        height: unset;
        margin: 25px 0;

        grid-template-columns: 1fr;
        grid-template-rows: 250px auto;
    }
    :global(#root.mobile) a {
        display: block;
        margin: 0 auto;

        width: 100%;
    }
    :global(#root.mobile) div.holder {
        padding: 0;
        margin: 0;
        border: none;

        text-align: center;
    }
</style>

