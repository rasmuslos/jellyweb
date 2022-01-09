<script lang="ts">
    export let large: boolean = false
</script>

<div class:large>
    <slot />
</div>

<style>
    :global(#root:not(.mobile).showNavigation) div {
        padding: 0 calc(env(safe-area-inset-right, 20px) + 25px) 0 calc(env(safe-area-inset-left, 20px) + 25px);
    }
    div:not(.large) {
        display: block;
        margin: 0 auto;

        width: 95%;
        max-width: 1500px;
    }
</style>