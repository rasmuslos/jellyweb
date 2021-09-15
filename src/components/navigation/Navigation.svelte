<script lang="ts">
    import type {Item as NavigationItem} from "$lib/typings/navigation";
    import Item from "./Item.svelte"
    import StaticItems from "./StaticItems.svelte";

    const items: NavigationItem[] = [
        { title: "Home", href: "/", regex: "^\/$" },
        { title: "Movies", href: "/movies", regex: "^\/?movies\/?.*$" },
        { title: "Series", href: "/series", regex: "^\/?series\/?.*$" },
        { title: "Generes", href: "/generes", regex: "^\/?generes\/?.*$" },
    ]
</script>

<style>
    div {
        padding: 25px 0;
        width: 100%;
    }
    nav {
        display: flex;
        margin: auto;

        max-width: 1000px;
        width: 100%;
    }
</style>

<div>
    <nav>
        {#each items as item}
            <Item {item} />
        {/each}
        <StaticItems />
    </nav>
</div>