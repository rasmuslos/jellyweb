<script lang="ts" context="module">
    import {getPerson, setFetcher} from "$lib/api/internal";

    export async function load({ fetch, page }) {
        const { id } = page.params

        setFetcher(fetch);
        const person = await getPerson(id)

        return {
            status: 200,
            props: { ...person }
        }
    }
</script>
<script lang="ts">
    import type {Genre} from "$lib/typings/internal";
    import Hero from "../../components/sections/Hero.svelte";
    import VerticalList from "../../components/sections/VerticalList.svelte";
    import {noPadding} from "$lib/stores";
    import {onDestroy} from "svelte";

    export let person: Genre
    export let media: Genre

    noPadding.set(true)
    onDestroy(() => noPadding.set(false))
</script>

<svelte:head>
    <title>{person.name}</title>
</svelte:head>

<Hero item={person} includeMoreButton={false} includeActions={false} />
<VerticalList items={media || []} wide={false} title="Media" />