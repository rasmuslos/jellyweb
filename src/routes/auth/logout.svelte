<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";
    import {setFetcher} from "$lib/api/internal";
    import {performLogout} from "$lib/api/internal/methods/v3";

    export const load: Load = async ({fetch, session}) => {
        setFetcher(fetch)
        await performLogout()

        return {
            status: 302,
            redirect: "/auth/login"
        }
    }
</script>