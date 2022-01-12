<script lang="ts">
    import {_} from "svelte-i18n";
    import {Recommendation} from "$lib/typings";
    import ItemList from "../../util/ItemList.svelte";

    export let recommendation: Recommendation
</script>

<div class="wrapper">
    <h4>{$_(recommendation.reason, { values: { title: recommendation.title }})}</h4>
    <ItemList items={recommendation.items} overflow={false} hideExpand />
</div>

<style>
    div.wrapper {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;

        margin-right: 20px;

        position: relative;
    }

    h4 {
        color: var(--grey);
        font-weight: normal;
        white-space: nowrap;

        width: fit-content;
        margin-bottom: 14px;

        position: -webkit-sticky;
        position: sticky;
        top: 0;
        left: 0;
    }
</style>