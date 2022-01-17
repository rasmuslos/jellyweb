<script lang="ts">
    import type {Item} from "$lib/typings";
    import Featured from "./Featured.svelte";
    import ApplyMeasurements from "../../ApplyMeasurements.svelte";
    import FeaturedSmall from "./FeaturedSmall.svelte";
    import Push from "../../../Push.svelte";
    import Input from "../../form/Input.svelte";
    import {_} from "svelte-i18n";
    import {mobile} from "$lib/stores";

    export let items: Item[]
</script>

<ApplyMeasurements larger full>
    <div class="outer">
        <Push />
        <ApplyMeasurements smaller>
            <div class="wrapper">
                <div class="inner">
                    {#if items.length}
                        {#if $mobile}
                            {#each items as item}
                                <Featured {item} />
                            {/each}
                        {:else}
                            <Featured item={items[0]} />
                            <div class="holder shadow-top">
                                {#if items.length > 2}
                                    {#each [...items].splice(1) as item}
                                        <FeaturedSmall {item} />
                                    {/each}
                                {/if}
                            </div>
                        {/if}
                    {/if}
                </div>
                <Push smaller />
                <div class="input">
                    <Input type="text" placeholder={$_("pages.home.search")} large />
                </div>
            </div>
        </ApplyMeasurements>
    </div>
</ApplyMeasurements>

<style>
    div.outer {
        background-color: var(--background-secondary);
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    }

    div.inner {
        display: grid;
        grid-template-rows: 500px;
        grid-template-columns: auto 400px;
    }
    div.holder {
        display: flex;
        flex-direction: column;

        padding: 0 0 0 20px;
        overflow: scroll;

        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    div.holder::-webkit-scrollbar {
        display: none;
    }

    div.input {
        position: relative;
        transform: translateY(50%);

        display: block;
        margin: 0 auto;

        width: 700px;
        max-width: 100%;
    }
    div.input :global(label) {
        margin: 0;
    }
    div.input :global(input) {
        border: 3px solid var(--background);
    }

   :global(#root.mobile) div.inner {
       display: flex;
       flex-direction: row;
       overflow-x: auto;

       gap: 15px;

       width: 100%;
   }
    :global(#root.mobile) div.holder {
       margin: 20px 0;
       padding: 0;
   }
</style>