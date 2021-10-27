<script lang="ts">
    import ItemImage from "./ItemImage.svelte";
    import {generateItemUrl, getLargeBackdrop} from "$lib/helper";
    import type {Item} from "$lib/typings";
    import {icons} from "feather-icons";
    import HeroActions from "../sections/HeroActions.svelte";
    import BackgroundSection from "../sections/BackgroundSection.svelte";

    export let item: Item
    export let wide: boolean = true

    const isWatchable = item.Type === "Movie" || item.Type === "Episode"
    const badge = item.UserData && (item.UserData.UnplayedItemCount === 0 || item.UserData.Played) ? icons["check"].toSvg({ stroke: "var(--highlight)" }) : item.UserData && item.UserData.UnplayedItemCount || null

    let expandTimeout: number
    let expanded: boolean = false

    const handleMouseEnter = () => expandTimeout = window.setTimeout(() => expanded = true, 1000)
    const handleMouseLeave = () => {
        expanded = false
        clearTimeout(expandTimeout)
    }
</script>

<style>
    .holder {
        position: relative;
        display: block;

        flex-shrink: 0;
        margin: 0.5% 10px;

        min-height: 300px;
        width: 200px;
    }
    .holder.wide {
        width: 300px;
        min-height: 170px;
    }

    a.item {
        display: grid;
        grid-template-rows: auto auto;
        align-items: center;

        transition: transform 200ms ease;
        width: 100%;
    }

    a:hover {
        transform: scale(1.05);
    }

    span.title {
        line-break: normal;

        padding: 10px;
        text-align: center;
    }

    a.item.expanded {
        position: absolute;
        box-sizing: content-box;

        width: 400px;

        bottom: 0;
        z-index: 2;

        display: grid;
        grid-template-rows: 1fr auto;

        overflow: hidden;

        background-color: var(--background-secondary);
        border-radius: 10px;
    }
    div.image {
        width: 100%;
        height: 200px;
    }
    div.inner {
        padding: 20px;
    }

    h2 {
        margin-bottom: 0;
    }

    span.tagline {
        background: radial-gradient(circle, #8FBCBB 0%, #88C0D0 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

    }
    div.actions {
        margin-top: 20px;
    }
</style>

<div class:wide on:focus on:mouseover class="holder">
    <a class="item" class:expanded href={generateItemUrl(item.Id)} on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
        {#if expanded}
            <div class="image">
                <BackgroundSection url={getLargeBackdrop(item)} />
            </div>
            <div class="inner">
                <h2>{item.Name}</h2>
                {#if item.Taglines && item.Taglines.length > 0}
                    <span class="tagline">{item.Taglines[0]}</span>
                {:else if item.SeasonName && item.SeriesName && item.SeasonId && item.SeriesId}
                    <span class="dimmed"><a href={generateItemUrl(item.SeasonId)}>{item.SeasonName}</a> - <a href={generateItemUrl(item.SeriesId)}>{item.SeriesName}</a></span>
                {:else if item.SeriesName && item.SeriesId}
                    <span class="dimmed"><a href={generateItemUrl(item.SeriesId)}>{item.SeriesName}</a></span>
                {/if}
                <div class="actions">
                    <HeroActions {item} />
                </div>
            </div>
        {:else}
            <ItemImage {wide} {item} {badge} />
            <span class="title">{item.Name}</span>
        {/if}
    </a>
</div>