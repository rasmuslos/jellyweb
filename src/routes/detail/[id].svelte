<script lang="ts" context="module">
    import {getItem, setFetcher} from "$lib/api/internal";

    export async function load({ fetch, page }) {
        const { id } = page.params

        // if(id === null || id === "null") return { status: 301, redirect: "/" }

        setFetcher(fetch);
        const item = await getItem(id)

        if(item === null) return { status: 301, redirect: "/" }

        console.log(Object.keys(item), item.seasons)

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
    import HeroInner from "../../components/sections/HeroInner.svelte";
    import BackgroundSection from "../../components/sections/BackgroundSection.svelte";
    import {getLargeBackdrop} from "$lib/helper";
    import VerticalList from "../../components/sections/VerticalList.svelte";
    import Hero from "../../components/sections/Hero.svelte";

    export let item: Item[]
    export let seasons: Item[]

    noPadding.set(true)
    onDestroy(() => noPadding.set(false))

    // console.log(item)
</script>

<Hero {item} includeMoreButton={false} />
{#if item.Type === "Series"}
    <VerticalList items={seasons} wide={false} title="Seasons" />
{/if}