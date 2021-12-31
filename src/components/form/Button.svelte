<script lang="ts">
    export let action: string = null
    export let disabled: boolean = false
    export let working: boolean = false
</script>

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
</style>

<button class:working on:click {action} {disabled}>
    <slot />
</button>