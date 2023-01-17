<script lang="ts">
    import type {Item} from "$lib/typings";
    import Image from "./Image.svelte";
    import {applyMaxWidth, getItemPath, getPlayedPercentage, wrap} from "$lib/helper";
    import {currentExpandedItemId, currentItemId, mobile} from "$lib/stores";
    import {_} from "svelte-i18n";
    import Button from "../form/Button.svelte";
    import {icons} from "feather-icons";

    export let item: Item
    export let wide: boolean = false
    export let stretch: boolean = false

    let timeout: number
    let expanded: boolean = false
    const progress = getPlayedPercentage(item)

    const setExpanded = (updated: boolean) => {
        if(updated) currentExpandedItemId.set(item.id)
        else $currentExpandedItemId === item.id && currentExpandedItemId.set(null)

        expanded = updated
    }

    const onMouseLeave = () => {
        clearTimeout(timeout)
        timeout = window.setTimeout(() => setExpanded(false), 500)
    }
    const onMouseEnter = () => {
        if($mobile || wide) return
        clearTimeout(timeout)
        timeout = window.setTimeout(() => setExpanded(true), 500)
    }
</script>

<a class="wrapper" class:expanded href={getItemPath(item.id)} sveltekit:prefetch class:wide data-id={item.id} on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
    <div class="holder">
        <Image url={wrap(applyMaxWidth(wide && !stretch ? item.images?.backdrop?.url : item.images?.primary?.url, 400))} alt={item.name} selected={$currentItemId === item.id} allowEnlarge={!expanded} {progress} />
        <span>
            {item.name}
            {#if wide && item.seriesInfo}
                <a on:click|stopPropagation href={getItemPath(item.seriesInfo.show)}>{item.seriesInfo.showName}</a>
            {/if}
        </span>

        {#if !item.userData?.watched && progress <= 0}
            <div class="badge"></div>
        {/if}
    </div>
    {#if !wide}
        <div class="additional">
            <h3>{item.name}</h3>
            <p>
                {item.overview ?? $_("items.description.unavailable")}
            </p>
            <div>
                {#if item.ratings?.audience}
                    <b>{@html icons["star"].toSvg({ "fill": "#F5C518", "stroke": "#F5C518", })} {item.ratings?.audience}</b>
                {/if}
                {#if item.ratings?.critic}
                    <b>🍅 {item.ratings?.critic}%</b>
                {/if}
                {#if item.rating}
                    <b>{item.rating}</b>
                {/if}
            </div>
            <Button large highlight>WATCH</Button>
        </div>
    {/if}
</a>

<style lang="less">
    a.wrapper {
        position: relative;

        flex: ~"min(calc(33vw - 20px), 193.66px) 0 0";
        width: ~"min(calc(33vw - 20px), 193.66px)";
        height: fit-content;

        display: grid;
        grid-template-rows: ~"calc(min(calc(calc(33vw - 20px) * 1.5), 300px) + 30px)";
        grid-template-columns: ~"min(calc(33vw - 20px), 193.66px) 0px";

        overflow: hidden;
        transition: all 500ms ease, padding-top 0ms ease;

        &.expanded {
            flex: ~"calc(min(calc(33vw - 20px), 200px) * 3 + 40px)" 0 0;
            grid-template-rows: ~"calc(min(calc(calc(33vw - 20px) * 1.5), 300px) + 20px)";
            grid-template-columns: ~"min(calc(33vw - 20px), 200px)" 1fr;

            top: -20px;
            box-shadow: 0 3px 15px #00000020;

            padding: 20px 20px 0 20px;
            border-radius: 15px;
            background-color: var(--background-secondary);
            
            span {
                opacity: 0;
            }
            div.holder {
               grid-template-rows: ~"calc(100% - 20px)" auto;
            }
        }
        &.wide {
            flex: ~"min(calc(calc(33vw - 15px - 4vw) * 1.75), 300px)" 0 0;
            width: ~"min(calc(calc(33vw - 15px - 4vw) * 1.75), 300px)";

            grid-template-rows: 100%;
            grid-template-columns: 100%;

            div.holder {
                grid-template-rows: ~"min(calc(33vw - 15px - 4vw), 175px)" auto;
            }
        }
    }

    div.holder {
        position: relative;
        width: 100%;

        display: grid;
        grid-template-rows: ~"calc(100% - 30px)" auto;
        grid-template-columns: 1fr;
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

        &::before {
            content: "·";
            padding-right: 3px;
        }
    }

    div.additional {
        width: ~"calc(calc(calc(min(calc(33vw - 20px), 200px) * 3 + 40px) - min(calc(33vw - 20px), 200px)) - 40px)";

        padding: 20px;
        overflow: hidden;

        display: inline-flex;
        flex-direction: column;

        h3 {
            font-weight: bolder;
            margin: 0;
        }
        p {
            overflow: scroll;
            margin-bottom: auto;
        }
        div {
            margin-top: 10px;

            b {
                font-weight: bold;
                margin: 0 2px;
            }
        }

        :global(svg) {
            position: relative;
            top: 1px;

            height: 15px;
            width: 15px;
        }
    }
</style>