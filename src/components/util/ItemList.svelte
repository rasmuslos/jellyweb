<script lang="ts">
    import List from "./List.svelte";
    import type {Item as ItemType} from "$lib/typings";
    import Item from "../item/Item.svelte";

    export let items: ItemType[]
</script>

<List {...$$props}>
    {#each items as item}
        <Item {item} {...$$props} />
    {/each}
</List>