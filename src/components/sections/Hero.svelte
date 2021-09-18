<script lang="ts">
    import type {Item} from "$lib/typings";
    import {getLargeBackdrop} from "$lib/helper";
    import HeroInner from "./HeroInner.svelte";
    import BackgroundSection from "./BackgroundSection.svelte";
    import Wave from "./Wave.svelte";

    export let item: Item
    export let tip: string = null
    export let includeWave: boolean = false
    export let includeMoreButton: boolean = true
</script>

<BackgroundSection url={getLargeBackdrop(item)}>
    <HeroInner {item} {tip} {includeMoreButton} />
    {#if includeWave}
        <Wave colored={false} />
    {/if}
</BackgroundSection>