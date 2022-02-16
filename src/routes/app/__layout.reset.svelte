<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";
    import {mobile} from "$lib/stores";
    import {loadSettings} from "$lib/helper/settings"
    import {isLoggedIn, isMobile, toggleSearchModal} from "$lib/helper";

    export const load: Load = ({session, fetch}) => {
        if(!isLoggedIn(session)) return {
            status: 302,
            redirect: "/auth/login",
        }

        setFetcher(fetch)
        loadSettings()

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
import { setFetcher } from "$lib/api/internal";

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