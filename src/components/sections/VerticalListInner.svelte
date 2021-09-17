<script lang="ts">
    import {Item} from "$lib/typings";
    import {createEventDispatcher} from "svelte";
    import ItemImage from "./ItemImage.svelte";

    export let items: Item[]
    const dispatcher = createEventDispatcher()
    const handleMouseOver = (item) => dispatcher("mouseover", item)
</script>

<style>
    div.holder {
        display: flex;
        flex-shrink: 0;
        padding-bottom: 20px;

        overflow-y: hidden;
        overflow-x: auto;
    }

    div.item {
        display: grid;
        grid-template-rows: auto auto;
        align-items: center;

        margin: 0 10px;
    }
    span {
        padding: 10px;
        text-align: center;
    }
</style>

<div class="holder">
    {#each items as item}
        <div on:focus={() => handleMouseOver(item)} on:mouseover={() => handleMouseOver(item)} class="item">
            <ItemImage wide {item} />
            <span>{item.Name}</span>
        </div>
    {/each}
</div>