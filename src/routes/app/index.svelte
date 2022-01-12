<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";
    import {setFetcher} from "$lib/api/internal";
    import {getHomeItems} from "$lib/api/internal/methods/v3";
    import {isLoggedIn} from "$lib/helper";

    export const load: Load = async ({fetch, session}) => {
        if(!isLoggedIn(session)) return {
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
    import Input from "../../components/form/Input.svelte";
    import ApplyMeasurements from "../../components/ApplyMeasurements.svelte";
    import {_} from "svelte-i18n";

    export let featured: Item[]
    export let suggested: Item[]
    export let recommendations: Recommendation[]
</script>

<Push />
<Hero items={featured} />
<Push />
<ApplyMeasurements smaller>
    <div>
        <Input type="text" placeholder={$_("pages.home.search")} large />
    </div>
</ApplyMeasurements>
<Push />
{#if recommendations?.length}
    <Recommended items={recommendations} />
{/if}

<style>
    div {
        display: block;
        margin: 0 auto;

        width: 700px;
        max-width: 100%;
    }
</style>