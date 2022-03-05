<script lang="ts">
    import { closeModal } from "$lib/helper";
    import { activeModal } from "$lib/stores"
    import {blur} from "svelte/transition"

    const handleKeyDown = (event: KeyboardEvent) => {
        if(event.key === "Escape") {
            closeModal()
            event.preventDefault()
        }
    }
</script>
<svelte:window on:keydown={handleKeyDown} />

{#if $activeModal}
    <div transition:blur|local on:click|self={closeModal}>
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

        display: block;

        background-color: rgba(0, 0, 0, .85);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4x);
    }
</style>