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
    import BackgroundSection from "../../components/helper/sections/BackgroundSection.svelte";
    import {generateImageUrl, generateImageUrlIndex} from "$lib/helper";
    import HeroInner from "../../components/helper/sections/HeroInner.svelte";
    import Wave from "../../components/sections/Wave.svelte";

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

<!--
<BackgroundSection parallax url={generateImageUrlIndex(item.images.wide.parent ? item.showData.showId : item.id, item.images.wide.tag, item.images.wide.index, `Backdrop`)}>
    <HeroInner {item} includeMoreButton={false} />
    {#if nextUp}
        <HeroInner item={nextUp} tip="{$t(`hero.nextup`)}" reduceOffset noImage />
    {/if}
    <Wave colored={false} />
</BackgroundSection>
-->
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