<script lang="ts">
    import { Theme } from '$lib/typings';
    import {VERSION} from "$lib/helper";
    import "normalize.css"
    import {mobile} from "$lib/stores";
    import Sidebar from "./navigation/sidebar/Sidebar.svelte";
    import NavigationOverlay from "./navigation/bottom/NavigationOverlay.svelte";

    const version = `?v=${encodeURIComponent(VERSION)}`

    export let showNavigation: boolean = true;
    export let theme: Theme = Theme.DARK;
</script>

<svelte:head>
    <link rel="stylesheet" href="/assets/fonts.css{version}" />
    <link rel="stylesheet" href="/assets/globals.css{version}" />
    <link rel="stylesheet" href="/assets/themes/{theme}.css{version}" />

    {#if theme === Theme.DARK}
        <meta name="theme-color" content="#07090F" />
    {:else if theme === Theme.LIGHT}
        <meta name="theme-color" content="#EBF2FA" />
    {/if}
</svelte:head>

<div id="root" class:mobile={$mobile} class:showNavigation theme={theme} >
    {#if showNavigation && !$mobile}
        <Sidebar />
    {/if}
    <main>
        <slot />
        {#if showNavigation && $mobile}
            <NavigationOverlay />
        {/if}
    </main>
</div>

<style>
    :global(body) {
        height: 100vh;
        width: 100vw;
        overflow: hidden;

        color: var(--text);
        font-family: var(--font);
        background-color: var(--background);

        margin: 0;
        padding: 0;
    }
    :global(*), :global(*::before), :global(*::after) {
        transition: all 500ms ease;
        box-sizing: border-box;
    }

    div {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;

        height: 100%;
        width: 100%;
    }
    div:not(.mobile).showNavigation {
        grid-template-columns: auto 1fr;
    }

    main {
        position: relative;
        min-height: 100%;
        width: 100%;

        overflow-x: hidden;
        overflow-y: scroll;

        padding: env(safe-area-inset-top, 20px) 0 env(safe-area-inset-bottom, 20px) 0;
    }
    div.mobile.showNavigation main {
        padding-bottom: calc(env(safe-area-inset-top, 20px) + 60px);
    }
</style>
