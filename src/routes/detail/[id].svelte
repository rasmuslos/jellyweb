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
    import {noPadding} from "$lib/stores";
    import {onDestroy} from "svelte";
    import VerticalList from "../../components/sections/VerticalList.svelte";
    import Hero from "../../components/sections/Hero.svelte";
    import PersonList from "../../components/sections/PersonList.svelte";
    import type {Item} from "$lib/typings/internal";
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

<Hero {item} includeMoreButton={false} includeWave />
{#if nextUp}
    <Hero item={nextUp} tip="{$t(`hero.nextup`)}" includeMoreButton={false} reduceOffset hideImage />
{/if}
{#if item.type === "show" || item.type === "season"}
    {#key item}
        <VerticalList items={item.type === "show" ? seasons : episodes} wide={false} title={item.type === "show" ? $t("seasons") : $t("episodes")} />
    {/key}
{/if}

{#if item.chapters && item.playable}
    <Chapters chapters={item.chapters || []} itemId={item.id} />
{/if}
{#if item.type === "movie"}
    <VerticalList items={similar || []} title="{$t(`similar`)}" wide={false} small />
{/if}
{#if item.people && item.people.length > 0}
    <PersonList persons={item.people || []} />
{/if}