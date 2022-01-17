<script lang="ts">
    import {_} from "svelte-i18n";
    import {onMount} from "svelte";

    export let overflow: boolean = true
    export let title: string = null
    export let values: any = {}

    export let hideExpand: boolean = false
    let expanded: boolean = false

    const showHeading: boolean = !!(!hideExpand || title)

    let holder: HTMLDivElement
    const isOverflowing = () => holder.scrollWidth > holder.clientWidth

    onMount(() => {
        if(!hideExpand) hideExpand = !isOverflowing()
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
            {#if !hideExpand}
                <span on:click={() => expanded = !expanded}>{$_(`items.sections.${expanded ? "collapse" : "expand"}`)}</span>
            {/if}
        </div>
    {/if}
    <div class:overflow class:expanded class="holder" bind:this={holder}>
        <slot />
    </div>
</div>

<style>
    div.wrapper {
        justify-content: center;
    }

    div.holder {
        display: flex;
        flex-direction: row;

        gap: 20px;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    div.holder::-webkit-scrollbar {
        display: none;
    }
    div.holder.overflow {
        overflow-x: auto;
    }

    div.expanded {
        flex-wrap: wrap;
        overflow-x: hidden;
    }
    div.expanded > :global(*) {
        margin-bottom: 25px;
    }

    div.heading {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: auto 1fr;

        align-items: baseline;
    }
    span {
        cursor: pointer;
        margin-left: 10px;
        color: var(--grey);

        text-transform: lowercase;
    }

    :global(#root.mobile) div.holder.expanded {
        justify-content: center;
    }
</style>