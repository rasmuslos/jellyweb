<script lang="ts">
    import type {Item} from "$lib/typings";
    import {generateItemUrl} from "$lib/helper";
    import HeroActions from "./HeroActions.svelte";

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
    p {
        width: 500px;
        max-width: 90%;

        margin-top: 17px;
        overflow-y: auto;

        max-height: 300px;
    }
    span:not(.dimmed) {
        background: radial-gradient(circle, #8FBCBB 0%, #88C0D0 100%);

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    a, span, p {
        display: block;
        text-shadow: 0 0 20px black;
    }
    span > a {
        display: inline-block;
    }
</style>

<div class="wrapper">
    <div class="holder">
        {#if item.SeasonName && item.SeriesName && item.SeasonId && item.SeriesId}
            <span class="dimmed"><a href={generateItemUrl(item.SeasonId)}>{item.SeasonName}</a> - <a href={generateItemUrl(item.SeriesId)}>{item.SeriesName}</a></span>
        {:else if item.SeriesName && item.SeriesId}
            <span class="dimmed"><a href={generateItemUrl(item.SeriesId)}>{item.SeriesName}</a></span>
        {/if}
        <a class="heading" href={generateItemUrl(item.Id)}>{item.Name}</a>
        {#if item.Taglines && item.Taglines.length > 0}
            <span>{item.Taglines[0]}</span>
        {/if}
        <HeroActions {item} includeMoreButton={true} />
    </div>
</div>
