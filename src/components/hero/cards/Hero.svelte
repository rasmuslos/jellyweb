<script lang="ts">
    import type {Item} from "$lib/typings";
    import Featured from "./Featured.svelte";
    import ApplyMeasurements from "../../ApplyMeasurements.svelte";
    import FeaturedSmall from "./FeaturedSmall.svelte";
    import Push from "../../util/Push.svelte";
    import {mobile} from "$lib/stores";
    import Search from "../../util/Search.svelte";
    import {session} from "$app/stores";
    import {capitalizeFirst} from "$lib/helper";
    import {_} from "svelte-i18n";
    import {icons} from "feather-icons";

    export let items: Item[]
</script>

<div class="outer">
    <Push />
    <ApplyMeasurements larger>
        <div class="header">
            <h1>👋 {$_("util.hello", { values: { name: capitalizeFirst($session.data.name) }})}</h1>
            <div class="icons">
                <a sveltekit:prefetch href="/app/library/favorites" class="favorite">{@html icons["heart"].toSvg({ title: $_("pages.home.favorites") })}</a>
            </div>
        </div>
    </ApplyMeasurements>
    <Push />
    <ApplyMeasurements>
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
            <Push big />
        </div>
    </ApplyMeasurements>
</div>
{#if !$mobile}
    <div class="input">
        <Search overlay />
    </div>
{/if}

<style lang="less">
    div.outer {
        background-color: var(--background-secondary);
    }

    div.header {
        display: flex;
        align-items: baseline;

        h1 {
            font-size: 35px;
            margin-right: auto;
            word-break: break-word;
        }

        .icons {
            display: flex;
            gap: 10px;

            margin-left: 5px;

            a {
                color: var(--grey);

                &.favorite :global(svg) {
                    fill: var(--red);
                    color: var(--red);
                }
                :global(svg) {
                    stroke-width: 2.5px;
                }
            }
        }
    }

    div.inner {
        display: grid;
        grid-template-rows: 550px;
        grid-template-columns: auto min(400px, 50%);
    }
    div.holder {
        display: flex;
        flex-direction: column;

        padding: 0 0 0 20px;
        overflow: scroll;

        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    div.input {
        position: relative;
        transform: translateY(-25px);

        display: block;
        margin: 0 auto;

        width: 700px;
        max-width: 100%;

        z-index: 2;
    }

   :global(#root.mobile) {
        div.inner {
            display: flex;
            flex-direction: row;
            overflow-x: auto;

            gap: 15px;

            width: 100%;
        }
        div.holder {
            margin: 20px 0;
            padding: 0;
        }
    }
</style>