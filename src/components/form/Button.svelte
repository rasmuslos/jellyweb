<script lang="ts">
    export let action: string = null
    export let disabled: boolean = false
    export let working: boolean = false

    export let large: boolean = false
    export let highlight: boolean = false
    export let alternate: boolean = false
</script>

<button class:working class:large class:highlight class:alternate on:click {action} {disabled}>
    <slot />
</button>

<style lang="less">
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

        height: 50px;
        width: fit-content;
        max-width: 100%;

        color: var(--text);
        background-color: var(--background-secondary);

        border: none;
        border-radius: 10px;

        flex-shrink: 0;

        &.working {
            animation: 2s ease-in-out working infinite;
        }
        &.large {
            width: 100%;
        }
        &.highlight {
            background-color: var(--primary);
        }
        &.alternate {
            background-color: var(--background);
        }
    }
</style>