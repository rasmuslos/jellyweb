<script lang="ts">
    import type {JellyfinItem} from "$lib/typings/jellyfin";
    import {convert} from "$lib/helper";
    import Video from "./Video.svelte";
    import Debug from "./Debug.svelte";
    import {onMount} from "svelte";
    import {source} from "$lib/stores";

    export let item: JellyfinItem
    const converted = convert(item, true)

    onMount(() => {
        source.set(null)

        // bit
    })
</script>

<style>
    section.video {
        position: relative;

        height: 100vh;
        width: 100vw;

        overflow: hidden;
        background-color: black;
    }
</style>

<section class="video">
    <Video />
    <Debug />
</section>