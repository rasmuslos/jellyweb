<script>
    import {onDestroy, onMount} from 'svelte';
    import {fade} from 'svelte/transition';
    import {page} from "$app/stores";

    let animations = false
    let show = false

    const unsubscribe = page.subscribe(() => {
        show = true
        setTimeout(() => show = false, 100)
    })

    onMount(() => animations = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches !== true)
    onDestroy(unsubscribe)
</script>

<style>
    div, aside {
        position: fixed;
        left: 0;

        width: 100vw;
    }

    aside {
        top: 0;
        height: 85px;
        background-color: var(--background);
    }
    div {
        bottom: 0;
        height: calc(100vh - 85px);
        background-color: var(--background-secondary);
    }
</style>

{#if !!animations && show}
    <aside transition:fade={{duration: 100}}></aside>
    <div transition:fade={{duration: 100}}></div>
{/if}