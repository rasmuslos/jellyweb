<script lang="ts">
    import "normalize.css"
    import type {Theme} from "$lib/helper";

    export let theme: Theme = "dark"
</script>

<style>
    :global(:root) {
        --font: "Glory", monospace;
        --size: 18px;

        --highlight: #8FBCBB;

        --black: #2E3440;
        --white: #D8DEE9;
        --red: #BF616A;
    }

    :global(*), :global(*::before), :global(*::after) {
        box-sizing: border-box;
    }
    :global(a), :global(a:visited) {
        color: inherit;
        text-decoration: none;
    }

    :global(*.dimmed) {
        color: var(--dimmed);
    }
    :global(*.highlight) {
        color: var(--highlight);
    }
    :global(*.error) {
        color: var(--red);
    }

    :global(figure.center) {
        display: block;
        width: fit-content;

        margin: 0 auto;
        padding: 0;
    }

    :global(body) {
        position: relative;
        background-color: var(--background);

        color: var(--text);
        font-size: var(--size);
        font-family: var(--font);

        margin: 0;
        padding: 0;

        height: 100vh;
        width: 100vw;

        overflow-x: hidden;
        overflow-y: auto;
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="/themes/font.css" />
    <link rel="stylesheet" href="/themes/keyframes.css" />
    <link rel="stylesheet" href="/themes/{theme}.css" />

    {#if theme === "light"}
        <meta name="theme-color" content="#D8DEE9">
    {:else}
        <meta name="theme-color" content="#2E3440">
    {/if}
</svelte:head>

<div>
    <slot />
</div>