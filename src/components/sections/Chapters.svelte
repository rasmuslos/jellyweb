<script lang="ts">
    import {Chapter} from "$lib/typings";
    import ItemImage from "../helper/item/ItemImage.svelte";
    import {session} from "$app/stores";
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import {generatePlayerUrl, ticksToHumanReadable} from "$lib/helper";

    export let itemId: string
    export let chapters: Chapter[]
</script>

<style>
    div.holder {
        display: flex;
        flex-shrink: 0;
        padding-bottom: 20px;

        cursor: grab;
        overflow-y: hidden;
        overflow-x: auto;
    }

    a.item {
        display: grid;
        grid-template-rows: auto auto;
        align-items: center;

        margin: 0 10px;
    }
    p {
        padding: 10px;
        text-align: center;
    }
</style>

<section>
    <ApplyWidth>
        <h1>Chapters</h1>
        <div class="holder">
            {#each chapters as chapter, index}
                <a href={generatePlayerUrl(itemId, chapter.StartPositionTicks)} class="item">
                    <ItemImage url={`${$session.active.server}/Items/${itemId}/Images/Chapter/${index}?maxWidth=300&tag=${chapter.ImageTag}`} wide showProgress={false} isWatchable />
                    <p>{chapter.Name} <span class="dimmed">{ticksToHumanReadable(chapter.StartPositionTicks || 0, 10000)}</span></p>
                </a>
            {/each}
        </div>
    </ApplyWidth>
</section>