<script lang="ts">
    import LazyList from "../../../components/util/LazyList.svelte";
    import Push from "../../../components/util/Push.svelte";
    import Heading from "../../../components/hero/Heading.svelte";
    import {page} from "$app/stores";
    import {onDestroy} from "svelte";
    import {_} from "svelte-i18n";

    let query: string
    let type: "MOVIES" | "SERIES" | "COLLECTIONS" | "FAVORITES"

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
            case "FAVORITES":
                query = "IsFavorite=true&sortBy=SortName&sortOrder=Ascending"
                break
        }
    })
    onDestroy(() => unsubscribe && unsubscribe())
</script>

<svelte:head>
    <title>{$_(`navigation.${type?.toLowerCase()}`)}</title>
</svelte:head>

<Push />
<Heading>{$_(`navigation.${type?.toLowerCase()}`)}</Heading>
<Push />
{#key query}
    <LazyList {query} limit={27} />
{/key}
<Push />