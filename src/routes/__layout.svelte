<script context="module" lang="ts">
    import {setFetcher, me as getMe, getDisplayPreferences} from "$lib/api/internal";
    import type {Settings, User} from "$lib/typings";
    import {settings} from "$lib/stores";

    export async function load({session, fetch}) {
        if(session == null || session.active == null) {
            return {
                status: 302,
                redirect: "/user/login",
            }
        } else {
            try {
                setFetcher(fetch)
                const [me, preferences]: [User, Settings] = await Promise.all([getMe(), getDisplayPreferences()])

                settings.set(preferences)

                return {
                    status: 200,
                    props: {
                        me,
                    }
                }
            } catch(error) {
                if(error.status && error.status == 401) return {
                    status: 302,
                    redirect: "/user/login",
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
    main {
        position: relative;
    }
    main:not(.no-padding) {
        padding-top: 75px;
    }
</style>

<div>
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