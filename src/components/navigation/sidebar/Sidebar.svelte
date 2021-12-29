<script lang="ts">
    import {navigationExpanded} from "$lib/stores";
    import SidebarItem from "./SidebarItem.svelte";
</script>

<nav class:expanded="{$navigationExpanded}">
    <SidebarItem dimmed noAnimation icon="align-left" title="Collapse" flipped={$navigationExpanded} on:click={() => navigationExpanded.update(expanded => !expanded)} />
    <div class="space"></div>
    <SidebarItem icon="home" title="Start" />
    <SidebarItem icon="film" title="Movies" />
    <SidebarItem icon="tv" title="Series" />
    <div class="push"></div>
    <SidebarItem icon="settings" title="Settings" dimmed />
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
        background-color: var(--background-secodary);
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