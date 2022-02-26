<script lang="ts">
    import type {Item} from "$lib/typings";
    import Image from "./Image.svelte";
    import {applyHeight, wrap} from "$lib/helper";
    import {getItemPath} from "$lib/helper";
    import {getFallbackGradient} from "$lib/helper";

    export let item: Item
    export let hideImage: boolean = false
</script>

<a class="holder" href={getItemPath(item.id)} sveltekit:prefetch>
    {#if hideImage}
        <div class="background" style={getFallbackGradient(item.id)}></div>
    {:else}
        <Image url={wrap(applyHeight(item.images?.primary?.url, 500))}/>
        <div class="blur"></div>
    {/if}
    <h3>{item.name}</h3>
</a>

<style>
    a.holder {
        position: relative;
        height: min(calc(33vw - 60px - 4vw), 80px);
        width: min(calc(33vw - 15px - 4vw), 300px);
        flex: min(calc(33vw - 15px - 4vw), 300px) 0 0;

        overflow: hidden;
        border-radius: 10px;
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
    h3 {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        width: 100%;
        text-align: center;

        margin: 0;
        color: white;
    }
</style>