<script lang="ts">
    import {getIconByType, getImageData} from "$lib/helper";
    import {icons} from "feather-icons";
    import type {Item} from "$lib/typings";
    import {onMount} from "svelte";
    import {decode, isBlurhashValid} from "blurhash";
    import {browser} from "$app/env";

    export let wide: boolean = false
    export let item: Item

    export let badge: number | string = null
    let canvas: HTMLCanvasElement

    export let showProgress = item.Type === "Movie" || item.Type === "Episode" && item.UserData && item.UserData.PlayedPercentage
    export let isWatchable = item.Type === "Movie" || item.Type === "Episode"

    export let url
    const imageData = url ? { url, hash: null } : getImageData(item, wide)

    onMount(async () => {
        if(browser && canvas && isBlurhashValid(imageData.hash)) {
            const width = 18
            const height = 18

            const data = decode(imageData.hash, width, height)

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

        background-color: var(--background-secondary);

        width: 200px;
        height: 300px;
    }
    div.holder.wide {
        width: 300px;
        height: 170px;
    }

    canvas {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
    }

    div.image {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;

        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
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
    div.progress {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        opacity: 0.4;
        background-color: var(--highlight);
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
</style>

<div class="holder" class:wide on:click>
    {#if imageData.hash != null}
        <canvas bind:this={canvas}></canvas>
    {/if}
    {#if imageData.url != null}
        <div class="image" style="background-image: url('{imageData.url}')"></div>
    {:else}
        <div class="type">
            {@html getIconByType(item)}
        </div>
    {/if}
    <div style="width: {showProgress && item.UserData ? item.UserData.PlayedPercentage ?? `` : `0`}%" class="progress"></div>
    <div class="overlay"></div>
    {#if isWatchable}
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