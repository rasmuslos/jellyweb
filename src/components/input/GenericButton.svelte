<script lang="ts">
    export let label: string
    export let disabled: boolean = false
</script>

<style>
    button {
        display: block;

        color: var(--text);
        font-size: calc(var(--size));

        padding: 10px 13px;
        margin: 5px auto;
        background-color: var(--background-secondary);

        border: none;
        border-radius: 10px;
    }
    button:focus {
        outline: none;
    }
    button[disabled] {
        cursor: not-allowed;
        color: var(--background-light);
    }
</style>

<button {disabled} on:click>
    {label}
</button>