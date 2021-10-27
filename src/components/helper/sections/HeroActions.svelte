<script lang="ts">
    import {like, markAsPlayed, markAsUnplayed, unlike} from "$lib/api/internal";
    import type {Item} from "$lib/typings";
    import {generateItemUrl} from "$lib/helper";
    import {icons} from "feather-icons";
    import WatchNowButton from "../../input/WatchNowButton.svelte";

    export let item: Item

    let isFavorite: boolean = false
    let isWatched: boolean = false
    let processing: boolean = false

    export let includeMoreButton: boolean = true
    export let noButton: boolean = false

    $: isFavorite = item.UserData && item.UserData.IsFavorite
    $: isWatched = item.UserData && (item.UserData.UnplayedItemCount === 0 || item.UserData.Played)

    const isWatchable = item.Type === "Movie" || item.Type === "Episode"

    const toggleLike = async () => {
        if(processing) return
        processing = true

        if(isFavorite) isFavorite = (await unlike(item.Id)).favorite
        else isFavorite = (await like(item.Id)).favorite
        processing = false
    }
    const togglePlayed = async () => {
        if(processing) return
        processing = true

        if(isWatched) isWatched = (await markAsUnplayed(item.Id)).played
        else isWatched = (await markAsPlayed(item.Id)).played
        processing = false
    }
</script>

<style>
    div {
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
    .action.processing {
        animation: spin 5s infinite;
    }
</style>

<div>
    {#key isWatchable, noButton}
        {#if isWatchable && !noButton}
            <WatchNowButton itemId={item.Id} position={item.UserData && item.UserData.PlaybackPositionTicks ? item.UserData.PlaybackPositionTicks : 0} />
        {/if}
    {/key}
    <span class="action" class:processing on:click={togglePlayed}>{@html icons["check"].toSvg(isWatched ? {
        stroke: "var(--highlight)"
    } : {})}</span>
    {#key isFavorite}
                <span class="action" class:liked={item.UserData && item.UserData.IsFavorite} class:processing on:click={toggleLike}>{@html icons["heart"].toSvg(isFavorite ? {
                    fill: "var(--error)",
                    stroke: "var(--error)"
                } : {})}</span>
    {/key}
    {#if includeMoreButton}
        <a class="action" href={generateItemUrl(item.Id)}>{@html icons["info"].toSvg()}</a>
    {/if}
</div>