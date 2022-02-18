<script lang="ts">
    import IntersectionObserver from '../IntersectionObserver.svelte'
    import {onDestroy} from "svelte";
    import Item from "../item/Item.svelte";
    import {icons} from "feather-icons";
    import {scrollUp} from "$lib/helper";
    import {dev} from "$app/env";
    import {getItemsByQuery} from "$lib/api/internal";

    export let query: string = ""

    if(query.startsWith("?") || query.startsWith("&") || query === "") throw new Error("Query cannot be empty or start with ? or &")

    let prevQuery: string = ""
    let items: Item[] = []
    let intersecting: boolean = false

    let loading = false
    let end = false

    $: {
        if(query !== prevQuery) {
            items = []
            end = false
        }
        prevQuery = query
    }

    // This is hideous but other attempts failed, and it works, so I guess it will stay
    const interval = setInterval(async () => {
        if(intersecting && !loading && !end) {
            loading = true

            const newItems: Item[] = await getItemsByQuery(`limit=30&startIndex=${items.length}&${query}`)
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

        align-items: start;
        justify-content: center;

        margin: 0 auto;
        padding-bottom: 20px;

        cursor: grab;
        overflow-y: hidden;
        overflow-x: auto;
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
        color: var(--red);
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
                <Item {item} wide={false} />
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