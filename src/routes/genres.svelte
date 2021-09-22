<script lang="ts" context="module">
    import {genres as requestGenres, setFetcher} from "$lib/api/internal";
    import type {Item} from "$lib/typings";

    export async function load({ fetch }) {
        try {
            setFetcher(fetch);
            const genresObj = await requestGenres()

            return {
                status: 200,
                props: { genres: genresObj.genres }
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
    import Genres from "../components/sections/Genres.svelte";
    export let genres: Item[]
</script>

<svelte:head>
    <title>Genres</title>
</svelte:head>

<Genres big {genres} />