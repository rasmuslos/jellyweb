<script lang="ts">
    import {navigationExpanded} from "$lib/stores";
    import SidebarItem from "./SidebarItem.svelte";
</script>

<nav class:expanded="{$navigationExpanded}">
    <SidebarItem dimmed noAnimation icon="align-left" title="collapse" flipped={$navigationExpanded} on:click={() => navigationExpanded.update(expanded => !expanded)} />
    <div class="space"></div>
    <SidebarItem dimmed icon="search" title="search_tip" href="/app/library/search" />
    <div class="space"></div>
    <SidebarItem icon="home" title="home" href="/app" />
    <SidebarItem icon="film" title="movies" href="/app/library/movies" />
    <SidebarItem icon="tv" title="series" href="/app/library/series" />
    <SidebarItem icon="disc" title="series" href="/app/library/collections" />
    <div class="push"></div>
    <SidebarItem icon="settings" title="settings" dimmed href="/app/settings"  />
    <SidebarItem icon="user" title="account" dimmed />
</nav>

<style>
    nav {
        --colapsed: 60px;
        --expanded: 250px;

        display: flex;
        flex-direction: column;

        height: 100%;
        width: var(--colapsed);

        overflow-x: hidden;
        overflow-y: scroll;

        padding: 20px 0;
    }
    nav.expanded {
        width: var(--expanded);
    }

    div.space {
        margin: 5px 0;
    }
    div.push {
        margin-top: auto;
    }
</style>