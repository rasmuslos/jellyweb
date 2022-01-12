<script lang="ts">
    import {blur} from "svelte/transition"
    import {getFallbackGradient} from "$lib/helper";

    export let url: string
    export let alt: string = ""

    let showImage = true
</script>

<div class="holder">
    <div class="fallback" style={getFallbackGradient(url ?? alt)}>
        <h1>{alt.split(" ").splice(0, 2).map(str => str[0]).join("")}</h1>
    </div>
    {#key showImage}
        {#if showImage}
            {#key url}
                <img src={url} on:error={() => showImage = false} alt={alt ?? url} title={alt ?? "?"} transition:blur />
            {/key}
        {/if}
    {/key}
    <div class="overlay"></div>
</div>

<style>
    div.holder {
        position: relative;
        display: block;
        
        height: 100%;
        width: 100%;

        overflow: hidden;
        border-radius: 10px;
    }
    div.holder > * {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
    }

    div.fallback {
        border-radius: 10px;
    }
    div.fallback h1 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        margin: 0;
        color: var(--text);
    }

    img {
        object-fit: cover;
    }
</style>