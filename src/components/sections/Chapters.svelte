<script lang="ts">
    import ItemImage from "../helper/item/ItemImage.svelte";
    import {session} from "$app/stores";
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import {changeScrollDirection, generatePlayerUrl, ticksToHumanReadable} from "$lib/helper";
    import {createEventDispatcher} from "svelte";
    import {t} from "$lib/i18n";
    import type {Chapter} from "$lib/typings/internal";

    export let itemId: string
    export let chapters: Chapter[] = []

    export let handleClick: boolean = true
    let holder

    const dispatcher = createEventDispatcher()
    const click = (ticks) => dispatcher("click", ticks)
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
    h3 {
        margin: 75px 0;
        color: var(--red);

        font-weight: 600;
        text-align: center;
    }
</style>

<section>
    <ApplyWidth>
        <h1>{$t("chapters")}</h1>
        {#if !chapters || chapters.length === 0}
            <h3>{$t("no_chapters")}</h3>
            {:else}
            <div class="holder" bind:this={holder} on:wheel={event => changeScrollDirection(event, holder)}>
                {#each chapters as chapter, index}
                    <a on:click={() => click(chapter.start)}
                       href={handleClick ? generatePlayerUrl(itemId, chapter.start) : null}
                       class="item">
                        <ItemImage url={`${$session.active.server}/Items/${itemId}/Images/Chapter/${index}?maxWidth=300&tag=${chapter.tag}`} wide />
                        <p>
                            {chapter.name}
                            <span class="dimmed">{ticksToHumanReadable(chapter.start || 0, 10000)}</span>
                        </p>
                    </a>
                {/each}
            </div>
        {/if}
    </ApplyWidth>
</section>