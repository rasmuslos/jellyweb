<script lang="ts">
    import Input from "../form/Input.svelte";
    import {_} from "svelte-i18n";
    import type {Item} from "$lib/typings";
    import {icons} from "feather-icons";
    import {getIcon} from "$lib/helper";
    import {searchItems} from "$lib/api/internal/methods/v3";
    import {getItemPath} from "$lib/helper";
    import Loading from "./Loading.svelte";
    import { afterUpdate } from "svelte";

    export let overlay: boolean = false

    let error: any
    let visible: boolean = false
    let loading: boolean = false
    let performPending: boolean = false

    let items: Item[] = []

    let term = ""
    let hideTimeout: number
    let searchTimeout: number

    let holder: HTMLDivElement
    let activeIndex: number = -1

    $: visible = items.length > 0 || (items.length === 0 && term.trim() !== "" && !performPending) || loading

    const emptyResults = () => {
        if(overlay) setTimeout(() => {
            items = []
            activeIndex = -1
        }, 500)
    }
    const fillItems = (event: KeyboardEvent) => {
        if(event.key === "ArrowDown" || event.key === "ArrowUp") {
            if(event.key === "ArrowDown") activeIndex++
            else activeIndex--

            if(activeIndex < 0) activeIndex = items.length - 1
            else if(activeIndex >= items.length) activeIndex = 0

            event.preventDefault()
            return false
        } else if(event.key === "Enter" && holder) {
            holder.querySelector<HTMLAnchorElement>("a.item.active")?.click()

            event.preventDefault()
            return false
        }

        performPending = true

        clearTimeout(searchTimeout)
        searchTimeout = window.setTimeout(performSearch, 250)
    }
    const performSearch = () => {
        clearTimeout(hideTimeout)
        performPending = false
        activeIndex = -1

        if(term.trim() === "") return

        error = null
        loading = true

        searchItems(term).then(data => {
            if(data.length < 0) error = "no results"
            else items = data
        }).catch(() => error = "error while searching")
        .finally(() => loading = false)
    }

    afterUpdate(() => {
        if(holder) {
            holder.querySelector(".item.active")?.scrollIntoView({
                block: "nearest",
                inline: "nearest",
            })
        }
    })
</script>

<div class="holder" class:resultsVisible={visible} bind:this={holder}>
    <Input type="text" placeholder={$_("util.search")} large on:keyup={fillItems} on:blur={emptyResults} bind:value={term} on:focus={performSearch} />
    {#if error}
        <p class="error">{error}</p>
    {/if}
    <div class="results" class:overlay class:visible={visible}>
        {#if items.length > 0}
            {#each items as item, index}
                <a class="item" class:active={index === activeIndex} href={getItemPath(item.id)}>
                    {@html icons[getIcon(item)].toSvg()}
                    <span>
                        {item.name}
                        {#if item.seriesInfo?.show}
                            <b>{item.seriesInfo.showName}</b>
                        {/if}
                    </span>
                </a>
            {/each}
        {/if}
        {#if loading}
            <Loading />
        {:else if items.length === 0 && term.trim() !== "" && !performPending}
            <h3>no results</h3>
        {/if}
    </div>
</div>

<style>
    .holder {
        overflow: hidden;
        border-radius: 15px;
        border: 3px solid var(--background);
    }
    .holder.resultsVisible, .holder.resultsVisible :global(input)  {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    h3 {
        text-align: center;
        color: var(--red);
    }
    .results {
        display: none;
        flex-direction: column;

        padding-bottom: 7px;

        background-color: rgba(var(--background-secondary-rgb), .9);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;

        overflow: scroll;
        max-height: 500px;
    }
    .results::before {
        content: "";
        height: 10px;
        width: 100%;

        background-image: linear-gradient(180deg, var(--background-secondary) 0%, rgba(var(--background-secondary-rgb), .8) 100%);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
    .results.overlay {
        position: absolute;
        width: calc(100% - 6px);
    }
    .results.visible {
        display: flex;
    }

    .error {
        color: var(--red);
        text-align: center;

        margin: 0;
        padding: 10px 0 20px 0;

        background-color: var(--background-secondary);
    }

    .item {
        display: grid;
        grid-template-columns: auto 1fr;

        align-items: center;
        justify-content: center;

        cursor: pointer;
        padding: 8px 7px;
        margin: 2px 7px;

        border-radius: 5px;

        font-weight: 600;
    }
    .item :global(svg) {
        margin-right: 7px;
    }
    .item span {
        width: 100%;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .item span b {
        color: var(--grey);
        font-weight: normal;
    }

    .item:hover, .item.active {
        background-color: var(--primary);
    }

    div.holder :global(label) {
        margin: 0;
    }
    div.holder.hasResults, div.holder.hasResults :global(input) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    div.holder.hasResults :global(input:focus) {
        box-shadow: none;
    }
</style>