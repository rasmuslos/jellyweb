<script lang="ts">
    import {Theme} from '$lib/typings';
    import {isMobile, VERSION} from "$lib/helper";
    import "$lib/i18n"
    import {mobile} from "$lib/stores";
    import Sidebar from "./navigation/sidebar/Sidebar.svelte";
    import NavigationOverlay from "./navigation/bottom/NavigationOverlay.svelte";
    import {locale, waitLocale} from "svelte-i18n";
    import {onMount} from "svelte";
    import "normalize.css"
    import Overlay from './util/Overlay.svelte';
    import {session} from '$app/stores';

    const version = `?v=${encodeURIComponent(VERSION)}`
    let main: HTMLElement

    export let i18n: string = "en"
    export let theme: Theme = Theme.DARK
    export let showNavigation: boolean = true

    mobile.set(isMobile($session.agent))
    locale.set(i18n)
    waitLocale()

    onMount(() => {
        let lastLocationDetail: boolean = false

        history.pushState = new Proxy(history.pushState, {
            apply(target, thisArg, argumentsList) {
                Reflect.apply(target, thisArg, argumentsList)

                const detail = RegExp("\/?app\/[a-zA-Z0-9]{32}\/?").test(window.location.pathname)
                if(detail && lastLocationDetail) return
                lastLocationDetail = detail
                
                if(main) main.scrollTo({
                    top: 0,
                    left: 0,
                })
            }
        })
    })
</script>

<svelte:head>
    <link rel="stylesheet" href="/assets/fonts.css{version}" />
    <link rel="stylesheet" href="/assets/globals.css{version}" />
    <link rel="stylesheet" href="/assets/themes/{theme}.css{version}" />

    {#if theme === Theme.DARK}
        <meta name="theme-color" content="#0f101a" />
    {:else if theme === Theme.LIGHT}
        <meta name="theme-color" content="#EBF2FA" />
    {/if}
    {#if $mobile}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    {/if}
</svelte:head>

<div id="root" class:mobile={$mobile} class:showNavigation>
    {#if showNavigation && !$mobile}
        <Sidebar />
    {/if}
    <main bind:this={main}>
        <slot />
        {#if showNavigation && $mobile}
            <NavigationOverlay />
        {/if}
    </main>

    <Overlay />
</div>

<style lang="less">
    :global {
        html {
            line-height: 1.3;
        }
        body {
            height: 100vh;
            width: 100vw;
            overflow: hidden;

            color: var(--text);
            font-family: var(--font);
            background-color: var(--background);

            margin: 0;
            padding: 0;
        }

        *, *::before, *::after {
            transition: all 500ms ease;
            box-sizing: border-box;
        }
        *, *:focus {
            outline: none;
        }

        a, a:visited {
            color: inherit;
            text-decoration: none;
        }

        @media screen and (min-width: 1000px) and (max-width: 3000px) {
            body {
                zoom: 0.9;
            }
        }
    }

    div {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;

        height: 100%;
        width: 100%;

        &:not(.mobile).showNavigation {
            grid-template-columns: auto 1fr;
        }
        &.mobile.showNavigation {
            main {
                padding-bottom: ~"calc(env(safe-area-inset-top, 20px) + 150px)";
            }
        }
    }

    main {
        position: relative;
        min-height: 100%;
        width: 100%;

        overflow-x: hidden;
        overflow-y: scroll;

        padding: env(safe-area-inset-top, 20px) 0 env(safe-area-inset-bottom, 20px) 0;
    }
</style>
