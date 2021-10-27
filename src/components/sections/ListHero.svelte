<script lang="ts">
    import type {Item} from "$lib/typings";
    import {getLargeBackdrop} from "$lib/helper";
    import VerticalListInner from "../helper/sections/VerticalListInner.svelte";
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import BackgroundSection from "../helper/sections/BackgroundSection.svelte";
    import {t} from "$lib/i18n";
    import AlternateHero from "../helper/sections/AlternateHero.svelte";

    export let items: Item[]
    export let active: Item = items[0]
</script>

<style>
    div.list {
        margin-top: 75px;
        padding: -50px;
    }
</style>

<BackgroundSection url={getLargeBackdrop(active)}>
    <AlternateHero item={active} />
    <div class="list">
        <ApplyWidth>
            <h1>{$t("hero.nextup")}</h1>
            <VerticalListInner {items} big on:mouseover={({ detail }) => active = items.find(({ Id }) => Id === detail)} />
        </ApplyWidth>
    </div>
</BackgroundSection>