<script lang="ts">
    import {generateImageUrl, showHero} from "$lib/helper";
    import VerticalListInner from "../helper/sections/VerticalListInner.svelte";
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import BackgroundSection from "../helper/sections/BackgroundSection.svelte";
    import {t} from "$lib/i18n";
    import AlternateHero from "../helper/sections/AlternateHero.svelte";
    import {icons} from "feather-icons";
    import type {Item} from "$lib/typings/internal";

    export let items: Item[]
    export let active: Item = items[0]

    const updateActive = (increment: boolean) => {
        const current = items.findIndex(({ id }) => active.id === id)

        if(current === -1) active = items[0]
        else if(increment) {
            if(current === items.length - 1) active = items[0]
            else active = items[current + 1]
        } else {
            if(current === 0) active = items[items.length - 1]
            else active = items[current - 1]
        }
    }
</script>

<style>
    section {
        padding-top: 25px;
        background-color: var(--background-light);
    }

    div.hero {
        display: block;
    }

    div.controls {
        position: absolute;
        bottom: 30px;
        right: 50px;

        display: flex;
        align-items: center;
        height: 43px;
    }
    div.controls :global(svg) {
        width: 24px;
        height: 24px;

        cursor: pointer;
        margin: 6px;
    }

    span {
        height: 36px;
        width: 36px;
    }

    svg {
        position: relative;
        bottom: -5px;
    }
    polygon {
        fill: var(--background);
    }

    @media screen and (max-width: 1000px) {
        div.hero.hide {
            display: none;
        }
        div.hero.hide + section {
            padding-top: 50px;
        }
    }
</style>

<div class="hero" class:hide={!$showHero}>
    <BackgroundSection fade url={generateImageUrl(active.images.wide.parent ? active.showData.showId : active.id, active.images.wide.tag, "Backdrop")}>
        <AlternateHero item={active} />
        <div class="controls">
            <span on:click={() => updateActive(false)}>{@html icons["arrow-left-circle"].toSvg()}</span>
            <span on:click={() => updateActive(true)}>{@html icons["arrow-right-circle"].toSvg()}</span>
        </div>
    </BackgroundSection>
</div>
<section>
    <ApplyWidth>
        <h1>{$t("hero.nextup")}</h1>
        <VerticalListInner {items} on:mouseover={({ detail }) => active = items.find(({ id }) => id === detail)} />
    </ApplyWidth>
    <svg viewBox="0 0 100 7" preserveAspectRatio="none">
        <polygon points="0,0 100,7 0,7" />
    </svg>
</section>