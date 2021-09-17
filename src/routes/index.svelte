<script lang="ts" context="module">
    import {home, setFetcher} from "$lib/api/internal";
    import type {Item} from "$lib/typings";

    export async function load({ fetch }) {
        setFetcher(fetch)
        const homeObj = await home()

        const resume: Item[] = homeObj.resume.Items
        const nextUp: Item[] = homeObj.nextUp.Items
        const genres: Item[] = homeObj.genres.Items

        return {
            status: 200,
            props: { resume, nextUp, genres }
        }
    }
</script>
<script lang="ts">
    import type {Item} from "$lib/typings";
    import {noPadding} from "$lib/stores";
    import {onDestroy} from "svelte";
    import ListHero from "../components/sections/ListHero.svelte";
    import Genres from "../components/sections/Genres.svelte";

    export let resume: Item[]
    export let nextUp: Item[]
    export let genres: Item[]

    const combined = resume.concat(nextUp).sort((a, b) => {
        if(!a.UserData || !a.UserData.LastPlayedDate || !b.UserData || !b.UserData.LastPlayedDate) return 0
        return new Date(a.UserData.LastPlayedDate).getTime() > new Date(b.UserData.LastPlayedDate).getTime() ? -1 : 1
    })
    const showHero = combined.length > 0

    if(showHero !== null) noPadding.set(true)
    onDestroy(() => noPadding.set(false))
</script>

<style>
</style>

{#if showHero != null}
    <ListHero items={combined} />
{/if}
<Genres {genres} />