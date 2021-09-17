<script lang="ts">
    import type {Item} from "$lib/typings";
    import ApplyWidth from "./ApplyWidth.svelte";
    import VerticalListInner from "./VerticalListInner.svelte";

    export let items: Item[]
</script>

<section>
    <ApplyWidth>
        <h1>Next up</h1>
        <VerticalListInner on:mouseover {items} />
    </ApplyWidth>
</section>