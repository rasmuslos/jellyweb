<script lang="ts">
    import {_} from "svelte-i18n";
    import {onMount} from "svelte";

    export let values: any = {}
    export let title: string = null
    export let center: boolean = false
    export let overflow: boolean = true

    export let expanded: boolean = false
    export let showExpand: boolean = false

    const showHeading: boolean = !!(showExpand || title)

    let holder: HTMLDivElement
    const isOverflowing = () => holder.scrollWidth > holder.clientWidth

    onMount(() => {
        if(showExpand) showExpand = isOverflowing()
    })
</script>

<div class="wrapper">
    {#if showHeading}
        <div class="heading">
            {#if title}
                <h2>
                    {$_(title, { values })}
                </h2>
            {/if}
            {#if showExpand}
                <span on:click={() => expanded = !expanded}>{$_(`items.sections.${expanded ? "collapse" : "expand"}`)}</span>
            {/if}
        </div>
    {/if}
    <div class:overflow class:center class:expanded class="holder" bind:this={holder}>
        <slot />
    </div>
</div>

<style lang="less">
    div.wrapper {
        justify-content: center;
    }

    div.holder {
        display: flex;
        flex-direction: row;

        gap: 20px;
        scrollbar-width: none;
        -ms-overflow-style: none;

        padding: 30px;
        margin: -30px;

        &::-webkit-scrollbar {
            display: none;
        }
        &.overflow {
            overflow-y: visible;
            overflow-x: auto;
        }
    }

    div.expanded {
        flex-wrap: wrap;
        overflow-x: hidden;
        & > :global(*) {
            margin-bottom: 25px;
        }
    }

    div.heading {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: auto 1fr;

        align-items: baseline;

        span {
            cursor: pointer;
            margin-left: 10px;
            color: var(--grey);

            text-transform: lowercase;
        }
    }

    :global(#root.mobile) {
        div.holder {
            gap: 13px;

            &.expanded, &.center {
                justify-content: center;
            }
        }
    }
</style>