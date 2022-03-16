<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";
    import {setFetcher} from "$lib/api/internal";
    import {getHomeItems} from "$lib/api/internal/methods/v3";
    import {isLoggedIn} from "$lib/helper";

    export const load: Load = async ({fetch, session}) => {
        if(!isLoggedIn(session)) return {
            status: 302,
            redirect: "/auth/login"
        }

        setFetcher(fetch)
        const items = await getHomeItems()

        return {
            props: {
                ...items,
            }
        }
    }
</script>
<script lang="ts">
    import type {Item, Recommendation} from "$lib/typings";
    import Hero from "../../components/hero/cards/Hero.svelte";
    import Push from "../../components/util/Push.svelte";
    import Recommended from "../../components/hero/cards/Recommended.svelte";
    import ItemList from "../../components/util/ItemList.svelte";
    import ApplyMeasurements from "../../components/ApplyMeasurements.svelte";
    import Featured from "../../components/hero/cards/Featured.svelte";
    import {_} from "svelte-i18n";
    import List from "../../components/util/List.svelte";
    import SmallItem from "../../components/item/SmallItem.svelte";
    import {getBestRatedMovies, getRandomItems} from "$lib/api/internal/methods/v3";
    import Loading from "../../components/util/Loading.svelte";
    import {onMount} from "svelte";

    let randomPromise: Promise<Item[]>
    let bestRatedPromise: Promise<Item[]>

    onMount(() => {
        randomPromise = getRandomItems()
        bestRatedPromise = getBestRatedMovies()
    })

    export let featured: Item[], suggestions: Item[], recommendations: Recommendation[], latest: Item[], genres: Item[]
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<Hero items={featured} />
<Push />
{#if suggestions?.length}
    <ApplyMeasurements>
        <ItemList title="pages.home.current" items={suggestions} wide />
    </ApplyMeasurements>
    <Push smaller />
{/if}
{#if genres?.length}
    <ApplyMeasurements>
        <List title="pages.home.genres">
            {#each genres as genre}
                <SmallItem item={genre} hideImage />
            {/each}
        </List>
    </ApplyMeasurements>
    <Push smaller />
{/if}
{#if recommendations?.length}
    <Recommended items={recommendations} />
    <Push smaller />
{/if}
<!--moved to lazy loading because this can take up to three seconds-->
{#if bestRatedPromise}
    {#await bestRatedPromise}
        <Loading />
    {:then bestRated}
        {#if bestRated?.length}
            <ApplyMeasurements>
                <ItemList title="pages.home.bestRated" items={bestRated} />
            </ApplyMeasurements>
            <Push smaller />
        {/if}
    {:catch error}
        <p>{error?.payload ?? error ?? "unknown error"}</p>
    {/await}
{:else}
    <Loading />
{/if}

{#if randomPromise}
    {#await randomPromise}
        <Loading />
    {:then random}
        {#if random?.length}
            <ApplyMeasurements>
                <h2>{$_("pages.home.random")}</h2>
                <Featured item={random[0]} />
            </ApplyMeasurements>
        {/if}
        <Push smaller />
    {:catch error}
        <p>{error?.payload ?? error ?? "unknown error"}</p>
    {/await}
{:else}
    <Loading />
{/if}

{#if latest?.length}
    <ApplyMeasurements>
        <ItemList title="pages.home.latest" items={latest} />
    </ApplyMeasurements>
    <Push smaller />
{/if}

<style>
    p {
        text-align: center;
        color: var(--red);
    }
</style>