<script context="module" lang="ts">
    import {setFetcher, me as getMe} from "$lib/api/internal";
    import type {User} from "$lib/typings";

    export async function load({session, fetch}) {
        if(session == null || session.active == null) {
            return {
                status: 302,
                redirect: "/user/login",
            }
        } else {
            setFetcher(fetch)
            const me: User = await getMe()

            return {
                status: 200,
                props: {
                    me,
                }
            }
        }
    }
</script>
<script lang="ts">
    import "normalize.css"

    import Navigation from "../components/navigation/Navigation.svelte";
    import {modal, noPadding} from "$lib/stores";
    import {onMount} from "svelte";

    export let me: User
    let Modal

    onMount(async () => {
        const svelteSimpleModal = await import('svelte-simple-modal')
        Modal = svelteSimpleModal.default

        // oof
        history.pushState = new Proxy(history.pushState, {
            apply (target, thisArg, argumentsList) {
                if(document.querySelector("#svelte > div")) document.querySelector("#svelte > div").scrollTo(0, 0)
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