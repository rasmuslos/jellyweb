<script lang="ts" context="module">
    import {getItem, setFetcher} from "$lib/api/internal";

    export async function load({ fetch, page }) {
        const { id } = page.params

        try {
            setFetcher(fetch);
            const item = await getItem(id, true)

            return {
                status: 200,
                props: { ...item }
            }
        } catch(error) {
            return {
                status: 301,
                redirect: "/"
            }
        }
    }
</script>
<script lang="ts">
    import type {Item} from "$lib/typings";
    import {noPadding} from "$lib/stores";
    import {onDestroy} from "svelte";
    import VerticalList from "../../components/sections/VerticalList.svelte";
    import Hero from "../../components/sections/Hero.svelte";
    import PersonList from "../../components/sections/PersonList.svelte";
    import Chapters from "../../components/sections/Chapters.svelte";
    import LazyList from "../../components/helper/LazyList.svelte";
    import QueryBuilder from "../../components/helper/QueryBuilder.svelte";

    export let item: Item
    export let seasons: Item[]
    export let nextUp: Item[]
    export let media: Item[]
    export let episodes: Item[]
    export let similar: Item[]

    let sort: string

    if(item.Type !== "Genre") noPadding.set(true)
    onDestroy(() => noPadding.set(false))
</script>

<style>
    h1 {
        font-weight: 600;
        font-size: 50px;
        text-align: center;
    }
</style>

<svelte:head>
    <title>{item.Name}</title>
</svelte:head>

{#if item.Type !== "Genre"}
    <Hero {item} includeMoreButton={false} includeWave={item.Type !== "Person"} />
{/if}

{#if nextUp}
    <Hero item={nextUp} tip="Next up" includeMoreButton={false} reduceOffset hideImage />
{/if}
{#if item.Type === "Series" || item.Type === "Season"}
    {#key item}
        <VerticalList items={item.Type === "Series" ? seasons : episodes} wide={false} title={item.Type === "Series" ? "Seasons" : "Episodes"} />
    {/key}
{/if}
{#if item.Type === "Genre"}
    <h1>{item.Name}</h1>
    <QueryBuilder bind:sortQuery={sort} />
    <LazyList query="genres={item.Name}&includeItemTypes=Movie,Series&{sort}" />
{/if}

{#if item.Type === "Episode" || item.Type === "Movie"}
    <Chapters chapters={item.Chapters || []} itemId={item.Id} />
{/if}
{#if item.Type === "Movie"}
    <VerticalList items={similar || []} title="Similar" />
{/if}

{#if item.Type !== "Person" || item.Type === "Person"}
    <PersonList persons={item.People || []} />
{/if}
{#if item.Type === "Person"}
    <VerticalList items={media} wide={false} title="Media" />
{/if}