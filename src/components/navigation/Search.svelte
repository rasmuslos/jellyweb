<script lang="ts">
    import {icons} from "feather-icons";
    import {modal, noPadding} from "$lib/stores";
    import SearchOverlay from "../helper/search/SearchOverlay.svelte";

    const toggleSearch = () => $modal === null ? modal.set(SearchOverlay) : modal.set(null)
    const handleGlobalKeydown = (event: KeyboardEvent) => {
        if(event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey || event.altKey)) {
            toggleSearch()
            event.preventDefault()
        }
    }
</script>
<svelte:window on:keydown={handleGlobalKeydown} />

<style>
    div.desktop.dark {
        --background: #2E3440;
        --background-light: #3B4252;
        --background-secondary: #4C566A;

        --text: var(--white);
    }

    div.desktop {
        display: block;

        cursor: pointer;
        color: var(--text);

        padding: 7px;
        border-radius: 7px;
    }
    div.desktop:hover {
        background-color: var(--background-light);
    }

    div.desktop span.key {
        background-color: var(--background-secondary);

        font-size: smaller;
        padding: 5px;
        border-radius: 10px;
    }

    /* i know that this is the worst possible way to do this, but fuck it */
    a.mobile {
        display: none;
        margin: 0 7px;
    }

    @media screen and (max-width: 1000px) {
        div.desktop {
            display: none;
        }
        a.mobile {
            display: block;
        }
    }
</style>

<div class="desktop" class:dark={$noPadding} on:click={toggleSearch}>
    <span>Search</span>
    <span class="key">&#8984;K</span>
</div>
<a class="mobile" href="/search">
    {@html icons.search.toSvg()}
</a>