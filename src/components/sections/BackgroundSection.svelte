<script lang="ts">
    export let url: string
</script>

<style>
    section {
        min-height: 100vh;
        overflow: hidden;

        background-color: var(--background-light);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
</style>

<section style="background-image: url('{url}')">
    <slot />
</section>