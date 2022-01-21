<script lang="ts">
    import LazyList from "../../../components/util/LazyList.svelte";
    import {page, session} from "$app/stores";
    import Push from "../../../Push.svelte";
    import Heading from "../../../components/hero/Heading.svelte";

    const type: "MOVIES" | "SERIES" = $page.params?.type?.toUpperCase() as any ?? "MOVIES"

    let query = ""

    $: {
        switch(type) {
            case "MOVIES":
                query = `Users/${$session.data.id}/Items?includeItemTypes=Movie&sortBy=SortName&sortOrder=Ascending`
                break
            case "SERIES":
                query = `Users/${$session.data.id}/Items?includeItemTypes=Series&sortBy=SortName&sortOrder=Ascending`
                break
        }
    }
</script>

<Push />
<Heading>{type}</Heading>
<Push />
{#key query}
    <LazyList {query} />
{/key}
<Push />