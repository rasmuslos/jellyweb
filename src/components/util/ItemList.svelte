<script lang="ts">
    import Item from "../item/Item.svelte";
    import type {Item as ItemType} from "$lib/typings"

    export let items: ItemType[]
    export let overflow: boolean = true
</script>

<div class:overflow>
    {#each items as item}
        <Item {item} />
    {/each}
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
    }
    div.overflow {
        overflow-x: auto;
    }
</style>