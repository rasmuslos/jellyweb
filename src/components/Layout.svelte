<script lang="ts">
    import { Theme } from '$lib/typings';
    import {VERSION} from "$lib/helper";
    import "normalize.css"
    import "$lib/i18n"
    import {mobile} from "$lib/stores";
    import Sidebar from "./navigation/sidebar/Sidebar.svelte";
    import NavigationOverlay from "./navigation/bottom/NavigationOverlay.svelte";
    import {locale, waitLocale} from "svelte-i18n";

    const version = `?v=${encodeURIComponent(VERSION)}`

    export let i18n: string = "en";
    export let theme: Theme = Theme.DARK;
    export let showNavigation: boolean = true;

    locale.set(i18n)
    waitLocale()
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
    {#if $mobile}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
    :global(a), :global(a:visited) {
        color: inherit;
        text-decoration: none;
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
        padding-bottom: calc(env(safe-area-inset-top, 20px) + 150px);
    }
</style>
