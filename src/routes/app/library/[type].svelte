<script lang="ts">
    import LazyList from "../../../components/util/LazyList.svelte";
    import Push from "../../../Push.svelte";
    import Heading from "../../../components/hero/Heading.svelte";
    import {page} from "$app/stores";
    import {onDestroy} from "svelte";

    let query: string
    let type: "MOVIES" | "SERIES" | "COLLECTIONS"

    let unsubscribe = page.subscribe(({ params }) => {
        type = params.type?.toUpperCase() as any

        switch(type) {
            case "MOVIES":
                query = "includeItemTypes=Movie&sortBy=SortName&sortOrder=Ascending"
                break
            case "SERIES":
                query = "includeItemTypes=Series&sortBy=SortName&sortOrder=Ascending"
                break
            case "COLLECTIONS":
                query = "includeItemTypes=Boxset&sortBy=SortName&sortOrder=Ascending"
                break
        }
    })
    onDestroy(() => unsubscribe && unsubscribe())
</script>

<Push />
<Heading>{type}</Heading>
<Push />
{#key query}
    <LazyList {query} />
{/key}
<Push />