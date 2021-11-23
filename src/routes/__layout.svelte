<script context="module" lang="ts">
    import {setFetcher, getMe, getPreferences} from "$lib/api/internal";
    import type {Settings, User} from "$lib/typings/jellyfin";
    import {settings} from "$lib/stores";
    import {lightMode} from "$lib/helper";

    export async function load({session, fetch}) {
        if(session == null || session.active == null) {
            return {
                status: 302,
                redirect: "/user/logout",
            }
        } else {
            try {
                setFetcher(fetch)
                const [me, preferences]: [User, Settings] = await Promise.all([getMe(false), getPreferences()])

                settings.set(preferences)

                return {
                    status: 200,
                    props: {
                        me,
                    }
                }
            } catch (error) {
                if(error.status === 401) return {
                        status: 302,
                        redirect: "/user/logout",
                    }
                else throw error
            }
        }
    }
</script>
<script lang="ts">
    import "normalize.css"

    import Navigation from "../components/navigation/Navigation.svelte";
    import {modal, noPadding} from "$lib/stores";
    import {onMount} from "svelte";
    import {scrollUp} from "$lib/helper";

    let Modal
    export let me: User

    onMount(async () => {
        const svelteSimpleModal = await import('svelte-simple-modal')
        Modal = svelteSimpleModal.default

        // oof
        history.pushState = new Proxy(history.pushState, {
            apply (target, thisArg, argumentsList) {
                scrollUp()
                Reflect.apply(target, thisArg, argumentsList)
            }
        })
    })
</script>

<style>
    div {
        position: relative;

        height: 100%;
        width: 100%;

        color: var(--text);
        font-size: var(--size);
        font-family: var(--font);

        background-color: var(--background);
        overflow-x: hidden;
        overflow-y: auto;
    }

    div:not(.light) {
        --background: #2E3440;
        --background-light: #3B4252;
        --background-secondary: #4C566A;

        --text: #D8DEE9;
        --dimmed: #6e788a;
        --secondary: #ECEFF4;
    }
    div.light {
        --background: #D8DEE9;
        --background-light: #E5E9F0;
        --background-secondary: #E5E9F0;

        --text: #2E3440;
        --dimmed: #4C566A;
        --secondary: #3B4252;
    }

    main {
        position: relative;
    }
    main:not(.no-padding) {
        padding-top: 75px;
    }
</style>

<svelte:head>
    {#if $lightMode}
        <meta name="theme-color" content="#D8DEE9">
    {:else}
        <meta name="theme-color" content="#2E3440">
    {/if}
</svelte:head>
<div class:light={$lightMode}>
    <Navigation {me} />
    <main class:no-padding={$noPadding}>
        <slot />
    </main>

    <svelte:component
            this={Modal}
            show={$modal}
            closeButton={false}

            styleContent={{ padding: 0 }}
            styleWindow={{ "background-color": "transparent", "margin-top": "200px" }}
            styleBg={{ "display": "block" }}

            on:close={() => modal.set(null)} />
</div>