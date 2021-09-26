<script lang="ts">
    import ItemImage from "./ItemImage.svelte";
    import {generateItemUrl} from "$lib/helper";
    import type {Item} from "$lib/typings";

    export let item: Item
    export let wide: boolean = true

    const isWatchable = item.Type === "Movie" || item.Type === "Episode"
</script>

<style>
    a.item {
        display: grid;
        grid-template-rows: auto auto;
        align-items: center;

        margin: 0 10px;

        width: 200px;
    }
    a.item.wide {
        width: 300px;
    }

    span {
        line-break: normal;

        padding: 10px;
        text-align: center;
    }
</style>

<a class:wide href={generateItemUrl(item.Id)} on:focus on:mouseover class="item">
    <ItemImage {wide} {item} />
    <span>{item.Name}</span>
</a>