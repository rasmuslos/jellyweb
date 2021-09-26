<script lang="ts">
    import type {Item} from "$lib/typings";
    import {getLargeBackdrop} from "$lib/helper";
    import HeroInner from "../helper/sections/HeroInner.svelte";
    import BackgroundSection from "../helper/sections/BackgroundSection.svelte";
    import Wave from "./Wave.svelte";

    export let item: Item
    export let tip: string = null
    export let includeWave: boolean = false
    export let includeMoreButton: boolean = true
    export let reduceOffset: boolean = false
    export let hideImage: boolean = false
</script>

<BackgroundSection transparent={hideImage} url={!hideImage && getLargeBackdrop(item)}>
    <HeroInner {item} {tip} {includeMoreButton} {reduceOffset} />
    {#if includeWave}
        <Wave colored={false} />
    {/if}
</BackgroundSection>