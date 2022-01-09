<script lang="ts">
    import type {Item} from "$lib/typings";
    import Featured from "./Featured.svelte";
    import ApplyMeasurements from "../../ApplyMeasurements.svelte";
    import FeaturedSmall from "./FeaturedSmall.svelte";

    export let items: Item[]
</script>

<ApplyMeasurements>
    <div class="wrapper">
        {#if items.length}
            <Featured item={items[0]} />
            <div class="holder">
                {#if items.length > 2}
                    {#each items.splice(1) as item}
                        <FeaturedSmall {item} />
                    {/each}
                {/if}
            </div>
        {/if}
    </div>
</ApplyMeasurements>

<style>
    div.wrapper {
        display: grid;
        grid-template-rows: 500px;
        grid-template-columns: 1000px auto;
    }
    div.holder {
        display: flex;
        flex-direction: column;

        padding: 0 20px;
        overflow: scroll;
    }

   @media screen and (max-width: 1000px) {
       div.wrapper {
           grid-template-rows: 500px 350px;
           grid-template-columns: 1fr;
       }
       div.holder {
           margin: 20px 0;
           padding: 0;
       }
   }
</style>