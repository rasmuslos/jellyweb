<script lang="ts">
    import type {Item} from "$lib/typings";
    import Image from "./Image.svelte";
    import {applyHeight, getFallbackGradient, getItemPath, wrap} from "$lib/helper";
    import { onMount } from "svelte";

    export let item: Item
    export let hideImage: boolean = false

    let fallback: string
    onMount(async () => {
        fallback = getFallbackGradient(item.id)
    })
</script>

<a class="holder" href={getItemPath(item.id)} sveltekit:prefetch>
    {#if hideImage}
        <div class="background" style={fallback}></div>
    {:else}
        <Image url={wrap(applyHeight(item.images?.primary?.url, 500))}/>
        <div class="blur"></div>
    {/if}
    <h3>{item.name}</h3>
</a>

<style lang="less">
    a.holder {
        position: relative;
        height: 80px;
        width: ~"min(calc(50% - 15px), 300px)";
        flex: ~"min(calc(50% - 15px), 300px)" 0 0;

        overflow: hidden;
        border-radius: 10px;

        & > div {
            position: absolute;
            top: 0;
            left: 0;

            height: 100%;
            width: 100%;

            &.blur {
                filter: blur(20px);
                background-color: #00000070;
            }
        }

        h3 {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);

            width: 100%;
            text-align: center;

            margin: 0;
            color: white;
        }
    }

    :global(#root.mobile) {
        a.holder {
            height: 55px;
        }
    }
</style>