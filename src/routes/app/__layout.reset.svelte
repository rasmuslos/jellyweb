<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";
    import {mobile} from "$lib/stores";
    import {isLoggedIn, isMobile, loadSettings, shouldFetchSettings, toggleSearchModal} from "$lib/helper";

    export const load: Load = async ({session, fetch}) => {
        if(!isLoggedIn(session)) return {
            status: 302,
            redirect: "/auth/login",
        }

        setFetcher(fetch)
        mobile.set(isMobile(session.agent))

        return {
            status: 200,
            props: {
                settings: await getSettings(),
            }
        }
    }
</script>
<script lang="ts">
    import Layout from "../../components/Layout.svelte";
    import {theme} from "$lib/stores";
    import { getSettings } from "$lib/api/internal/methods/v3";
    import type { Settings } from "$lib/typings";
    import { browser } from "$app/env";
    import { setFetcher } from "$lib/api/internal";

    export let settings: Settings

    if(browser && settings && shouldFetchSettings()) loadSettings(settings)

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