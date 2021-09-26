<script lang="ts">
    import {Item as ItemType} from "$lib/typings";
    import {createEventDispatcher} from "svelte";
    import Item from "../item/Item.svelte";

    export let items: ItemType[]
    export let wide: boolean = true

    const dispatcher = createEventDispatcher()
    const handleMouseOver = (item) => dispatcher("mouseover", item)
</script>

<style>
    div.holder {
        display: flex;
        flex-shrink: 0;
        padding-bottom: 20px;

        cursor: grab;
        overflow-y: hidden;
        overflow-x: auto;
    }
</style>

<div class="holder">
    {#each items as item}
        <Item {item} {wide} on:focus={() => handleMouseOver(item.Id)} on:mouseover={() => handleMouseOver(item.Id)} />
    {/each}
</div>