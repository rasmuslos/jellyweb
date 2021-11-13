<script lang="ts">
    import {generateImageUrl} from "$lib/helper";
    import HeroInner from "../helper/sections/HeroInner.svelte";
    import BackgroundSection from "../helper/sections/BackgroundSection.svelte";
    import Wave from "./Wave.svelte";
    import type {Item} from "$lib/typings/internal";

    export let item: Item
    export let tip: string = null
    export let includeWave: boolean = false
    export let includeMoreButton: boolean = true
    export let includeActions: boolean = true
    export let reduceOffset: boolean = false
    export let hideImage: boolean = false

    export let noImage: boolean = false
    export let noButton: boolean = false
</script>

<BackgroundSection transparent={hideImage} url={!hideImage && item.images.wide && generateImageUrl(item.images.wide.parent ? item.showData.showId : item.id, item.images.wide.tag, "Backdrop")}>
    <HeroInner {item} {tip} {includeMoreButton} {reduceOffset} {noImage} {noButton} {includeActions} />
    {#if includeWave}
        <Wave colored={false} />
    {/if}
</BackgroundSection>