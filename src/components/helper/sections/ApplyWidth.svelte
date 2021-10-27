<script lang="ts">
    export let bigger: boolean
</script>

<style>
    div {
        width: 100%;
        max-width: 1600px;

        padding: 25px 25px 25px 25px;
        margin: 0 auto;
    }
    div.bigger {
        max-width: 1650px;
    }
</style>

<div class:bigger>
    <slot />
</div>