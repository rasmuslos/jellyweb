<script lang="ts">
    import Search from "../../../components/util/Search.svelte";
    import ApplyMeasurements from "../../../components/ApplyMeasurements.svelte";
    import Push from "../../../components/util/Push.svelte";
    import Heading from "../../../components/hero/Heading.svelte";
</script>

<svelte:head>
    <title>Search</title>
</svelte:head>

<ApplyMeasurements smaller>
    <Push />
    <Heading>Search</Heading>
    <Push smaller />
    <div>
        <Search />
    </div>
    <Push />
</ApplyMeasurements>

<style>
    div {
        display: block;
        margin: 0 auto;

        width: 700px;
        max-width: 100%;
    }
</style>