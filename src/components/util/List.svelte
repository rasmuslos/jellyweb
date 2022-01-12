<script lang="ts">
    import {_} from "svelte-i18n";
    import {onMount} from "svelte";

    export let overflow: boolean = true
    export let title: string = null

    export let hideExpand: boolean = false
    let expanded: boolean = false

    const showHeading: boolean = !!(!hideExpand || title)

    let wrapper: HTMLDivElement
    const isOverflowing = () => wrapper.scrollHeight > wrapper.clientHeight || wrapper.scrollWidth > wrapper.clientWidth

    onMount(() => !hideExpand && (hideExpand = isOverflowing()))
</script>

<div class="wrapper" bind:this={wrapper}>
    {#if showHeading}
        <div class="heading">
            {#if title}
                <h2>
                    {$_(title)}
                </h2>
            {/if}
            {#if !hideExpand}
                <span on:click={() => expanded = !expanded}>{$_(`items.sections.${expanded ? "collapse" : "expand"}`)}</span>
            {/if}
        </div>
    {/if}
    <div class:overflow class:expanded class="holder">
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
    }
    div.holder.expanded {
        justify-content: center;
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
</style>