<script lang="ts">
    import {getFallbackGradient} from "$lib/helper";
    import { onMount } from "svelte";
    import {blur} from "svelte/transition"

    export let url: string
    export let alt: string = ""
    export let progress: number = null
    export let selected: boolean = false
    export let allowEnlarge: boolean = true

    let showImage = true
    let fallback: string

    onMount(async () => {
        fallback = getFallbackGradient(url ?? alt)
    })
</script>

{#key url}
    <div class="holder" class:selected class:allowEnlarge transition:blur|local>
        <div class="fallback" style={fallback}>
            <h1>{alt.split(" ").splice(0, 2).map(str => str[0]).join("")}</h1>
        </div>
        {#key showImage}
            {#if showImage}
                <img src={url} loading=lazy on:error={() => showImage = false} alt={alt ?? url} title={alt ?? "?"} />
            {/if}
        {/key}

        {#if progress}
            <div class="progress_holder">
                <div class="progress" style="width: {progress}px"></div>
            </div>
        {/if}
        <div class="overlay"></div>
    </div>
{/key}

<style lang="less">
    div.holder {
        position: relative;
        display: block;
        
        height: 100%;
        width: 100%;

        overflow: hidden;
        border-radius: 10px;
        perspective: 0;
        &.selected {
            border: 4px solid var(--primary);
        }
        & > * {
            position: absolute;
            top: 0;
            left: 0;

            height: 100%;
            width: 100%;
        }
    }

    div.fallback {
        border-radius: 10px;
        & h1 {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            margin: 0;
            color: var(--text);
        }
    }

    div.progress_holder {
        height: 4px;
        width: ~"calc(100% - 20px)";

        left: 10px;
        top: unset;
        bottom: 10px;

        border-radius: 100px;
        overflow: hidden;

        background-color: var(--background);

        div.progress {
            position: absolute;
            top: 0;
            left: 0;

            height: 100%;
            border-radius: 100px;
            background-color: var(--primary);
        }
    }

    img {
        object-fit: cover;
        object-position: center;
    }

    div.holder.allowEnlarge:hover {
        img {
            transform: scale(1.1);
        }
        h1 {
            font-size: 35px;
        }
    }
</style>