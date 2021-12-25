<script lang="ts">
    import ItemImage from "../item/ItemImage.svelte";
    import {generateItemUrl} from "$lib/helper";
    import HeroActions from "./HeroActions.svelte";
    import type {Item} from "$lib/typings/internal";
    import ItemBadges from "../ItemBadges.svelte";

    export let item: Item
    export let tip: string = null
    export let includeMoreButton: boolean = true
    export let includeActions: boolean = true
    export let reduceOffset: boolean = false

    export let noImage: boolean = false
    export let noButton: boolean = false

    const highlightName = () => {
        let { overview } = item
        item.name.split(" ").forEach(segment => overview = overview.replace(segment, `<b>${segment}</b>`))

        return overview
    }
</script>

<style>
    div.inner {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: normal;

        padding: 0 25px;
        margin: 225px auto 100px auto;

        width: 100%;
        max-width: 1000px;
    }
    div.inner.reduceOffset {
        margin-top: 100px;
    }
    div.inner.noImage {
        grid-template-columns: 1fr;
    }

    div.image {
        display: block;
        margin: 0 auto;
    }

    div.details {
        display: flex;
        flex-direction: column;

        min-height: 300px;
        padding: 0 50px;
    }
    p.tip {
        margin: 0;
        color: var(--highlight);
    }
    a.heading {
        font-size: 40px;
        font-weight: 600;

        margin: 0 10px 0 0;
    }

    @media screen and (max-width: 1000px) {
        div.inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
        }
        div.image {
            display: none;
            margin-bottom: 50px;
        }
    }

    p.tagline {
        margin: 0;
        color: var(--highlight);
        /*
        background: radial-gradient(circle, #8FBCBB 0%, #88C0D0 100%);

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        */
    }
    p.overview {
        margin-bottom: 5px;
    }
    p.overview :global(b) {
        color: var(--highlight);
    }

    @media screen and (max-width: 1000px) {
        div.inner {
            margin-bottom: 100px;
        }
    }

    span, p {
        text-shadow: 0 0 20px black;
    }
</style>

<div class="inner" class:reduceOffset class:noImage>
    {#if !noImage}
        <div class="image">
            {#key item}
                <ItemImage {item} />
            {/key}
        </div>
    {/if}
    <div class="details">
        {#if tip}
            <p class="tip">{tip}</p>
        {/if}
        <a class="heading" href={generateItemUrl(item.id)}>{item.name}</a>
        {#if item.tagline}
            <p class="tagline">{item.tagline}</p>
        {:else if item.type === "season" && item.showData}
            <span class="dimmed"><a href={generateItemUrl(item.showData.showId)}>{item.showData.showName}</a></span>
        {:else if item.showData}
            <span class="dimmed"><a href={generateItemUrl(item.showData.seasonId)}>{item.showData.seasonName}</a> - <a href={generateItemUrl(item.showData.showId)}>{item.showData.showName}</a></span>
        {/if}
        {#if item.overview}
            {#if item.type == null}
                <p class="overview">{@html highlightName()}</p>
            {:else}
                <p class="overview">{item.overview}</p>
            {/if}
        {/if}
        {#if item.badges}
            <ItemBadges badges={item.badges} />
        {/if}
        {#if includeActions}
            <HeroActions {item} {includeMoreButton} {noButton} />
        {/if}
    </div>
</div>