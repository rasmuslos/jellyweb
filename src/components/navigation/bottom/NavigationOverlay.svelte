<script lang="ts">
    import OverlayItem from "./OverlayItem.svelte";
    import {navigationExpanded} from "$lib/stores";
</script>

<nav class:expanded={$navigationExpanded} >
    <div class="more">
        <OverlayItem icon="search" title="search" />
        <OverlayItem icon="user" title="account" />
        <OverlayItem icon="settings" title="settings" />
    </div>
    <div class="main">
        <OverlayItem icon="home" title="home" />
        <OverlayItem icon="film" title="movies" />
        <OverlayItem icon="tv" title="series" />
        <OverlayItem icon="more-horizontal" title="more" on:click={() => navigationExpanded.update(expanded => !expanded)} active={$navigationExpanded} />
    </div>
</nav>

<style>
    nav {
        position: fixed;
        bottom: 5px;
        left: 5px;
        right: 5px;

        height: auto;
        width: calc(100% - 10px);

        overflow: hidden;
        border-radius: 10px;

        background-color: rgba(255, 255, 255, .30);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    }
    :global(#root[theme="dark"]) nav {
        background-color: rgba(0, 0, 0, .30);
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }
    div.main {
        height: 60px;
        width: 100%;
    }
    div.more {
        display: none;
        flex-wrap: wrap;

        padding: 10px 0;
    }
    nav.expanded div.more {
        display: flex;
    }
</style>