<script lang="ts" context="module">
    import {getItem, setFetcher} from "$lib/api/internal";

    export async function load({ fetch, page }) {
        const { id } = page.params

        if(id === null || id === "null" || id === "undefined") return { status: 301, redirect: "/" }

        setFetcher(fetch);
        const item = await getItem(id, true)

        if(id === null) return { status: 301, redirect: "/" }

        return {
            status: 200,
            props: { ...item }
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

    export let item: Item
    export let seasons: Item[]
    export let nextUp: Item[]
    export let media: Item[]
    export let episodes: Item[]
    export let similar: Item[]

    noPadding.set(true)
    onDestroy(() => noPadding.set(false))
</script>

<svelte:head>
    <title>{item.Name}</title>
</svelte:head>

<Hero {item} includeMoreButton={false} includeWave={item.Type !== "Person"} />

{#if nextUp}
    <Hero item={nextUp} tip="Next up" includeMoreButton={false} reduceOffset hideImage />
{/if}
{#if item.Type === "Series" || item.Type === "Season"}
    {#key item}
        <VerticalList items={item.Type === "Series" ? seasons : episodes} wide={false} title={item.Type === "Series" ? "Seasons" : "Episodes"} />
    {/key}
{/if}
{#if item.Type === "Genre"}
    please implement me
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