<script lang="ts">
    import type {Item} from "$lib/typings";
    import {getLargeBackdrop} from "$lib/helper";
    import HeroInner from "./HeroInner.svelte";
    import VerticalListInner from "./VerticalListInner.svelte";
    import ApplyWidth from "./ApplyWidth.svelte";

    export let items: Item[]
    export let active: Item = items[0]
</script>

<style>
    section {
        overflow: hidden;

        background-color: var(--background-light);
        background-repeat: no-repeat;
        background-size: cover;
    }
    h1 {
        text-shadow: 1px 1px 2px black;
    }
</style>

<section style="background-image: url('{getLargeBackdrop(active)}')">
    <HeroInner item={active} tip={active.UserData && active.UserData.PlaybackPositionTicks === 0 ? "Watch now" : "Continue watching"} />
    <div>
        <ApplyWidth>
            <h1>Next up</h1>
            <VerticalListInner {items} on:mouseover={({ detail }) => active = items.find(({ Id }) => Id === detail)} />
        </ApplyWidth>
    </div>
</section>