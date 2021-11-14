<script lang="ts">
    import {like, markAsPlayed, markAsUnplayed, unlike} from "$lib/api/internal";
    import {generateItemUrl} from "$lib/helper";
    import {icons} from "feather-icons";
    import WatchNowButton from "../../input/WatchNowButton.svelte";
    import type {Item} from "$lib/typings/internal";

    export let item: Item

    let isFavorite: boolean = false
    let isWatched: boolean = false
    let processing: boolean = false

    export let includeMoreButton: boolean = true
    export let noButton: boolean = false

    $: isFavorite = item.favorite
    $: isWatched = item.watched


    const toggleLike = async () => {
        if(processing) return
        processing = true

        if(isFavorite) isFavorite = (await unlike(item.id)).favorite
        else isFavorite = (await like(item.id)).favorite
        processing = false
    }
    const togglePlayed = async () => {
        if(processing) return
        processing = true

        if(isWatched) isWatched = (await markAsUnplayed(item.id)).played
        else isWatched = (await markAsPlayed(item.id)).played
        processing = false
    }
</script>

<style>
    div {
        display: flex;
        align-items: center;
        margin: 20px auto auto 0;
    }

    .action {
        width: 24px;
        height: 24px;

        cursor: pointer;
        margin-left: 12px;
    }
    .action:first-child {
        margin-left: 0;
    }

    .action.liked {
        fill: var(--error);
    }
    .action.processing {
        animation: spin 5s infinite;
    }
</style>

<div>
    {#key item.playable, noButton}
        {#if item.playable && !noButton}
            <WatchNowButton itemId={item.id} position={item.playbackTicks} />
        {/if}
    {/key}
    <span class="action" class:processing on:click={togglePlayed}>{@html icons["check"].toSvg(isWatched ? {
        stroke: "var(--highlight)"
    } : {})}</span>
    {#key isFavorite}
                <span class="action" class:liked={isFavorite} class:processing on:click={toggleLike}>{@html icons["heart"].toSvg(isFavorite ? {
                    fill: "var(--error)",
                    stroke: "var(--error)"
                } : {})}</span>
    {/key}
    {#if includeMoreButton}
        <a class="action" href={generateItemUrl(item.id)}>{@html icons["info"].toSvg()}</a>
    {/if}
</div>