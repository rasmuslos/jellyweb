<script lang="ts">
    import ApplyWidth from "../helper/ApplyWidth.svelte";
    import OptionGroup from "../helper/OptionGroup.svelte";
    import type {Option} from "$lib/typings";
    import {settings} from "$lib/stores";
    import {updateDisplayPreferences} from "$lib/api/internal";

    const imageOptions: Option[] = [
        {
            title: "Show hero images",
            description: "Show big images on the home screen and detail view",
            checked: $settings["images.hero"],
            identifier: "images.hero",
        },
        {
            title: "Blur hero images",
            description: "Make text more readable but reduce vibrant colors",
            checked: $settings["images.blur"],
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
</script>

<style>
    .holder {

    }
</style>

<ApplyWidth>
    <div class="holder">
        <OptionGroup options={imageOptions} title="Images" on:change={({detail}) => updatePreference(detail.identifier, detail.checked)} />
    </div>
</ApplyWidth>