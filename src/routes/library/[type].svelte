<script lang="ts">
    import LazyList from "../../components/helper/LazyList.svelte";
    import {page} from "$app/stores";
    import {onDestroy} from "svelte";

    let query

    const unsubscribe = page.subscribe(({ params }) => {
        const type = $page.params.type || "worst"

        if(type === "worst") query = "SortBy=CommunityRating&includeItemTypes=Movie&sortOrder=Ascending"
        else if(type === "movies") query = "includeItemTypes=Movie&sortBy=SortName"
        else if(type === "series") query = "includeItemTypes=Series&sortBy=SortName"
    })
    onDestroy(unsubscribe)
</script>

{#key query}
    <LazyList {query} />
{/key}