<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import Item from "../item/Item.svelte";
    import {changeScrollDirection} from "$lib/helper";

    export let items: Item[]
    export let wide: boolean = true
    export let small: boolean = false

    let holder

    const dispatcher = createEventDispatcher()
    const handleMouseOver = id => dispatcher("mouseover", id)
</script>

<style>
    h1 {
        margin: 50px 0;
        font-weight: 400;

        text-align: center;
        color: var(--red);
    }

    div.wrapper {
        padding-bottom: 25px;
        margin: -200px 0;
    }
    div.holder {
        display: flex;
        flex-shrink: 0;

        padding: 200px 0;

        align-items: start;
        overflow-x: auto;
    }
    div.holder {
        scrollbar-width: none;
    }
    div.holder::-webkit-scrollbar {
        display: none;
    }
</style>

{#if items && items.length > 0}
    <div class="wrapper">
        <div class="holder" bind:this={holder} on:wheel={event => changeScrollDirection(event, holder)}>
            {#each items as item}
                <Item {item} {wide} {small} on:focus={() => handleMouseOver(item.id)} on:mouseover={() => handleMouseOver(item.id)} />
            {/each}
        </div>
    </div>
{:else}
    <h1>No Items</h1>
{/if}