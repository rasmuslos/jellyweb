<script lang="ts">
    export let action: string = null
    export let disabled: boolean = false
    export let working: boolean = false

    export let large: boolean = false
    export let highlight: boolean = false
</script>

<button class:working class:large class:highlight on:click {action} {disabled}>
    <slot />
</button>

<style>
    @keyframes working {
        0%, 100% {
            color: var(--primary);
        }
        50% {
            color: var(--secondary);
        }
    }

    button {
        display: block;
        margin: 10px auto;
        padding: 10px 20px;

        width: fit-content;
        max-width: 100%;

        color: var(--text);
        background-color: var(--background-secondary);

        border: none;
        border-radius: 10px;
    }
    button.working {
        animation: 2s ease-in-out working infinite;
    }
    button.large {
        width: 100%;
    }
    button.highlight {
        background-color: var(--primary);
    }
</style>