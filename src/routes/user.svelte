<script context="module" lang="ts">
    import {setFetcher, me as getMe} from "$lib/api/internal";
    import type {User} from "$lib/typings";

    export async function load({session, fetch}) {
        setFetcher(fetch)
        const me: User = await getMe()

        return {
            status: 200,
            props: {
                me,
            }
        }
    }
</script>
<script lang="ts">
    import ApplyWidth from "../components/sections/ApplyWidth.svelte"

    export let me: User
</script>

<style>
</style>

<section>
    <ApplyWidth>
    </ApplyWidth>
</section>