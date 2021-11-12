<script lang="ts" context="module">
    import {getGenres, setFetcher} from "$lib/api/internal";
    import type {JellyfinItem} from "$lib/typings/jellyfin";
    import {t} from "$lib/i18n";

    export async function load({ fetch }) {
        setFetcher(fetch);
        const genres = await getGenres()

        return {
            status: 200,
            props: {
                genres
            }
        }
    }
</script>
<script lang="ts">
    import Genres from "../components/sections/Genres.svelte";
    import LargeHeading from "../components/helper/LargeHeading.svelte";
    export let genres: JellyfinItem[]
</script>

<svelte:head>
    <title>{$t("nav.genres")}</title>
</svelte:head>

<LargeHeading>{$t("genres")}</LargeHeading>
<Genres big {genres} />