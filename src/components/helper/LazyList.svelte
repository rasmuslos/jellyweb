<script lang="ts">
    import {Item as ItemType} from "$lib/typings";
    import IntersectionObserver from './IntersectionObserver.svelte'
    import {onDestroy} from "svelte";
    import Item from "./Item.svelte";
    import {getItemsBasedOnQuery} from "$lib/api/internal";
    import {icons} from "feather-icons";
    import {scrollUp} from "$lib/helper";
    import {dev} from "$app/env";

    let prevQuery: string = ""
    export let query: string = ""
    if(query.startsWith("?") || query.startsWith("&") || query === "") throw new Error("Query cannot be empty or start with ? or &")

    let items: ItemType[] = []
    let intersecting: boolean = false

    let loading = false
    let end = false

    $: {
        if(query !== prevQuery) items = []
        prevQuery = query
    }

    // This is really ugly but other attempts failed and it works, so i guess it will stay
    const interval = setInterval(async () => {
        if(intersecting && !loading && !end) {
            loading = true

            const newItems: ItemType[] = await getItemsBasedOnQuery(`limit=30&startIndex=${items.length}&${query}`)
            if(newItems.length === 0) end = true
            else items = [...items, ...newItems]

            loading = false
        }
    }, 1)
    onDestroy(() => clearInterval(interval))
</script>

<style>
    div.holder {
        display: flex;
        flex-wrap: wrap;

        align-items: center;
        justify-content: center;

        margin: 0 auto;
        padding-bottom: 20px;

        cursor: grab;
        overflow-y: hidden;
        overflow-x: auto;
    }
    div.item {
        margin: 10px;
        flex: 0 0 auto;
    }

    div.icon_holder {
        margin: 25px 0;
    }
    div.icon {
        display: block;
        margin: 0 auto;

        height: 50px;
        width: 50px;

        cursor: pointer;
    }
    div.loading {
        animation: spin 1s infinite;
    }

    h1 {
        text-align: center;
        color: var(--error);
    }
    p {
        color: var(--dimmed);
        text-align: center;
        font-family: monospace;
    }
</style>

<section>
    {#if items.length === 0 && end}
        <h1>No results</h1>
        {#if dev}
            <p>{query}</p>
        {/if}
    {:else}
        <div class="holder">
            {#each items as item}
                <div class="item">
                    <Item {item} wide={false}/>
                </div>
            {/each}
        </div>
        <IntersectionObserver bind:intersecting top={1000}/>
        <div class="icon_holder">
            <div class="icon" class:loading={!end} on:click={scrollUp}>
                {#if end}
                    {@html icons["arrow-up"].toSvg({height: 50, width: 50})}
                {:else}
                    {@html icons.loader.toSvg({height: 50, width: 50})}
                {/if}
            </div>
        </div>
    {/if}
</section>