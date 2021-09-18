<script lang="ts">
    import type {NavigationItem, User} from "$lib/typings";
    import Item from "./Item.svelte"
    import {noPadding} from "$lib/stores";
    import Search from "./Search.svelte";
    import {generateImageUrl} from "$lib/helper";
    import {icons} from "feather-icons";

    export let me: User

    let itemsHolder = null
    let expanded = false
    const items: NavigationItem[] = [
        { title: "Home", href: "/", regex: "^\/$" },
        { title: "Movies", href: "/movies", regex: "^\/?movies\/?.*$" },
        { title: "Series", href: "/series", regex: "^\/?series\/?.*$" },
        { title: "Genres", href: "/genres", regex: "^\/?genres\/?.*$" },
    ]

    $: {
        if(itemsHolder) {
            if(expanded) itemsHolder.style.height = `${itemsHolder.scrollHeight}px`
            else itemsHolder.style.height = "35px"
        }
    }
</script>

<style>
    div.wrapper {
        position: absolute;
        top: 0;
        left: 0;

        z-index: 99;
        padding: 25px 0;
        width: 100%;

        transition: background-color 200ms ease, box-shadow 200ms ease;
    }
    nav {
        display: grid;
        grid-template-columns: 1fr auto;

        margin: auto;

        max-width: 1000px;
        width: 100%;
    }
    nav.shadow :global(span) {
        text-shadow: 1px 1px 2px black;
    }

    div.items {
        display: flex;
        align-items: center;
    }

    div.holder {
        display: flex;
        align-items: center;
    }
    div.holder > * {
        margin-right: 7px;
        margin-left: 7px;
    }

    div.user {
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;

        cursor: pointer;
        transition: transform 200ms ease;
    }
    div.user:hover {
        transform: scale(1.1);
    }
    div.user .image {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;

        border-radius: 50%;

        height: 35px;
        width: 35px;
    }
    div.toggle {
        display: none;
    }
    div.toggle :global(svg) {
        transition: transform 200ms ease;
    }
    div.toggle.expanded :global(svg) {
        transform: rotate(180deg);
    }

    /* Possibly the worst thing i have ever created */
    @media screen and (max-width: 1000px) {
        div.wrapper.expanded {
            background-color: var(--background-light);
            box-shadow: 1px 10px 12px -5px rgba(0,0,0,0.75);
        }

        div.items {
            display: block;
            align-items: baseline;

            transition: height 200ms ease;
            overflow: hidden;

            flex-direction: column;
        }
        div.items .item {
            display: flex;
            align-items: center;

            width: 100%;
            height: 35px;
            padding: 10px 0;
        }

        div.holder {
            height: 35px;
        }
        div.toggle {
            display: block;
        }
    }
</style>

<div class="wrapper" class:expanded>
    <nav class:shadow={$noPadding}>
        <div class="items" class:expanded bind:this={itemsHolder}>
            {#each items as item}
                <div>
                    <div class="item">
                        <Item {item} />
                    </div>
                </div>
            {/each}
        </div>
        <div class="holder">
            <Search />
            <div class="toggle" class:expanded on:click={() => expanded = !expanded}>{@html icons["arrow-down"].toSvg()}</div>
            <div class="user">
                <div class="image" style="background-image: url('{me && generateImageUrl(me.Id, me.PrimaryImageTag, `Primary`, 30, `Users`)}')"></div>
            </div>
        </div>
    </nav>
</div>