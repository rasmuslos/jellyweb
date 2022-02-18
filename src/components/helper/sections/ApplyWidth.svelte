<script lang="ts">
import {preferences} from "$lib/stores";
</script>

<style>
    div {
        width: 100%;
        max-width: 1600px;

        padding: 0 25px;
        margin: 0 auto;
    }
    div.large {
        max-width: unset;
        padding: 25px 50px 25px 50px;
    }
</style>

<div class:large={$preferences.large}>
    <slot />
</div>