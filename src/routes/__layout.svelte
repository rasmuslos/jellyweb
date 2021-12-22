<script context="module" lang="ts">
    import {setFetcher, getMe, getPreferences} from "$lib/api/internal";
    import type {Settings, User} from "$lib/typings/jellyfin";
    import {settings} from "$lib/stores";
    import {init} from "$lib/helper";

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

                init()
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
    import {modal, noPadding, preferences} from "$lib/stores";
    import {onMount} from "svelte";
    import {scrollUp} from "$lib/helper";
    import Layout from "../components/Layout.svelte";

    let Modal
    export let me: User

    onMount(async () => {
        const svelteSimpleModal = await import('svelte-simple-modal')
        Modal = svelteSimpleModal.default

        // oof
        history.pushState = new Proxy(history.pushState, {
            apply(target, thisArg, argumentsList) {
                scrollUp()
                Reflect.apply(target, thisArg, argumentsList)
            }
        })
    })
</script>

<style>
    main {
        position: relative;
        padding-bottom: 50px;
    }
    main:not(.no-padding) {
        padding-top: 75px;
    }
</style>

<Layout theme={$preferences.theme}>
    <Navigation {me} />
    <main class:no-padding={$noPadding}>
        <slot />
    </main>

    <svelte:component
            this={Modal}
            show={$modal}
            closeButton={false}

            styleWindowWrap={{
                "height": "100%",
                "width": "100%",
                "margin": 0,
                "padding": "200px 0",
                "overflow": "hidden",
            }}
            styleWindow={{
                "display": "block",
                "margin": "0 auto",
                "height": "100%",
                "background-color": "transparent",
                "overflow": "hidden",
            }}
            styleContent={{
                "padding": 0,
                "overflow": "hidden",
            }}
            styleBg={{ "display": "block" }}

            on:close={() => modal.set(null)} />
</Layout>