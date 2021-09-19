<script lang="ts">
    import type {Item} from "$lib/typings";
    import {getLargeBackdrop} from "$lib/helper";
    import HeroInner from "../helper/HeroInner.svelte";
    import VerticalListInner from "../helper/VerticalListInner.svelte";
    import ApplyWidth from "../helper/ApplyWidth.svelte";
    import BackgroundSection from "../helper/BackgroundSection.svelte";

    export let items: Item[]
    export let active: Item = items[0]
</script>

<style>
    div {
        margin-top: 250px;
    }
</style>

<BackgroundSection url={getLargeBackdrop(active)}>
    <HeroInner item={active} tip={active.UserData && active.UserData.PlaybackPositionTicks === 0 ? "Watch now" : "Continue watching"} />
    <div>
        <ApplyWidth>
            <h1>Next up</h1>
            <VerticalListInner {items} on:mouseover={({ detail }) => active = items.find(({ Id }) => Id === detail)} />
        </ApplyWidth>
    </div>
</BackgroundSection>