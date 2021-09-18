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
    import {noPadding} from "$lib/stores";

    export let me: User
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
        overflow: auto;
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
</div>