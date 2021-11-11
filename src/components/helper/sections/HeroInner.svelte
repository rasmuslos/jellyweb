<script lang="ts">
    import {JellyfinItem} from "$lib/typings/jellyfin";
    import ItemImage from "../item/ItemImage.svelte";
    import {generateItemUrl, getResolutionText} from "$lib/helper";
    import HeroActions from "./HeroActions.svelte";

    export let item: JellyfinItem
    export let tip: string = null
    export let includeMoreButton: boolean = true
    export let reduceOffset: boolean = false

    export let noImage: boolean = false
    export let noButton: boolean = false

    const isWatchable = item.Type === "Movie" || item.Type === "Episode"
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
    div.heading {
        display: grid;
        grid-template-columns: auto 1fr;
    }
    div.badges {
        display: flex;
        align-items: center;

        color: var(--text);
        margin-bottom: 10px;
    }
    div.heading a {
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

    p.tagline {
        background: radial-gradient(circle, #8FBCBB 0%, #88C0D0 100%);

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
        <div>
            <div class="heading">
                <a href={generateItemUrl(item.Id)}>{item.Name}</a>
                <div class="badges">
                    {#if isWatchable}
                        <span>{getResolutionText(item)}</span>
                        <span>{item.HasSubtitles ? "CC" : "/"}</span>
                    {/if}
                    {#if item.OfficialRating}
                        <span>{item.OfficialRating}</span>
                    {/if}
                    {#if item.CommunityRating}
                        <span>{item.CommunityRating}</span>
                    {/if}
                    {#if item.CriticRating}
                        <span>{item.CriticRating}%</span>
                    {/if}
                </div>
            </div>
        </div>
        {#if item.SeasonName && item.SeriesName && item.SeasonId && item.SeriesId}
            <span class="dimmed info"><a href={generateItemUrl(item.SeasonId)}>{item.SeasonName}</a> - <a href={generateItemUrl(item.SeriesId)}>{item.SeriesName}</a></span>
        {:else if item.SeriesName && item.SeriesId}
            <span class="dimmed info"><a href={generateItemUrl(item.SeriesId)}>{item.SeriesName}</a></span>
        {:else if item.Taglines && item.Taglines.length > 0}
            <p class="tagline">{item.Taglines[0]}</p>
        {/if}
        {#if item.Overview !== undefined}
            <p>{item.Overview}</p>
        {/if}
        <HeroActions {item} {includeMoreButton} {noButton} />
    </div>
</div>