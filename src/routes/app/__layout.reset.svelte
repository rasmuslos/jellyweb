<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";
    import {mobile} from "$lib/stores";
    import {isMobile} from "$lib/helper";

    export const load: Load = ({session}) => {
        if(session.data == null) return {
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