<script lang="ts">
    import ApplyMeasurements from "../ApplyMeasurements.svelte";
    import {applyMaxHeight, wrap} from "$lib/helper";
    import type {Item} from "$lib/typings";
    import Image from "../item/Image.svelte";
    import {browser} from "$app/env";

    export let item: Item

    let root: HTMLDivElement
    let holder: HTMLDivElement

    const onScroll = () => {
        // Ensure that the scale factor is between 1 & 2
        if(holder && root && holder.querySelector("img")) window.requestAnimationFrame(() => holder.querySelector("img").style.transform = `scale(${Math.max(1, Math.min(2, root?.scrollTop * 0.009 ?? 1))})`)
    }

    $: {
        if(browser) {
            root = document.querySelector("#root main")

            if(root) {
                root.removeEventListener("scroll", onScroll)
                root.addEventListener("scroll", onScroll)
            }
        }
    }
</script>

<ApplyMeasurements>
    <div class="hero" bind:this={holder}>
        <Image url={wrap(applyMaxHeight(item.images?.backdrop?.url, 1200))} />
        <div class="overlay">
            <h1>{item.name}</h1>
            {#if item.tagline}
                <span>{item.tagline}</span>
            {/if}
            <div class="blur"></div>
        </div>
    </div>
</ApplyMeasurements>

<style>
    div.hero {
        position: relative;
        height: 600px;
        width: 100%;

        overflow: hidden;
        border-radius: 15px;
    }

    div.overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        text-align: center;
    }
    h1, span {
        position: relative;
        z-index: 1;
    }
    h1 {
        font-size: 60px;
        color: var(--white);

        margin: 10px 0;
    }
    span {
        background-clip: text;
        -webkit-background-clip: text;

        color: transparent;
        background-image: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
    }
    div.blur {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;

        filter: blur(20px);
        background-color: #00000070;
    }

    :global(#root.mobile) div.hero {
        height: 300px;
    }
</style>