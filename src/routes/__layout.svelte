<script context="module">
    export async function load({session}) {
        if(session == null || session.active == null) {
            return {
                status: 302,
                redirect: "/user/login",
            }
        } else return { status: 200 }
    }
</script>
<script lang="ts">
    import "normalize.css"

    import Navigation from "../components/navigation/Navigation.svelte";
    import {noPadding} from "$lib/stores";
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
    <Navigation />
    <main class:no-padding={$noPadding}>
        <slot />
    </main>
</div>