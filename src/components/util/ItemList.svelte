<script lang="ts">
    import List from "./List.svelte";
    import {Item as ItemType} from "$lib/typings";
    import Item from "../item/Item.svelte";

    export let title: string
    export let items: ItemType[]
</script>

<List {...$$props}>
    {#each items as item}
        <Item {item} />
    {/each}
</List>