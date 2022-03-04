<script lang="ts">
    import { setNavigationExpanded, toggleSearchModal } from "$lib/helper";
    import {navigationExpanded} from "$lib/stores";
    import SidebarItem from "./SidebarItem.svelte";
</script>

<nav class:expanded="{$navigationExpanded}">
    <SidebarItem dimmed noAnimation icon="align-left" title="collapse" flipped={$navigationExpanded} on:click={() => setNavigationExpanded(!$navigationExpanded)} />
    <div class="space"></div>
    <SidebarItem dimmed icon="search" title="search_tip" href="/app/library/search" on:click={event => {
        toggleSearchModal()
        event.preventDefault()
    }} />
    <div class="space"></div>
    <SidebarItem icon="home" title="home" href="/app" />
    <SidebarItem icon="film" title="movies" href="/app/library/movies" />
    <SidebarItem icon="tv" title="series" href="/app/library/series" />
    <SidebarItem icon="disc" title="collections" href="/app/library/collections" />
    <div class="push"></div>
    <SidebarItem icon="settings" title="settings" dimmed href="/app/settings"  />
    <SidebarItem icon="user" title="account" dimmed href="/auth/logout" />
</nav>
<div class="placeholder"></div>

<style>
    nav {
        position: fixed;
        top: 0;
        left: 0;

        z-index: 10;

        --collapsed: 60px;
        --expanded: 250px;

        display: flex;
        flex-direction: column;

        height: 100vh;
        width: var(--collapsed);

        overflow-x: hidden;
        overflow-y: auto;

        padding: 20px 0;
        background-color: rgba(var(--navigation), 0.5);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
    }
    nav.expanded {
        width: var(--expanded);
        background-color: rgb(var(--navigation));

        backdrop-filter: none;
        -webkit-backdrop-filter: none;
    }

    div.space {
        margin: 5px 0;
    }
    div.push {
        margin-top: auto;
    }

    div.placeholder {
        width: 0;
    }
    nav.expanded ~ div.placeholder {
        width: 250px;
    }
</style>