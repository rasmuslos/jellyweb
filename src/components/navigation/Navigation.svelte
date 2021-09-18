<script lang="ts">
    import type {NavigationItem, User} from "$lib/typings";
    import Item from "./Item.svelte"
    import StaticItems from "./StaticItems.svelte";
    import {noPadding} from "$lib/stores";

    export let me: User
    const items: NavigationItem[] = [
        { title: "Home", href: "/", regex: "^\/$" },
        { title: "Movies", href: "/movies", regex: "^\/?movies\/?.*$" },
        { title: "Series", href: "/series", regex: "^\/?series\/?.*$" },
        { title: "Genres", href: "/genres", regex: "^\/?genres\/?.*$" },
    ]

    console.log(me)
</script>

<style>
    div {
        position: absolute;
        top: 0;
        left: 0;

        z-index: 99;
        padding: 25px 0;
        width: 100%;
    }
    nav {
        display: flex;
        margin: auto;

        max-width: 1000px;
        width: 100%;
    }
    nav.shadow :global(span) {
        text-shadow: 1px 1px 2px black;
    }
</style>

<div>
    <nav class:shadow={$noPadding}>
        {#each items as item}
            <Item {item} />
        {/each}
        <StaticItems {me} />
    </nav>
</div>