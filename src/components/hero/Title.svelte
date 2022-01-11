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
        <a href={getItemPath(item.seriesInfo?.show)}>
            <Image url={wrap(item.seriesInfo?.primaryImage?.url)} alt={item?.seriesInfo?.showName} />
        </a>
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
    }
    a {
        height: 100%;
        width: 100%;
    }

    div.holder {
        margin-left: 25px;
        padding-left: 25px;
        border-left: 2px solid var(--grey);
    }
    h1 {
        font-size: 50px;
    }
</style>

