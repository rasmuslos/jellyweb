<script lang="ts">
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import OptionGroup from "../helper/OptionGroup.svelte";
    import type {Option} from "$lib/typings";
    import GenericButton from "../input/GenericButton.svelte";
    import {blurBackdropImages, deletePreferences, showHeroImages, updatePreference} from "$lib/helper";
    import Wave from "./Wave.svelte";

    const imageOptions: Option[] = [
        {
            title: "Show hero images",
            description: "Show big images on the home screen and detail view",
            checked: $showHeroImages,
            identifier: "images.hero",
        },
        {
            title: "Blur hero images",
            description: "Make text more readable but reduce vibrant colors",
            checked: $blurBackdropImages,
            identifier: "images.blur",
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
    <h1>Settings</h1>
    {#key imageOptions}
        <OptionGroup options={imageOptions} title="Images" on:change={({detail}) => updatePreference(detail.identifier, detail.checked)} />
    {/key}
</ApplyWidth>
<section>
    <Wave />
    <ApplyWidth>
        <h2>DANGER ZONE</h2>
        <p>
            Warning: deleting your preferences will reset you theme, bitrate & additional settings
        </p>
        <figure class="center">
            <GenericButton on:click={deletePreferences} label="Reset all Settings" />
            <GenericButton on:click={() => window.location.href = "user/logout"} label="Logout" />
        </figure>
    </ApplyWidth>
    <Wave rotated />
</section>