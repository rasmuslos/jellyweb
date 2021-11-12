<script lang="ts" context="module">
    import {getGenre, getItem, setFetcher} from "$lib/api/internal";
    import {t} from "$lib/i18n";

    export async function load({ fetch, page }) {
        const { id } = page.params

        setFetcher(fetch);
        const genre = await getGenre(id)

        return {
            status: 200,
            props: { genre }
        }
    }
</script>
<script lang="ts">
    import type {Genre} from "$lib/typings/internal";
    import QueryBuilder from "../../components/helper/search/QueryBuilder.svelte";
    import LazyList from "../../components/helper/sections/LazyList.svelte";
    import LargeHeading from "../../components/helper/LargeHeading.svelte";

    let sort: string
    export let genre: Genre
</script>

<LargeHeading>{genre.name}</LargeHeading>
<QueryBuilder bind:sortQuery={sort} />
<LazyList query="genres={genre.name}&includeItemTypes=Movie,Series&{sort}" />