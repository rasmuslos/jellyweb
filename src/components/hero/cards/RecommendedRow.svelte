<script lang="ts">
    import {_} from "svelte-i18n";
    import type {Recommendation} from "$lib/typings";
    import ItemList from "../../util/ItemList.svelte";
    import { currentExpandedItemId } from "$lib/stores";

    export let recommendation: Recommendation
</script>

<div class="wrapper">
    <h4 class:hidden={$currentExpandedItemId != null}>{$_(recommendation.reason, { values: { title: recommendation.title }})}</h4>
    <ItemList items={recommendation.items} overflow={false} />
</div>

<style lang="less">
    div.wrapper {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;

        position: relative;

        h4 {
            opacity: 1;
            margin: 10px 0 0 0;

            color: var(--grey);
            font-weight: normal;
            white-space: nowrap;

            width: fit-content;
            margin-bottom: 14px;

            position: -webkit-sticky;
            position: sticky;
            top: 0;
            left: 0;

            &.hidden {
                opacity: 0;
            }
        }
    }
</style>