<script lang="ts">
    import type {Recommendation} from "$lib/typings";
    import ApplyMeasurements from "../../ApplyMeasurements.svelte";
    import RecommendedRow from "./RecommendedRow.svelte";
    import {_} from "svelte-i18n";

    export let items: Recommendation[]
</script>

<ApplyMeasurements>
    <h2>{$_("pages.home.recommended")}</h2>
    <div class="wrapper">
        {#each items as recommendation}
            <RecommendedRow {recommendation} />
        {/each}
    </div>
</ApplyMeasurements>

<style>
    h2 {
        margin: 0;
    }
    div.wrapper {
        display: flex;
        overflow-x: auto;
        padding-bottom: 20px;
    }
</style>