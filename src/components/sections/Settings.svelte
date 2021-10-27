<script lang="ts">
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import OptionGroup from "../helper/OptionGroup.svelte";
    import type {Option} from "$lib/typings";
    import GenericButton from "../input/GenericButton.svelte";
    import {scrimBackdropImages, deletePreferences, showHeroImages, updatePreference} from "$lib/helper";
    import Wave from "./Wave.svelte";
    import {t} from "$lib/i18n";

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
</style>

<ApplyWidth>
    <h1>{$t("settings")}</h1>
    {#key imageOptions}
        <OptionGroup options={imageOptions} title="{$t(`Images`)}" on:change={({detail}) => updatePreference(detail.identifier, detail.checked)} />
    {/key}
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
            <GenericButton on:click={() => window.location.href = "user/logout"} label="{$t(`logout`)}" />
        </figure>
    </ApplyWidth>
    <Wave rotated />
</section>