<script lang="ts">
    import type {Item} from "$lib/typings";
    import Image from "./Image.svelte";
    import {wrap, applyMaxWidth} from "$lib/helper";
    import {getItemPath} from "$lib/helper";
    import {currentItemId} from "$lib/stores";
    import {getPlayedPercentage} from "$lib/helper";
    import {goto} from "$app/navigation";

    export let item: Item
    export let wide: boolean = false
    export let stretch: boolean = false

    const progress = getPlayedPercentage(item)
</script>

<a class="wrapper" href={getItemPath(item.id)} class:wide data-id={item.id}>
    <Image url={wrap(applyMaxWidth(wide && !stretch ? item.images?.backdrop?.url : item.images?.primary?.url, 400))} alt={item.name} selected={$currentItemId === item.id} {progress} />
    <span>
        {item.name}
        {#if wide && item.seriesInfo}
            <a on:click|stopPropagation|preventDefault={() => goto(getItemPath(item.seriesInfo.show))} href={getItemPath(item.seriesInfo.show)}>{item.seriesInfo.showName}</a>
        {/if}
    </span>

    {#if !item.userData?.watched && progress <= 0}
        <div class="badge"></div>
    {/if}
</a>

<style>
    a.wrapper {
        position: relative;

        flex: min(calc(33vw - 20px), 200px) 0 0;
        width: min(calc(33vw - 20px), 200px);
        height: fit-content;

        display: grid;
        grid-template-rows: min(calc(calc(33vw - 20px) * 1.5), 300px) auto;
        grid-template-columns: 1fr;
    }
    a.wrapper.wide {
        flex: min(calc(calc(35vw - 20px - 4vw) * 1.7), 300px) 0 0;
        grid-template-rows: min(calc(35vw - 20px - 4vw), 175px) auto;
    }

    div.badge {
        position: absolute;
        top: 10px;
        right: 10px;

        height: 15px;
        width: 15px;

        border-radius: 50%;
        background-color: var(--primary);
    }

    span {
        position: relative;
        display: block;

        text-align: center;

        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
        white-space: nowrap;

        padding: 5px;
    }
    span a {
        color: var(--grey);
    }
    span a::before {
        content: "·";
        padding-right: 3px;
    }
</style>