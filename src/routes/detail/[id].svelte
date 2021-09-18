<script lang="ts" context="module">
    import {getItem, setFetcher} from "$lib/api/internal";

    export async function load({ fetch, page }) {
        const { id } = page.params

        if(id === null || id === "null" || id === "undefined") return { status: 301, redirect: "/" }

        setFetcher(fetch);
        const item = await getItem(id)

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

    export let item: Item
    export let seasons: Item[]

    noPadding.set(true)
    onDestroy(() => noPadding.set(false))

    // console.log(item)
</script>

<Hero {item} includeMoreButton={false} includeWave />

<!--HERO-->

<!--.MEDIA.-->
<!--Chapters | Movie/Episode-->
<!--Actors | ALL-->
<!--Similar / Seasons | Movie / Series-->

<!--.PERSON.-->
<!--Media-->

{#if item.Type === "Series"}
    <VerticalList items={seasons} wide={false} title="Seasons" />
{/if}
{#if item.Type !== "Person" || item.Type === "Person"}
    <PersonList persons={item.People || []} />
{/if}