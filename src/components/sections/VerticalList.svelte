<script lang="ts">
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import VerticalListInner from "../helper/sections/VerticalListInner.svelte";
    import type {Item} from "$lib/typings/internal";

    export let items: Item[]
    export let title: string = ""
    export let wide: boolean = true
    export let small: boolean = false
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