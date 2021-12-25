<script lang="ts">
    import {generateImageUrl, generateImageUrlIndex, getIconByType} from "$lib/helper";
    import {icons} from "feather-icons";
    import {onMount} from "svelte";
    import {decode, isBlurhashValid} from "blurhash";
    import {browser} from "$app/env";
    import type {Item} from "$lib/typings/internal";

    export let stretch: boolean = false
    export let wide: boolean = false
    export let small: boolean = false
    export let item: Item = null

    export let badge: number | string = null
    let canvas: HTMLCanvasElement
    let visible: boolean = true

    export let url = null

    onMount(async () => {
        if(browser && canvas && isBlurhashValid(item.images.normal.hash)) {
            const width = 18
            const height = 18

            const data = decode(item.images.normal.hash, width, height)

            canvas.width = 18
            canvas.height = 18

            const context = canvas.getContext("2d")
            const image = context.createImageData(width, height)

            image.data.set(data)
            context.putImageData(image, 0, 0)
        }
    })
</script>

<style>
    div.holder {
        position: relative;
        cursor: pointer;

        border-radius: 10px;
        overflow: hidden;

        /*
        transition: width 500ms ease;
        */
        background-color: var(--background-secondary);

        width: 200px;
        height: 300px;
    }
    div.holder.small {
        width: 133px;
        height: 200px;
    }
    div.holder.wide {
        width: 300px;
        height: 170px;
    }
    div.holder.stretch {
        width: 100%;
        height: 200px;
    }

    canvas {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
    }

    img {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    div.holder .type {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(2);

        height: 24px;
        width: 24px;
    }
    div:hover .type {
        display: none;
    }

    div.overlay {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
    }

    div.progress_holder {
        position: absolute;
        left: 15px;
        bottom: 13px;

        height: 5px;
        width: calc(100% - 30px);

        opacity: 0.8;
        border-radius: 5px;
        background-color: var(--background-light);
    }
    div.progress {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        opacity: 0.8;

        background-color: var(--highlight);
        border-radius: 5px;
    }

    div.play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        opacity: 0;
        transition: opacity 150ms ease;

        color: var(--white);
    }
    div:hover div.play {
        opacity: 1;
    }

    div.badge {
        position: absolute;
        top: 0;
        right: 0;

        height: 24px;
        width: 24px;

        line-height: 24px;
        text-align: center;
        color: var(--white);

        box-sizing: content-box;
        padding: 5px;

        border-bottom-left-radius: 10px;
        background-color: rgba(0, 0, 0, 0.4);
    }

    @media screen and (max-width: 1000px) {
        div.holder:not(.wide), div.holder.small {
            width: min(calc(33vw - 20px), 120px);
            height: min(calc((33vw - 20px) * 1.5), 180px);
        }
    }
</style>

<div class="holder" class:wide class:small class:stretch on:click>
    {#if item && item.images.normal.hash != null}
        <canvas bind:this={canvas}></canvas>
    {/if}
    {#if (url || (item && item.images.normal.tag != null)) && visible}
        <img src={url ? url : wide ? generateImageUrlIndex(item.images.wide.parent ? item.showData.showId : item.id, item.images.wide.tag, item.images.wide.index, `Backdrop`) : generateImageUrl(item.id, item.images.normal.tag, `Primary`)} alt="{item ? item.name : null}" on:error={() => visible = false} />
    {:else}
        <div class="type">
            {@html getIconByType(item)}
        </div>
    {/if}
    {#if item && item.playedPercentage > 0}
        <div class="progress_holder">
            <div style="width: {item.playedPercentage || `0`}%" class="progress"></div>
        </div>
    {/if}
    <div class="overlay"></div>
    {#if url || item.playable}
        <div class="play">
            {@html icons.play.toSvg({height: 50, width: 50})}
        </div>
    {/if}
    {#if badge}
        <div class="badge">
            {#if typeof badge === "string"}
                {@html badge}
            {:else}
                {badge}
            {/if}
        </div>
    {/if}
</div>