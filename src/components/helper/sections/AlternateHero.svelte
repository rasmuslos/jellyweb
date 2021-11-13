<script lang="ts">
    import {generateItemUrl} from "$lib/helper";
    import HeroActions from "./HeroActions.svelte";
    import type {Item} from "$lib/typings/internal";
    import ItemBadges from "../ItemBadges.svelte";

    export let item: Item
</script>

<style>
    div.wrapper {
        position: relative;

        height: 700px;
        min-height: calc(100vh - 300px);
    }

    div.holder {
        position: absolute;
        padding-right: 30px;

        bottom: 30px;
        left: 50px;
    }

    .heading {
        font-size: 50px;
        line-height: 61px;

        display: block;
        margin-bottom: 0;
    }
    span:not(.dimmed) {
        background: radial-gradient(circle, #8FBCBB 0%, #88C0D0 100%);

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    a, span {
        display: block;
        text-shadow: 0 0 20px black;
    }
    span > a {
        display: inline-block;
    }
</style>

<div class="wrapper">
    <div class="holder">
        {#if item.showData}
            <span class="dimmed"><a href={generateItemUrl(item.showData.seasonId)}>{item.showData.seasonName}</a> - <a href={generateItemUrl(item.showData.showId)}>{item.showData.showName}</a></span>
        {:else if item.showData}
            <span class="dimmed"><a href={generateItemUrl(item.showData.showId)}>{item.showData.showName}</a></span>
        {:else if item.badges}
            <ItemBadges badges={item.badges} />
        {/if}
        <a class="heading" href={generateItemUrl(item.id)}>{item.name}</a>
        {#if item.tagline}
            <span>{item.tagline}</span>
        {/if}
        <HeroActions {item} includeMoreButton={true} />
    </div>
</div>
