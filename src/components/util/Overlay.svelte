<script lang="ts">
    import { activeModal } from "$lib/stores";
    import {blur} from "svelte/transition"
</script>

{#if $activeModal}
    <div transition:blur>
        <svelte:component this={$activeModal} />
    </div>
{/if}

<style>
    div {
        position: absolute;
        top: 0;
        left: 0;

        z-index: 100;
        height: 100vh;
        width: 100vw;

        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10x);
    }
</style>