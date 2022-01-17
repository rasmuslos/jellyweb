<script lang="ts">
    import type {Item} from "$lib/typings";
    import Image from "./Image.svelte";
    import {applyHeight, wrap} from "$lib/helper";
    import {getItemPath} from "$lib/helper";
    import {getFallbackGradient} from "$lib/helper";

    export let item: Item
    export let hideImage: boolean = false
</script>

<a class="holder" href={getItemPath(item.id)}>
    {#if hideImage}
        <div class="background" style={getFallbackGradient(item.id)}></div>
    {:else}
        <Image url={wrap(applyHeight(item.images?.primary?.url, 500))}/>
        <div class="blur"></div>
    {/if}
    <h1>{item.name}</h1>
</a>

<style>
    a.holder {
        position: relative;
        height: min(calc(23vw - 20px), 100px);
        flex: min(calc(calc(23vw - 20px) * 3), 300px) 0 0;
        width: min(calc(calc(23vw - 20px) * 3), 300px);

        overflow: hidden;
        border-radius: 15px;
    }
    a.holder > div {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
    }

    div.blur {
        filter: blur(20px);
        background-color: #00000070;
    }
    h1 {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        width: 100%;
        text-align: center;

        margin: 0;
        color: white;
    }
</style>