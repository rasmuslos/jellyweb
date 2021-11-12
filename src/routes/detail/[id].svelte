<script lang="ts" context="module">
    import {getItem, setFetcher} from "$lib/api/internal";
    import {t} from "$lib/i18n";

    export async function load({ fetch, page }) {
        const { id } = page.params

        setFetcher(fetch);
        const item = await getItem(id, true)

        return {
            status: 200,
            props: { ...item }
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
    import type {Item} from "$lib/typings/internal";

    export let item: Item
    export let seasons: Item[]
    export let nextUp: Item[]
    export let media: Item[]
    export let episodes: Item[]
    export let similar: Item[]

    noPadding.set(true)
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
    <title>{item.name}</title>
</svelte:head>

<Hero {item} includeMoreButton={false} includeWave={item.type !== "Person"} />
{#if nextUp}
    <Hero item={nextUp} tip="{$t(`hero.nextup`)}" includeMoreButton={false} reduceOffset hideImage />
{/if}
{#if item.type === "show" || item.type === "season"}
    {#key item}
        <VerticalList items={item.type === "show" ? seasons : episodes} wide={false} title={item.type === "show" ? $t("seasons") : $t("episodes")} />
    {/key}
{/if}

<!--
{#if item.type === "episode" || item.Type === "movie"}
    <Chapters chapters={item.Chapters || []} itemId={item.Id} />
{/if}
-->
{#if item.type === "movie"}
    <VerticalList items={similar || []} title="{$t(`similar`)}" wide={false} small />
{/if}

<!--
{#if item.type !== "Person" && item.People && item.People.length > 0}
    <PersonList persons={item.People || []} />
{/if}
-->
{#if item.type === "person"}
    <VerticalList items={media} wide={false} title="Media" />
{/if}