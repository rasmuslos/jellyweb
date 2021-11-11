<script lang="ts">
    import type {JellyfinItem} from "$lib/typings/jellyfin";
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import VerticalListInner from "../helper/sections/VerticalListInner.svelte";

    export let items: JellyfinItem[]
    export let title: string = ""
    export let wide: boolean = true
    export let small: boolean
</script>

<style>
    h1 {
        margin-bottom: 7px;
    }
</style>

<section>
    <ApplyWidth>
        {#if title}
            <h1>{title}</h1>
        {/if}
        <VerticalListInner on:mouseover {items} {wide} {small} />
    </ApplyWidth>
</section>