<script lang="ts">
    import type {Item} from "$lib/typings";
    import ApplyWidth from "./ApplyWidth.svelte";
    import {generateItemUrl} from "$lib/helper";
    import HeroActions from "./HeroActions.svelte";

    export let item: Item
</script>

<style>
    div.wrapper {
        height: 750px;
        display: flex;
    }

    div.holder {
        position: relative;
        margin-top: auto;
        max-width: 100%;
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

    div.watch {
        margin-top: 30px;
    }

    a, span, p {
        text-shadow: 0 0 20px black;
    }
</style>

<ApplyWidth>
    <div class="wrapper">
        <div class="holder">
            <a class="heading" href={generateItemUrl(item.Id)}>{item.Name}</a>
            {#if item.Taglines && item.Taglines.length > 0}
                <span>{item.Taglines[0]}</span>
            {/if}
            <p>{item.Overview}</p>
            {#if item.SeasonName && item.SeriesName && item.SeasonId && item.SeriesId}
                <span class="dimmed"><a href={generateItemUrl(item.SeasonId)}>{item.SeasonName}</a> - <a href={generateItemUrl(item.SeriesId)}>{item.SeriesName}</a></span>
            {:else if item.SeriesName && item.SeriesId}
                <span class="dimmed"><a href={generateItemUrl(item.SeriesId)}>{item.SeriesName}</a></span>
            {/if}
            <div class="watch">
                <HeroActions {item} includeMoreButton={true} />
            </div>
        </div>
    </div>
</ApplyWidth>
