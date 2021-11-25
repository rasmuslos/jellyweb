<script lang="ts" context="module">
    import {getItem, setFetcher} from "$lib/api/internal";
    import {t} from "$lib/i18n";
    import {generateItemUrl} from "$lib/helper";
    import type {Item} from "$lib/typings/internal";

    export async function load({ fetch, page }) {
        const { ids } = page.params
        const [id, season] = ids.split("/")

        setFetcher(fetch);
        const { item, ...rest }: { item: Item } = await getItem(id, true)

        if(item.type === "season" && item.showData) return {
            status: 301,
            redirect: generateItemUrl(item.showData.showId),
        }

        return {
            status: 200,
            props: {
                item,
                season,
                ...rest
            }
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
    import Episodes from "../../components/sections/Episodes.svelte";

    export let season: string

    export let item: Item
    export let seasons: Item[]
    export let nextUp: Item[]
    export let similar: Item[]

    noPadding.set(true)
    onDestroy(() => noPadding.set(false))
</script>

<svelte:head>
    <title>{item.name}</title>
</svelte:head>

<Hero {item} includeMoreButton={false} includeWave parallax />
{#if nextUp}
    <Hero item={nextUp} tip="{$t(`hero.nextup`)}" includeMoreButton={false} reduceOffset hideImage />
{/if}
{#if item.type === "show" && seasons && seasons.length > 0}
    <Episodes {seasons} showId={item.id} selected={season} />
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