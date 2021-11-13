<script lang="ts">
    import type {Badges} from "$lib/typings/internal";
    import Tomato from "./../assets/icons/tomato.svelte"
    import {icons} from "feather-icons";

    export let badges: Badges
</script>

<style>
    div {
        display: flex;
        align-items: end;
    }

    span {
        font-size: 14px;
        color: var(--dimmed);

        margin-right: 5px;
        transition: color 250ms ease;

        /*
        text-shadow: 1px 1px 0 black;
        */
    }
    span:hover {
        color: var(--white);
    }

    div :global(svg:not(:first-child)) {
        margin-left: 3px;
    }
    div :global(svg) {
        margin-right: 3px;
    }
</style>

<div>
    {#if badges.criticRating}
        <Tomato height="14px" width="14px" />
        <span>{badges.criticRating}%</span>
    {/if}
    {#if badges.communityRating}
        {@html icons["star"].toSvg({ height: 14, width: 14 })}
        <span>{badges.communityRating}</span>
    {/if}
    {#if badges.resolution}
        <span>{badges.resolution}</span>
    {/if}
    {#if badges.videoRange}
        <span>{badges.videoRange}</span>
    {/if}
    {#if badges.hasSubtitles}
        <span>CC</span>
    {/if}
    {#if badges.ageRating}
        <span>{badges.ageRating}</span>
    {/if}
</div>