<script lang="ts">
    import type {Item} from "$lib/typings";
    import {getLargeBackdrop} from "$lib/helper";
    import HeroInner from "./HeroInner.svelte";
    import BackgroundSection from "./BackgroundSection.svelte";

    export let item: Item
    export let tip: string = null
</script>

<BackgroundSection url={getLargeBackdrop(item)}>
    <HeroInner {item} {tip} />
</BackgroundSection>