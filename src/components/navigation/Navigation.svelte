<script lang="ts">
    import type {NavigationItem, User} from "$lib/typings/jellyfin";
    import Item from "./Item.svelte"
    import {noPadding} from "$lib/stores";
    import Search from "./Search.svelte";
    import {generateImageUrl, lightMode, updatePreference} from "$lib/helper";
    import {icons} from "feather-icons";
    import LanguageSelector from "../helper/LanguageSelector.svelte";
    import {page} from "$app/stores";

    export let me: User

    let itemsHolder
    let expanded = false
    const items: NavigationItem[] = [
        { title: "nav.home", href: "/", regex: "^\/$" },
        { title: "nav.movies", href: "/library/movies", regex: "^\/?library\/movies\/?.*$" },
        { title: "nav.series", href: "/library/series", regex: "^\/?library\/series\/?.*$" },
        { title: "nav.genres", href: "/genres", regex: "^\/?genres\/?.*$" },
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

        transition: color 200ms ease;
        margin: auto;

        max-width: 1000px;
        width: 100%;
    }
    nav.white {
        color: var(--white);
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

    a.user {
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;

        cursor: pointer;
        transition: transform 200ms ease;
    }
    a.user:hover {
        transform: scale(1.1);
    }
    a.user .image {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;

        border-radius: 50%;
        background-color: var(--background-secondary);

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

    .icon {
        cursor: pointer;

        height: 20px;
        width: 20px;
    }
    .icon :global(svg) {
        stroke-width: 2.5px;
    }

    a.active :global(svg) {
        stroke: var(--highlight);
    }

    /* Possibly the worst thing i have ever created */
    @media screen and (max-width: 1000px) {
        div.wrapper.expanded {
            background-color: var(--background-light);
            box-shadow: 1px 10px 12px -5px rgba(0,0,0,0.75);
        }
        div.wrapper.expanded nav {
            color: var(--text);
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

        .icon {
            height: unset;
            width: unset;
        }
    }
</style>

<div class="wrapper" class:expanded>
    <nav class:white={$noPadding}>
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
            <LanguageSelector />
            <div class="icon" on:click={() => updatePreference("theme", $lightMode ? "dark" : "light")}>{@html icons[$lightMode ? "moon" : "sun"].toSvg({ height: 20, width: 20 })}</div>
            <div class="toggle" class:expanded on:click={() => expanded = !expanded}>{@html icons["arrow-down"].toSvg()}</div>
            {#if me.Policy.IsAdministrator && false}
                <a class:active={new RegExp("^\/?server\/?.*$").test($page.path)} href="/server" class="icon">{@html icons["server"].toSvg({ height: 20, width: 20 })}</a>
            {/if}
            <a href="/user" class="user">
                <div class="image" style="background-image: url('{me && generateImageUrl(me.Id, me.PrimaryImageTag, `Primary`, 30, `Users`)}')"></div>
            </a>
        </div>
    </nav>
</div>