<script lang="ts">
    import ApplyWidth from "../helper/ApplyWidth.svelte";
    import OptionGroup from "../helper/OptionGroup.svelte";
    import type {Option} from "$lib/typings";
    import {settings} from "$lib/stores";
    import {deleteDisplayPreferences, updateDisplayPreferences} from "$lib/api/internal";
    import GenericButton from "../input/GenericButton.svelte";

    /* This is a promising candidate for the worst hour ever spend */
    const heroEnabled = $settings["images.hero"] != "false"
    const blurEnabled = $settings["images.blur"] != "false"
    const imageOptions: Option[] = [
        {
            title: "Show hero images",
            description: "Show big images on the home screen and detail view",
            checked: heroEnabled,
            identifier: "images.hero",
        },
        {
            title: "Blur hero images",
            description: "Make text more readable but reduce vibrant colors",
            checked: blurEnabled,
            identifier: "images.blur",
        },
    ]

    const updatePreference = async (identifier: string, value: any) => {
        settings.update(preferences => {
            preferences[identifier] = value
            updateDisplayPreferences(preferences)

            return preferences
        })
    }
    const deletePreferences = async () => {
        await deleteDisplayPreferences()
        settings.set({})
    }
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