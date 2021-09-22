<script lang="ts" context="module">
    import {searchHints, setFetcher} from "$lib/api/internal";

    export async function load({ fetch }) {
        try {
            setFetcher(fetch)
            const hints = await searchHints()

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
    import QueryBuilder from "../components/helper/QueryBuilder.svelte";
    import LazyList from "../components/helper/LazyList.svelte";
    import type {Item} from "$lib/typings";
    import VerticalList from "../components/sections/VerticalList.svelte";
    import {onMount} from "svelte";
    import {browser} from "$app/env";

    export let hints: Item[]

    let value: string
    let sortQuery: string
    let query: string

    onMount(() => {
        if(browser && window) {
            const params = new URLSearchParams(window.location.search)
            value = params.get("query") ?? ""
        }
    })

    $: query = `includeItemTypes=Movie,Series,Season,Episode&${sortQuery}`
</script>

<svelte:head>
    <title>{value !== "" ? `${value} - ` : null}Search</title>
</svelte:head>

<section>
    <QueryBuilder bind:value bind:sortQuery />
    {#if value === ""}
        <VerticalList items={hints} />
    {:else}
        <LazyList {query} />
    {/if}
</section>