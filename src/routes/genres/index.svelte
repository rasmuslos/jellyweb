<script lang="ts" context="module">
    import {genres as requestGenres, setFetcher} from "$lib/api/internal";
    import type {Item} from "$lib/typings";

    export async function load({ fetch }) {
        setFetcher(fetch);
        const genresObj = await requestGenres()

        return {
            status: 200,
            props: { genres: genresObj.Items }
        }
    }
</script>
<script lang="ts">
    import Genres from "../../components/sections/Genres.svelte";
    export let genres: Item[]
</script>

<Genres big {genres} />