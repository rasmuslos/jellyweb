<script lang="ts">
    import type {Recommendation} from "$lib/typings";
    import ApplyMeasurements from "../../ApplyMeasurements.svelte";
    import RecommendedRow from "./RecommendedRow.svelte";
    import {_} from "svelte-i18n";
    import List from "../../util/List.svelte";

    export let items: Recommendation[]
</script>

<Push smaller />
<ApplyMeasurements>
    <h2>{$_("pages.home.recommended")}</h2>
    <List>
        {#each items as recommendation}
            <RecommendedRow {recommendation} />
        {/each}
    </List>
</ApplyMeasurements>

<style>
    h2 {
        margin: 0;
    }
</style>