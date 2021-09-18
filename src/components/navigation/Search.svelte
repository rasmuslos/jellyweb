<script lang="ts">
    import {icons} from "feather-icons";

    const handleGlobalKeydown = (event: KeyboardEvent) => {
        if(event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey || event.altKey)) {
            alert("OPEN MODAL")
        }
    }
</script>
<svelte:window on:keydown={handleGlobalKeydown} />

<style>
    div.desktop {
        display: block;

        cursor: pointer;
        color: var(--secondary);

        padding: 7px;
        border-radius: 5px;
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
    div.mobile {
        display: none;
        margin: 0 7px;
    }

    @media screen and (max-width: 1000px) {
        div.desktop {
            display: none;
        }
        div.mobile {
            display: block;
        }
    }
</style>

<div class="desktop">
    <span>Search</span>
    <span class="key">&#8984;K</span>
</div>
<div class="mobile">
    {@html icons.search.toSvg()}
</div>