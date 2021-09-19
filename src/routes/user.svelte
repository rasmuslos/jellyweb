<script context="module" lang="ts">
    import {setFetcher, me as getMe} from "$lib/api/internal";
    import type {User} from "$lib/typings";

    export async function load({fetch}) {
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
    import Settings from "../components/sections/Settings.svelte";

    export let me: User
</script>

<style>
</style>

<section>
    <!--.SETTINGS.-->
    <!--Background-Images-->
    <!--Darken images-->
    <Settings />
</section>