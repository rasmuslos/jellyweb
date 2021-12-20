<script lang="ts">
    import ItemImage from "./ItemImage.svelte";
    import {generateItemUrl, getBadge} from "$lib/helper";
    import HeroActions from "../sections/HeroActions.svelte";
    import type {Item} from "$lib/typings/internal";

    export let item: Item
    export let wide: boolean = false
    export let small: boolean = false

    let link: HTMLAnchorElement

    const badge = getBadge(item)

    let expandTimeout: number
    let expanded: boolean = false

    const handleMouseEnter = () => expandTimeout = window.setTimeout(() => {
        if(window && window.matchMedia && window.matchMedia("screen and (max-width: 1000px)").matches) return

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

        transition: width 500ms ease, left 500ms ease, right 500ms ease, bottom 500ms ease;
        width: 100%;
    }

    a:hover {
        transform: scale(1.05);
    }

    span.title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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

    div.expanded {
        padding: 20px;
    }

    h2 {
        margin-bottom: 0;
    }

    @media screen and (max-width: 1000px) {
        .holder:not(.wide), .holder.small {
            width: min(calc(33vw - 20px), 133px);
            min-height: min(calc((33vw - 20px) * 1.66), 133px);
        }
    }
</style>

<div class:wide class:small on:focus on:mouseover class="holder">
    <a class="item" class:expanded href={generateItemUrl(item.id)} on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} bind:this={link}>
        <ItemImage {wide} {small} {item} {badge} stretch={expanded} />
        {#if expanded}
            <div class="expanded">
                <h2>{item.name}</h2>
                {#if item.overview}
                    {#if item.tagline}
                        <p class="tagline">{item.tagline}</p>
                    {:else if item.type === "season" && item.showData}
                        <span class="dimmed"><a href={generateItemUrl(item.showData.showId)}>{item.showData.showName}</a></span>
                    {:else if item.showData}
                        <span class="dimmed"><a href={generateItemUrl(item.showData.seasonId)}>{item.showData.seasonName}</a> - <a href={generateItemUrl(item.showData.showId)}>{item.showData.showName}</a></span>
                    {/if}
                {/if}
                <HeroActions {item} />
            </div>
        {:else}
            <span class="title">{item.name}</span>
        {/if}
    </a>
</div>