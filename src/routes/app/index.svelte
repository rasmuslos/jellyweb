<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";
    import {setFetcher} from "$lib/api/internal";
    import {getHomeItems} from "$lib/api/internal/methods/v3";

    export const load: Load = async ({fetch, session}) => {
        if(session.data == null) return {
            status: 302,
            redirect: "/auth/login"
        }

        setFetcher(fetch)
        const items = await getHomeItems()

        return {
            props: {
                ...items,
            }
        }
    }
</script>
<script lang="ts">
    import type {Item, Recommendation} from "$lib/typings";
    import Hero from "../../components/hero/cards/Hero.svelte";
    import Push from "../../Push.svelte";
    import Recommended from "../../components/hero/cards/Recommended.svelte";

    export let featured: Item[]
    export let suggested: Item[]
    export let recommendations: Recommendation[]
</script>

<Push />
<Hero items={featured} />
<Push />
{#if recommendations?.length}
    <Recommended items={recommendations} />
{/if}