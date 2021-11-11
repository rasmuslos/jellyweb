<script lang="ts" context="module">
    import {getHomeItems, setFetcher} from "$lib/api/internal";
    import type {JellyfinItem} from "$lib/typings/jellyfin";

    export async function load({ fetch }) {
        try {
            setFetcher(fetch)
            const home = await getHomeItems()

            return {
                status: 200,
                props: {
                    ...home
                }
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
    import ListHero from "../components/sections/ListHero.svelte";
    import Genres from "../components/sections/Genres.svelte";
    import Hero from "../components/sections/Hero.svelte";
    import VerticalList from "../components/sections/VerticalList.svelte";
    import type {Item} from "$lib/typings/internal";

    export let unfinished: Item[]
    export let nextUp: Item[]
    export let genres: Item[]
    export let random: Item
    export let bestRated: Item[]
    export let recommendations: Item[]
    export let latest: Item[]

    const combined = unfinished.concat(nextUp).sort((a, b) => {
        if(!a.lastPlayed || !b.lastPlayed) return 0
        return new Date(a.lastPlayed).getTime() > new Date(b.lastPlayed).getTime() ? -1 : 1
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
<!--
{:else if random != null}
    <Hero item={random} tip="{$t(`watch_this`)}" includeWave />
-->
{/if}

{#if genres != null && genres.length > 0}
    <Genres {genres} />
{/if}
<!--
{#if recommendations != null && recommendations.length > 0}
    <VerticalList items={recommendations} title="{$t(`recommended`)}" wide={false} />
{/if}
{#if showHero && random != null}
    <Hero item={random} tip="{$t(`watch_this`)}" reduceOffset />
{/if}
{#if bestRated != null && bestRated.length > 0}
    <VerticalList items={bestRated} title="{$t(`best_rated`)}" wide={false} />
{/if}
{#if latest != null && latest.length > 0}
    <VerticalList items={latest} title="{$t(`latest`)}" wide={false} />
{/if}
-->