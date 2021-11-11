<script lang="ts" context="module">
    import {getItem, setFetcher} from "$lib/api/internal";
    import {t} from "$lib/i18n";

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
                redirect: "/error"
            }
        }
    }
</script>
<script lang="ts">
    import type {JellyfinItem} from "$lib/typings/jellyfin";
    import {noPadding} from "$lib/stores";
    import {onDestroy} from "svelte";
    import VerticalList from "../../components/sections/VerticalList.svelte";
    import Hero from "../../components/sections/Hero.svelte";
    import PersonList from "../../components/sections/PersonList.svelte";
    import Chapters from "../../components/sections/Chapters.svelte";
    import LazyList from "../../components/helper/sections/LazyList.svelte";
    import QueryBuilder from "../../components/helper/search/QueryBuilder.svelte";

    export let item: JellyfinItem
    export let seasons: JellyfinItem[]
    export let nextUp: JellyfinItem[]
    export let media: JellyfinItem[]
    export let episodes: JellyfinItem[]
    export let similar: JellyfinItem[]

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
    <Hero item={nextUp} tip="{$t(`hero.nextup`)}" includeMoreButton={false} reduceOffset hideImage />
{/if}
{#if item.Type === "Series" || item.Type === "Season"}
    {#key item}
        <VerticalList items={item.Type === "Series" ? seasons : episodes} wide={false} title={item.Type === "Series" ? $t("seasons") : $t("episodes")} />
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
    <VerticalList items={similar || []} title="{$t(`similar`)}" wide={false} small />
{/if}

{#if item.Type !== "Person" && item.People && item.People.length > 0}
    <PersonList persons={item.People || []} />
{/if}
{#if item.Type === "Person"}
    <VerticalList items={media} wide={false} title="Media" />
{/if}