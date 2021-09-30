<script lang="ts">
    import {settings} from "$lib/stores";

    export let url: string
    export let transparent: boolean = false
</script>

<style>
    section {
        position: relative;
        overflow: hidden;

        background-color: transparent;
        color: var(--white);

        height: 100%;
        width: 100%;
    }
    section:not(.transparent) {
        background-color: var(--background-light);
    }

    div.image {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        z-index: 0;
    }
    section:not(.transparent) div.image.blur::before {
        position: absolute;
        top: 0;
        left: 0;

        display: block;
        width: 100%;
        height: 100%;

        content: "";
        background: rgba(0, 0, 0, 0.4);
    }
    div.holder {
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>

<section class:transparent>
    {#key $settings["images.hero"], $settings["images.blur"]}
        {#if $settings["images.hero"] !== "false"}
            <div class="image" class:blur={$settings["images.blur"] !== "false"} style="background-image: url('{url}')"></div>
        {/if}
    {/key}
    <div class="holder">
        <slot />
    </div>
</section>