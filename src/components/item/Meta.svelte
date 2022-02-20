<script lang="ts">
    import type {Item} from "$lib/typings";
    import {getItemPath, getVideoRange} from "$lib/helper";
    import {icons} from "feather-icons";

    export let item: Item

    let range: string
    $: range = getVideoRange(item)
</script>

<div class="meta">
    {#if item.seriesInfo}
        <a href={getItemPath(item.seriesInfo.show)} sveltekit:prefetch>{item.seriesInfo.showName}</a>
        {#if item.seriesInfo.season}
            · <a href={getItemPath(item.seriesInfo.season)} sveltekit:prefetch>{item.seriesInfo.seasonName}</a>
        {/if}
        <span class="separator"></span>
    {/if}
    {#if item.ratings?.audience}
        <span>{@html icons["star"].toSvg({ "fill": "#F5C518", "stroke": "#F5C518", })} {item.ratings?.audience}</span>
    {/if}
    {#if item.ratings?.critic}
        <span>{item.ratings?.critic}%</span>
    {/if}
    {#if range}
        <span>{range.toUpperCase()}</span>
    {/if}
    {#if item.externalIds?.imdb}
        <a href="https://www.imdb.com/title/{item.externalIds?.imdb ?? `nm0000093`}" rel="noopener" target="_blank">
            <img class="imdb-logo" src="/assets/images/imdb.png" alt="IMDB" />
        </a>
    {/if}
    {#if item.ratings?.audience || item.ratings?.critic || range || item.externalIds?.imdb}
        <span class="separator"></span>
    {/if}
    {#if item.genres?.length}
        {#each item.genres as {id, name}}
            <a href={getItemPath(id)} sveltekit:prefetch>{name}</a>
        {/each}
    {/if}
</div>

<style>
    div.meta {
        color: var(--grey);
    }
    div.meta :global(svg) {
        position: relative;
        top: 1px;

        height: 15px;
        width: 15px;
    }

    span:not(.separator) {
        padding: 1px;
    }
    a {
        padding: 3px;
    }

    span.separator {
        padding-right: 5px;
        margin-right: 5px;
        border-right: 1px solid var(--grey);
    }
    .imdb-logo {
        position: relative;
        top: 4px;

        height: 20px;
        width: 20px;
    }
</style>