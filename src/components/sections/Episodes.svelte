<script lang="ts">
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import type {Item} from "$lib/typings/internal";
    import {t} from "$lib/i18n"
    import {generateItemUrl} from "$lib/helper";
    import {icons} from "feather-icons";

    export let selected: string
    export let showId: string

    export let seasons: Item[]
    export let episodes: Item[]

    selected = selected ?? seasons[0].id

    let expanded
    let active

    $: active = seasons.find(seasons => seasons.id === selected)
</script>

<style>
    h3 {
        margin: 75px 0;
        color: var(--error);

        font-weight: 600;
        text-align: center;
    }

    div.seasons {
        position: relative;
        display: inline-block;
    }
    div.content {
        position: absolute;
        z-index: 2;

        display: none;
        flex-direction: column;

        background-color: var(--background-light);
    }

    h1 {
        width: 100%;
        margin: 0;
    }
    div.content a {
        padding: 20px;

        white-space: nowrap;
        word-break: keep-all;
    }

    div.seasons:hover div.content, div.seasons.expanded div.content {
        display: flex;
    }

    h1 :global(svg) {
        margin-left: 3px;
        transition: transform 250ms ease;
    }
    div.seasons:hover h1 :global(svg), .seasons.expanded h1 :global(svg) {
        transform: rotate(180deg);
    }
</style>

<section>
    <ApplyWidth>
        {#if active == null}
            <h3>{$t("episodes.error")}</h3>
        {:else}
            <div class:expanded class="seasons">
                <h1 class="active" on:click={() => expanded = !expanded}>{active.name}{@html icons["chevron-down"].toSvg()}</h1>
                <div class="content" on:click={() => expanded = false}>
                    {#each seasons as {id, name}}
                        <a href={generateItemUrl(showId, id)} on:click|preventDefault={() => selected = id}>{name}</a>
                    {/each}
                </div>
            </div>
            <div class="episodes">
                {#if !episodes || episodes.length < 1}
                    <h3>{$t("episodes.loading")}</h3>
                {:else}
                    {#each episodes as episode}
                    {/each}
                {/if}
            </div>
        {/if}
    </ApplyWidth>
</section>