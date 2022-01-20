<script lang="ts">
    import Input from "../form/Input.svelte";
    import {_} from "svelte-i18n";
    import type {Item} from "$lib/typings";
    import {icons} from "feather-icons";
    import {getIcon} from "$lib/helper";
    import {searchItems} from "$lib/api/internal/methods/v3";
    import {getItemPath} from "$lib/helper";

    let error
    let hasResults
    let items: Item[] = []

    let term = ""
    let hideTimeout
    let searchTimeout

    $: hasResults = items.length > 0

    const emptyResults = () => {
        // setTimeout(() => items = [], 500)
    }
    const fillItems = () => {
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(performSearch, 500)
    }
    const performSearch = () => {
        clearTimeout(hideTimeout)
        if(term.trim() === "") return

        error = null
        searchItems(term).then(data => {
            if(data.length < 0) error = "no results"
            else items = data
        }).catch(() => error = "error while searching")
    }
</script>

<div class="holder" class:hasResults>
    <Input type="text" placeholder={$_("util.search")} large on:keyup={fillItems} on:blur={emptyResults} bind:value={term} on:focus={performSearch} />
    {#if error}
        <p class="error">{error}</p>
    {/if}
    {#if hasResults}
        <div class="results">
            {#each items as item}
                <a class="item" href={getItemPath(item.id)}>
                    {@html icons[getIcon(item)].toSvg()}
                    <span>{item.name}</span>
                </a>
            {/each}
        </div>
    {/if}
</div>

<style>
    .holder {
        overflow: hidden;
        border-radius: 15px;
        border: 3px solid var(--background);
    }
    .holder.hasResults {
    }

    .results {
        position: absolute;
        width: calc(100% - 6px);

        display: flex;
        flex-direction: column;

        padding-bottom: 7px;

        background-color: #FFFFFF80;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    }
    .results::before {
        content: "";
        height: 10px;
        width: 100%;

        background-image: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF80 100%);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    .error {
        color: red;
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

    .item:hover {
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