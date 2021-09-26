<script lang="ts">
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import OptionGroup from "../helper/OptionGroup.svelte";
    import type {Option} from "$lib/typings";
    import GenericButton from "../input/GenericButton.svelte";
    import {blurBackdropImages, deletePreferences, showHeroImages, updatePreference} from "$lib/helper";

    const imageOptions: Option[] = [
        {
            title: "Show hero images",
            description: "Show big images on the home screen and detail view",
            checked: showHeroImages(),
            identifier: "images.hero",
        },
        {
            title: "Blur hero images",
            description: "Make text more readable but reduce vibrant colors",
            checked: blurBackdropImages(),
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
</style>

<ApplyWidth>
    <h1>Settings</h1>
    {#key imageOptions}
        <OptionGroup options={imageOptions} title="Images" on:change={({detail}) => updatePreference(detail.identifier, detail.checked)} />
    {/key}
    <GenericButton on:click={deletePreferences} label="Reset" />
</ApplyWidth>