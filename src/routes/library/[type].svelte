<script lang="ts">
    import LazyList from "../../components/helper/LazyList.svelte";
    import {page} from "$app/stores";
    import {onDestroy} from "svelte";
    import QueryBuilder from "../../components/helper/QueryBuilder.svelte";

    let typeQuery
    let sortQuery

    const unsubscribe = page.subscribe(({ params }) => {
        const type = params.type || "worst"

        if(type === "worst") typeQuery = "SortBy=CommunityRating&includeItemTypes=Movie&sortOrder=Ascending"
        else if(type === "movies") typeQuery = "includeItemTypes=Movie"
        else if(type === "series") typeQuery = "includeItemTypes=Series"
    })
    onDestroy(unsubscribe)
</script>

<QueryBuilder bind:sortQuery />
{#key typeQuery, sortQuery}
    <LazyList query={`${typeQuery}&${sortQuery}`} />
{/key}