<script lang="ts">
    import ItemImage from "./ItemImage.svelte";
    import {generateItemUrl} from "$lib/helper";
    import type {Item} from "$lib/typings";
    import {icons} from "feather-icons";

    export let item: Item
    export let wide: boolean = true

    const isWatchable = item.Type === "Movie" || item.Type === "Episode"
    const badge = item.UserData && (item.UserData.UnplayedItemCount === 0 || item.UserData.Played) ? icons["check"].toSvg({ stroke: "var(--highlight)" }) : item.UserData && item.UserData.UnplayedItemCount ?? null
</script>

<style>
    a.item {
        display: grid;
        grid-template-rows: auto auto;
        align-items: center;

        transition: transform 200ms ease;

        margin: 0.5% 10px;
        width: 200px;
    }
    a.item.wide {
        width: 300px;
    }

    a:hover {
        transform: scale(1.05);
    }

    span {
        line-break: normal;

        padding: 10px;
        text-align: center;
    }
</style>

<a class:wide href={generateItemUrl(item.Id)} on:focus on:mouseover class="item">
    <ItemImage {wide} {item} {badge} />
    <span>{item.Name}</span>
</a>