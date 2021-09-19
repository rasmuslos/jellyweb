<script lang="ts">
    import ApplyWidth from "../helper/ApplyWidth.svelte";
    import OptionGroup from "../helper/OptionGroup.svelte";
    import type {Option} from "$lib/typings";

    const imageOptions: Option[] = [
        {
            title: "Show hero images",
            description: "Show big images on the home screen and detail view",
            checked: true,
            identifier: "images.hero",
        },
        {
            title: "Blur hero images",
            description: "Make text more readable but reduce vibrant colors",
            checked: true,
            identifier: "images.blur",
        },
    ]
</script>

<style>
    .holder {

    }
</style>

<ApplyWidth>
    <div class="holder">
        <OptionGroup options={imageOptions} />
    </div>
</ApplyWidth>