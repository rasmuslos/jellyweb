<script lang="ts">
    import List from "./List.svelte";
    import Item from "../item/Item.svelte";
    import ApplyMeasurements from "../ApplyMeasurements.svelte";
    import {_} from "svelte-i18n";
    import {queryServer} from "$lib/api/internal/methods/v3";
    import {onDestroy, onMount} from "svelte";
    import Loading from "./Loading.svelte";
    import {DEVELOPMENT} from "$lib/env";
    import type {Item as ItemType} from "$lib/typings";
    import { parseError } from "$lib/helper";

    let term = ""
    export let limit: number = 21

    export let query: string = ""
    export let title: string = null
    export let size: "normal" | "large" = "large"
    export let align: "left" | "center" = "center"

    let items: ItemType[] = []
    let error: string = null
    let end: boolean = false
    let working: boolean = false

    let loader: HTMLDivElement
    let observer: IntersectionObserver
    let entities: IntersectionObserverEntry[]

    $: term = `${query}&Limit=${limit}&StartIndex=${items.length}`

    const handleIntersect = (received: IntersectionObserverEntry[]) => {
        entities = received
        validate()
    }
    const validate = () => entities?.forEach(({ isIntersecting }) => isIntersecting && requestItems())

    const requestItems = () => {
        working = true

        queryServer(term)
            .then(received => {
                if(received.length === 0) return end = true
                items = [...items, ...received]
            })
            .catch(exception => {
                if(DEVELOPMENT) console.error(exception)
                error = parseError(exception)
            })
            .finally(() => setTimeout(() => {
                working = false
                validate()
            }, 100))
    }

    onMount(() => {
        observer = new IntersectionObserver(handleIntersect, { rootMargin: "200px" })
        observer.observe(loader)
    })
    onDestroy(() => observer && observer.disconnect())
</script>

<ApplyMeasurements larger={size === "large"}>
    {#if title}
        <h2>{$_(title)}</h2>
    {/if}
    {#if error}
        <p class="error">{error}</p>
    {:else if end && items.length === 0}
        <p class="error">{$_("util.lazy.empty")}</p>
    {:else}
        <List expanded center={align === "center"}>
            {#each items as item}
                <Item {item} />
            {/each}
        </List>
        {#if !end}
            <div bind:this={loader}>
                <Loading />
            </div>
        {/if}
    {/if}
</ApplyMeasurements>

<style>
    p {
        text-align: center;
    }
    p.error {
        color: var(--red);
    }
</style>