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

<svelte:head>
    <meta name="theme-color" content="#2E3440">
</svelte:head>
<div>
    <slot />
</div>