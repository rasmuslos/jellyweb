<script lang="ts">
    import {session} from "$app/stores";
    import {onDestroy} from "svelte";
    import {bitrateTest} from "$lib/helper";

    const interval = setInterval(() => bitrateTest($session.active), 1000 * 60 * 5)

    onDestroy(() => clearInterval(interval))
</script>

<style>
    div {
        position: relative;

        height: 100%;
        width: 100%;

        color: var(--text);
        font-size: var(--size);
        font-family: var(--font);

        background-color: var(--background);
        overflow: hidden;
    }
</style>

<div>
    <slot />
</div>