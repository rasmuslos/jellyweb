<script lang="ts">
    import {large} from "$lib/helper";
</script>

<style>
    div {
        width: 100%;
        max-width: 1600px;

        padding: 25px 25px 25px 25px;
        margin: 0 auto;
    }
    div.large {
        max-width: unset;
        padding: 25px 50px 25px 50px;
    }
</style>

<div class:large={$large}>
    <slot />
</div>