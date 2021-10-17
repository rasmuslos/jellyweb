<script context="module" lang="ts">
    import {setFetcher, me as getMe} from "$lib/api/internal";
    import type {User} from "$lib/typings";

    export async function load({fetch}) {
        try {
            setFetcher(fetch)
            const me: User = await getMe()

            return {
                status: 200,
                props: {
                    me,
                }
            }
        } catch(error) {
            return {
                status: 301,
                redirect: "/error"
            }
        }
    }
</script>
<script lang="ts">
    import Settings from "../components/sections/Settings.svelte";

    // export let me: User
</script>

<svelte:head>
    <title>Settings</title>
</svelte:head>

<section>
    <Settings />
</section>