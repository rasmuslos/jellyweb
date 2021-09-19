<script lang="ts">
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
    div.image::before {
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
    <div class="image" style="background-image: url('{url}')"></div>
    <div class="holder">
        <slot />
    </div>
</section>