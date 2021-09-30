<script lang="ts">
    import {Item} from "$lib/typings";
    import ItemImage from "../item/ItemImage.svelte";
    import {generateItemUrl, getResolutionText} from "$lib/helper";
    import WatchNowButton from "../../input/WatchNowButton.svelte";
    import {icons} from "feather-icons";
    import {like, unlike} from "$lib/api/internal";

    export let item: Item
    export let tip: string = null
    export let includeMoreButton: boolean = true
    export let reduceOffset: boolean = false

    let isFavorite: boolean = false
    let processingLike: boolean = false
    $: isFavorite = item.UserData && item.UserData.IsFavorite
    const isWatchable = item.Type === "Movie" || item.Type === "Episode"

    const toggleLike = async () => {
        processingLike = true

        if(isFavorite) isFavorite = (await unlike(item.Id)).favorite
        else isFavorite = (await like(item.Id)).favorite
        processingLike = false
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
    div.actions {
        display: flex;
        align-items: center;
        margin: auto auto auto 0;
    }
    .action {
        width: 24px;
        height: 24px;

        cursor: pointer;
        margin-left: 12px;
    }
    .action.liked {
        fill: var(--error);
    }
    .action.processingLike {
        animation: spin 5s infinite;
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

    @media screen and (max-width: 1000px) {
        div.inner {
            margin-bottom: 100px;
        }
    }
</style>

<div class="inner" class:reduceOffset>
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
            {#if item.SeasonName && item.SeriesName && item.SeasonId && item.SeriesId}
                <span class="dimmed info"><a href={generateItemUrl(item.SeasonId)}>{item.SeasonName}</a> - <a href={generateItemUrl(item.SeriesId)}>{item.SeriesName}</a></span>
            {/if}
        </div>
        {#if item.Overview !== undefined}
            <p>{item.Overview}</p>
        {/if}

        <div class="actions">
            {#if isWatchable}
                <WatchNowButton itemId={item.Id} position={item.UserData && item.UserData.PlaybackPositionTicks ? item.UserData.PlaybackPositionTicks : 0} />
            {/if}
            {#key isFavorite}
                <span class="action" class:liked={item.UserData && item.UserData.IsFavorite}
                      class:processingLike on:click={toggleLike}>{@html icons["heart"].toSvg(isFavorite ? {
                    fill: "var(--error)",
                    stroke: "var(--error)"
                } : {})}</span>
            {/key}
            {#if includeMoreButton}
                <a class="action" href={generateItemUrl(item.Id)}>{@html icons["external-link"].toSvg()}</a>
            {/if}
        </div>
    </div>
</div>