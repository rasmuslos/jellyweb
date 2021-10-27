<script lang="ts">
    import type {Item} from "$lib/typings";
    import {getLargeBackdrop} from "$lib/helper";
    import HeroInner from "../helper/sections/HeroInner.svelte";
    import VerticalListInner from "../helper/sections/VerticalListInner.svelte";
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import BackgroundSection from "../helper/sections/BackgroundSection.svelte";
    import {t} from "$lib/i18n";

    export let items: Item[]
    export let active: Item = items[0]
</script>

<style>
    div.hero {
        animation: show 250ms;
    }

    div.list {
        margin-top: 250px;
    }
</style>

<BackgroundSection url={getLargeBackdrop(active)}>
    {#key active}
        <div class="hero">
            <HeroInner item={active}
                       tip={active.UserData && active.UserData.PlaybackPositionTicks === 0 ? $t("hero.watch_now") : $t("hero.continue_watching")}/>
        </div>
    {/key}
    <div class="list">
        <ApplyWidth>
            <h1>{$t("hero.nextup")}</h1>
            <VerticalListInner {items} on:mouseover={({ detail }) => active = items.find(({ Id }) => Id === detail)} />
        </ApplyWidth>
    </div>
</BackgroundSection>