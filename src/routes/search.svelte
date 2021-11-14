<script lang="ts" context="module">
    import {getSearchHints, setFetcher} from "$lib/api/internal";

    export async function load({ fetch }) {
        try {
            setFetcher(fetch)
            const hints = await getSearchHints()

            return {
                status: 200,
                props: { hints }
            }
        } catch(error) {
            console.error(error)

            return {
                status: 301,
                redirect: "/error"
            }
        }
    }
</script>
<script lang="ts">
    import QueryBuilder from "../components/helper/search/QueryBuilder.svelte";
    import LazyList from "../components/helper/sections/LazyList.svelte";
    import VerticalList from "../components/sections/VerticalList.svelte";
    import {browser} from "$app/env";
    import {t} from "$lib/i18n";
    import LargeHeading from "../components/helper/LargeHeading.svelte";
    import {page} from "$app/stores";
    import type {Item} from "$lib/typings/internal";

    export let hints: Item[]

    let value: string = $page.query.get("query") ?? ""
    let sortQuery: string = ""
    let query: string

    $: query = `includeItemTypes=Movie,Series,Season,Episode&${sortQuery}`
    $: browser && window.history.replaceState({}, document.title, `/search?query=${value}`)
</script>

<svelte:head>
    <title>{value !== "" ? `${value} - ` : null}{$t("search")}</title>
</svelte:head>

<LargeHeading>{$t("search")}</LargeHeading>
<section>
    <QueryBuilder bind:value bind:sortQuery />
    {#if value === ""}
        <VerticalList items={hints} />
    {:else}
        <LazyList {query} />
    {/if}
</section>