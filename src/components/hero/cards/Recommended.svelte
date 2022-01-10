<script lang="ts">
    import {Recommendation} from "$lib/typings";
    import ApplyMeasurements from "../../ApplyMeasurements.svelte";
    import RecommendedRow from "./RecommendedRow.svelte";

    export let items: Recommendation[]
</script>

<ApplyMeasurements>
    <div class="wrapper">
        {#each items as recommendation}
            <RecommendedRow {recommendation} />
        {/each}
    </div>
</ApplyMeasurements>

<style>
    div.wrapper {
        display: flex;
        overflow-x: auto;

        padding: 20px 0;
    }
</style>