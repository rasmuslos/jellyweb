<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";
    import {mobile} from "$lib/stores";
    import {isLoggedIn, isMobile} from "$lib/helper";

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
<script>
    import Layout from "../../components/Layout.svelte";
    import {Theme} from "$lib/typings";
</script>

<Layout showNavigation theme={Theme.LIGHT}>
    <slot />
</Layout>