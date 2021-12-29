<script>
    import {mobile, navigationExpanded} from "$lib/stores";
    import ApplyMeasurements from "../../components/ApplyMeasurements.svelte";
</script>

<ApplyMeasurements>
    <h1>oof</h1>
    <p>
        {$mobile}
    </p>
    <button on:click={() => navigationExpanded.update(expanded => !expanded)}>
        TOGGLE
    </button>
</ApplyMeasurements>