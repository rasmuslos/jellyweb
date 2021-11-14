<script lang="ts">
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import OptionGroup from "../helper/OptionGroup.svelte";
    import type {Option} from "$lib/typings/jellyfin";
    import GenericButton from "../input/GenericButton.svelte";
    import {
        scrimBackdropImages,
        deletePreferences,
        showHeroImages,
        updatePreference,
        blurHeroImages, large
    } from "$lib/helper";
    import Wave from "./Wave.svelte";
    import {t} from "$lib/i18n";
    import LargeHeading from "../helper/LargeHeading.svelte";
    import {goto} from "$app/navigation";

    const imageOptions: Option[] = [
        {
            title: "settings_show_hero",
            description: "settings_show_hero_desc",
            checked: $showHeroImages,
            identifier: "images.hero",
        },
        {
            title: "settings_scrim_hero",
            description: "settings_scrim_hero_desc",
            checked: $scrimBackdropImages,
            identifier: "images.scrim",
        },
        {
            title: "settings_blur_hero",
            description: "settings_blur_hero_desc",
            checked: $blurHeroImages,
            identifier: "images.blur",
        },
    ]
    const otherOptions: Option[] = [
        {
            title: "settings.large",
            description: "settings.large.desc",
            checked: $large,
            identifier: "large",
        },
    ]
</script>

<style>
    h1 {
        font-size: 50px;
        font-weight: 600;
        text-align: center;
    }
    h2 {
        font-size: 40px;
        font-weight: 600;

        text-align: center;
        color: var(--error);
    }
    p {
        text-align: center;
        margin-bottom: 40px;
    }

    section {
        background-color: var(--background-light);
    }

    p.about {
        text-align: center;
        background-color: var(--background);

        margin: 0;
        padding: 50px 0;
    }
</style>

<ApplyWidth>
    <LargeHeading>{$t("settings")}</LargeHeading>
    {#key imageOptions}
        <OptionGroup options={imageOptions} title="{$t(`Images`)}" on:change={({detail}) => updatePreference(detail.identifier, detail.checked)} />
    {/key}
    <OptionGroup options={otherOptions} title="{$t(`settings.other`)}" on:change={({detail}) => updatePreference(detail.identifier, detail.checked)} />
</ApplyWidth>
<section>
    <Wave />
    <ApplyWidth>
        <h2>{$t("settings_danger_zone")}</h2>
        <p>
            {$t("settings_danger_zone_desc")}
        </p>
        <figure class="center">
            <GenericButton on:click={deletePreferences} label="{$t(`settings_reset_all`)}" />
            <GenericButton on:click={() => goto("user/logout")} label="{$t(`logout`)}" />
        </figure>
    </ApplyWidth>
    <Wave rotated />
    <p class="about dimmed">
        <span class="highlight">Jellyweb</span> {import.meta.env.MODE} ({import.meta.env.PROD})
    </p>
</section>