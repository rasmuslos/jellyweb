<script lang="ts">
    import { Theme } from '$lib/typings';
    import {VERSION} from "$lib/helper";
    import "normalize.css"
    import {mobile} from "$lib/stores";
    import Sidebar from "./navigation/sidebar/Sidebar.svelte";

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

<div id="root" mobile={$mobile} class:showNavigation>
    {#if showNavigation && !$mobile}
        <Sidebar />
    {/if}
    <main>
        <slot />
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

        overflow-x: hidden;
        overflow-y: scroll;
    }
    div[mobile].showNavigation {
        grid-template-columns: auto 1fr;
    }
</style>
