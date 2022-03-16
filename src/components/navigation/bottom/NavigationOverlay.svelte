<script lang="ts">
    import OverlayItem from "./OverlayItem.svelte";

    let expanded: boolean
</script>

<nav class:expanded={expanded} >
    <div class="more">
        <OverlayItem icon="disc" title="collections" href="/app/library/collections" />
        <OverlayItem icon="search" title="search" href="/app/library/search" />
        <OverlayItem icon="user" title="account" href="/auth/logout" />
        <OverlayItem icon="settings" title="settings" href="/app/settings" />
    </div>
    <div class="main">
        <OverlayItem icon="home" title="home" href="/app" />
        <OverlayItem icon="film" title="movies" href="/app/library/movies" />
        <OverlayItem icon="tv" title="series" href="/app/library/series" />
        <OverlayItem icon="more-horizontal" title="more" on:click={() => expanded = !expanded} active={expanded} />
    </div>
</nav>

<style lang="less">
    nav {
        position: fixed;
        bottom: 5px;
        left: 5px;
        right: 5px;

        height: auto;
        width: ~"calc(100% - 10px)";

        overflow: hidden;
        border-radius: 10px;

        background-color: rgba(var(--navigation), .5);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);

        z-index: 10;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;

        &.main {
            height: 60px;
            width: 100%;
        }
        &.more {
            display: none;
            flex-wrap: wrap;

            padding: 10px 0;
        }
    }
    
    nav.expanded div.more {
        display: flex;
    }
</style>