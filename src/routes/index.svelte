<script lang="ts" context="module">
    import {home, setFetcher} from "$lib/api/internal";
    import type {Item} from "$lib/typings";

    export async function load({ fetch }) {
        try {
            setFetcher(fetch)
            const homeObj = await home()

            return {
                status: 200,
                props: { ...homeObj}
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
    import type {Item} from "$lib/typings";
    import {noPadding} from "$lib/stores";
    import {onDestroy} from "svelte";
    import ListHero from "../components/sections/ListHero.svelte";
    import Genres from "../components/sections/Genres.svelte";
    import Hero from "../components/sections/Hero.svelte";
    import VerticalList from "../components/sections/VerticalList.svelte";

    export let resume: Item[]
    export let nextUp: Item[]
    export let genres: Item[]
    export let random: Item
    export let bestRated: Item[]
    export let recommendations: Item[]
    export let latest: Item[]

    const combined = resume.concat(nextUp).sort((a, b) => {
        if(!a.UserData || !a.UserData.LastPlayedDate || !b.UserData || !b.UserData.LastPlayedDate) return 0
        return new Date(a.UserData.LastPlayedDate).getTime() > new Date(b.UserData.LastPlayedDate).getTime() ? -1 : 1
    })
    const showHero = combined.length > 0

    if(showHero || random != null) noPadding.set(true)
    onDestroy(() => noPadding.set(false))
</script>

<svelte:head>
    <title>Jellyweb</title>
</svelte:head>

{#if showHero && combined != null && combined.length > 0}
    <ListHero items={combined} />
{:else if random != null}
    <Hero item={random} tip="Watch this" includeWave />
{/if}

{#if genres != null && genres.length > 0}
    <Genres {genres} />
{/if}
{#if recommendations != null && recommendations.length > 0}
    <VerticalList items={recommendations} title="Recommended" />
{/if}
{#if showHero && random != null}
    <Hero item={random} tip="Watch this" reduceOffset />
{/if}
{#if bestRated != null && bestRated.length > 0}
    <VerticalList items={bestRated} title="Best rated" />
{/if}
{#if latest != null && latest.length > 0}
    <VerticalList items={latest} title="Latest" />
{/if}