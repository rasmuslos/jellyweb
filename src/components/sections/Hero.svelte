<script lang="ts">
    import type {Item} from "$lib/typings";
    import {getLargeBackdrop} from "$lib/helper";
    import HeroInner from "./HeroInner.svelte";

    export let item: Item
    export let tip: string = null
</script>

<style>
    section {
        overflow: hidden;

        background-color: var(--background-light);
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>

<section style="background-image: url('{getLargeBackdrop(item)}')">
    <HeroInner {item} {tip} />
</section>