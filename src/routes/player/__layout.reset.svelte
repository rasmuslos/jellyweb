<script lang="ts">
    import {onMount} from "svelte";
    import {modal} from "$lib/stores";

    let Modal

    onMount(async () => {
        const svelteSimpleModal = await import('svelte-simple-modal')
        Modal = svelteSimpleModal.default
    })
</script>

<style>
    div {
        position: relative;
        background-color: var(--background);

        height: 100%;
        width: 100%;

        color: var(--text);
        font-size: var(--size);
        font-family: var(--font);

        overflow-x: hidden;
        overflow-y: auto;
    }
</style>

<div>
    <svelte:component
            this={Modal}
            show={$modal}
            closeButton={false}

            styleContent={{ padding: 0 }}
            styleWindow={{ "background-color": "transparent", "margin-top": "200px" }}
            styleBg={{ "display": "block" }}

            on:close={() => modal.set(null)} />

    <slot />
</div>