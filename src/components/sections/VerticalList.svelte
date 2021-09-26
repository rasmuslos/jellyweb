<script lang="ts">
    import type {Item} from "$lib/typings";
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import VerticalListInner from "../helper/sections/VerticalListInner.svelte";

    export let items: Item[]
    export let title: string = ""
    export let wide: boolean = true
</script>

<section>
    <ApplyWidth>
        {#if title}
            <h1>{title}</h1>
        {/if}
        <VerticalListInner on:mouseover {items} {wide} />
    </ApplyWidth>
</section>