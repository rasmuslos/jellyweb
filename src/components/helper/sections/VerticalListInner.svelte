<script lang="ts">
    import {Item as ItemType} from "$lib/typings";
    import {createEventDispatcher} from "svelte";
    import Item from "../item/Item.svelte";
    import {changeScrollDirection} from "$lib/helper";

    export let items: ItemType[]
    export let wide: boolean = true

    let holder
    export let big: boolean = true

    const dispatcher = createEventDispatcher()
    const handleMouseOver = (item) => dispatcher("mouseover", item)
</script>

<style>
    h1 {
        margin: 50px 0;
        font-weight: 400;

        text-align: center;
        color: var(--error);
    }

    div.wrapper.big {
        margin: -200px;
    }
    div.holder {
        display: flex;
        flex-shrink: 0;

        cursor: grab;
        overflow-x: auto;
    }
    div.holder.big {
        padding: 200px;
    }
</style>

{#if items && items.length > 0}
    <div class:big class="wrapper">
        <div class:big class="holder" bind:this={holder} on:wheel|preventDefault={event => changeScrollDirection(event, holder)}>
            {#each items as item}
                <Item {item} {wide} on:focus={() => handleMouseOver(item.Id)} on:mouseover={() => handleMouseOver(item.Id)} />
            {/each}
        </div>
    </div>
{:else}
    <h1>No Items</h1>
{/if}