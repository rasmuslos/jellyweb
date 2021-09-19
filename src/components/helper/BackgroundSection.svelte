<script lang="ts">
    import {settings} from "$lib/stores";

    export let url: string
</script>

<style>
    section {
        position: relative;
        overflow: hidden;
    }
    div.image {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background-color: var(--background-light);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        z-index: 0;
    }
    div.image.blur::before {
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
    }
</style>

<section>
    {#key $settings["images.hero"], $settings["images.blur"]}
        {#if $settings["images.hero"] !== "false"}
            <div class="image" class:blur={$settings["images.blur"] !== "false"} style="background-image: url('{url}')"></div>
        {/if}
    {/key}
    <div class="holder">
        <slot />
    </div>
</section>