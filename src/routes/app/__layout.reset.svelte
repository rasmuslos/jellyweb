<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";
    import {activeModal, mobile} from "$lib/stores";
    import {isLoggedIn, isMobile, toggleSearchModal} from "$lib/helper";

    export const load: Load = ({session}) => {
        if(!isLoggedIn(session)) return {
            status: 302,
            redirect: "/auth/login",
        }

        mobile.set(isMobile(session.agent))
        return {
            status: 200,
        }
    }
</script>
<script lang="ts">
    import Layout from "../../components/Layout.svelte";
    import {theme} from "$lib/stores";
    import SearchOverlay from "../../components/util/SearchOverlay.svelte";

    const handleKeyUp = (event: KeyboardEvent) => {
        if(event.key === "k" && (event.metaKey || event.altKey || event.ctrlKey)) {
            toggleSearchModal()
            event.preventDefault()
        }
    }
</script>
<svelte:window on:keyup={handleKeyUp} />

<Layout showNavigation theme={$theme}>
    <slot />
</Layout>