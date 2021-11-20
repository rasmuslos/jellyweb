<script lang="ts">
    import ItemImage from "./ItemImage.svelte";
    import {generateImageUrl, generateItemUrl, getBadge} from "$lib/helper";
    import HeroActions from "../sections/HeroActions.svelte";
    import BackgroundSection from "../sections/BackgroundSection.svelte";
    import type {Item} from "$lib/typings/internal";
    import ItemBadges from "../ItemBadges.svelte";

    export let item: Item
    export let wide: boolean
    export let small: boolean

    let link: HTMLAnchorElement

    const badge = getBadge(item)

    let expandTimeout: number
    let expanded: boolean = false

    const handleMouseEnter = () => expandTimeout = window.setTimeout(() => {
        link.style.left = null
        link.classList.remove("center")

        expanded = true
        calculateBounds()
    }, 1000)
    const handleMouseLeave = () => {
        link.style.left = null
        link.classList.remove("center")

        expanded = false
        clearTimeout(expandTimeout)
    }

    const calculateBounds = () => {
        if(!link) return

        const parentRect = link.parentElement.parentElement.getBoundingClientRect()
        const rect = link.getBoundingClientRect()
        const modifier =  + (wide ? 50 : 100)

        const left = parentRect.left - rect.left
        const right = parentRect.right - rect.right

        if(left + modifier > 0) link.style.left = `${left}px`
        else if(right - modifier < 0) link.style.right = `${Math.abs(right)}px`
        else link.classList.add("center")
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
    .holder.small {
        min-height: 200px;
        width: 133px;
    }
    .holder.wide {
        width: 300px;
        min-height: 170px;
    }

    a.item {
        display: grid;
        grid-template-rows: auto auto;
        align-items: center;

        transition: bottom 500ms ease, width 500ms ease, left 500ms ease, right 500ms ease, bottom 500ms ease;
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
        z-index: 2;

        bottom: -20px;

        display: grid;
        grid-template-rows: 1fr auto;

        overflow: hidden;

        background-color: var(--background-secondary);
        border-radius: 10px;
    }
    a.item.expanded:global(.center) {
        left: 50%;
        transform: translate(-50%);
    }

    div.image {
        width: 100%;
        height: 200px;
    }
    div.inner {
        padding: 20px;

        border: 1px solid var(--background);
        border-top: none;

        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
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

<div class:wide class:small on:focus on:mouseover class="holder">
    <a class="item" class:expanded href={generateItemUrl(item.id)} on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} bind:this={link}>
        {#if expanded}
            <div class="image">
                <BackgroundSection url={generateImageUrl(item.images.wide.parent ? item.showData.showId : item.id, item.images.wide.tag, "Backdrop")} />
            </div>
            <div class="inner">
                {#if item.badges}
                    <ItemBadges badges={item.badges} />
                {/if}
                <h2>{item.name}</h2>
                {#if item.tagline}
                    <span class="tagline">{item.tagline}</span>
                {:else if item.showData && item.type === "season"}
                    <span class="dimmed"><a href={generateItemUrl(item.showData.showId)}>{item.showData.showName}</a></span>
                {:else if item.showData}
                    <span class="dimmed"><a href={generateItemUrl(item.showData.seasonId)}>{item.showData.seasonName}</a> - <a href={generateItemUrl(item.showData.showId)}>{item.showData.showName}</a></span>
                {/if}
                <div class="actions">
                    <HeroActions {item} />
                </div>
            </div>
        {:else}
            <ItemImage {wide} {small} {item} {badge} />
            <span class="title">{item.name}</span>
        {/if}
    </a>
</div>