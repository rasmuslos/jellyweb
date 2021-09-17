<script lang="ts">
    import {Item} from "$lib/typings";
    import ItemImage from "./ItemImage.svelte";
    import {getResolutionText} from "$lib/helper";
    import WatchNowButton from "../input/WatchNowButton.svelte";

    export let item: Item
    export let tip: string = null
</script>

<style>
    div.inner {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: normal;

        padding: 0 25px;
        margin: 225px auto;

        width: 100%;
        max-width: 1000px;
    }

    div.image {
        display: block;
        margin: auto;
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
    div.heading {
        display: grid;
        grid-template-columns: auto 1fr;
    }
    div.badges {
        display: flex;
        align-items: center;
    }
    div.heading h1 {
        font-size: 40px;
        font-weight: 600;

        margin: 0 10px 0 0;
    }
    div.heading span {
        margin: 0 5px;
        padding: 5px 7px;
        font-size: 12px;
        border-radius: 7px;
        background-color: var(--background);

        border: 1px solid var(--text);
    }
    div.watch {
        display: block;
        margin: auto auto auto 0;
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
        div.heading {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;

            justify-content: left;
        }
    }

    /* Make text more readable on white backgrounds */
    p, h1, span.tip {
        text-shadow: 1px 1px 2px var(--background);
    }
    span.info {
        text-shadow: 1px 1px 2px var(--text);
    }
</style>

<div class="inner">
    <div class="image">
        {#key item}
            <ItemImage {item} />
        {/key}
    </div>
    <div class="details">
        {#if tip}
            <p class="tip">{tip}</p>
        {/if}
        <div>
            <div class="heading">
                <h1>{item.Name}</h1>
                <div class="badges">
                    <span>{getResolutionText(item)}</span>
                    {#if item.OfficialRating}
                        <span>{item.OfficialRating}</span>
                    {/if}
                    {#if item.CommunityRating}
                        <span>{item.CommunityRating}</span>
                    {/if}
                    {#if item.CriticRating}
                        <span>{item.CriticRating}%</span>
                    {/if}
                    <span>{item.HasSubtitles ? "CC" : "/"}</span>
                </div>
            </div>
            {#if item.SeasonName && item.SeriesName}
                <span class="dimmed info">{item.SeasonName} - {item.SeriesName}</span>
            {/if}
        </div>
        <p>{item.Overview}</p>

        <div class="watch">
            <WatchNowButton />
        </div>
    </div>
</div>