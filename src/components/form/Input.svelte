<script lang="ts">
    import {_} from "svelte-i18n";

    export let label: string = null
    export let placeholder: string = null
    export let disabled: boolean = false
    export let required: boolean = false
    export let autofocus: boolean = false

    export let type: string = "text"
    export let value: string = ""

    export let large: boolean = false

    const handleInput = (event: any) => value = type.match(/^(number|range)$/) ? + event.target.value : event.target.value
</script>

<style lang="less">
    label {
        display: grid;
        margin: 15px auto;
        width: fit-content;

        grid-template-columns: 1fr;
        grid-template-rows: auto auto;

        &.large {
            width: 100%;
        }
        &.large input {
            width: 100%;
        }
    }
    span {
        color: var(--grey);
        margin-bottom: 4px;
    }

    input {
        padding: 10px 20px;

        height: 50px;
        width: calc(400px - 40px);
        max-width: 100%;

        color: var(--text);
        font-family: var(--font);
        transition: box-shadow 250ms ease;
        background-color: var(--background-secondary);

        border: none;
        border-radius: 10px;

        &:focus {
            box-shadow: 0 3px 15px #00000020;
        }
    }
</style>

<label class:large>
    {#if label}
        <span>{$_(label)}</span>
    {/if}
    <!-- svelte-ignore a11y-autofocus -->
    <input {placeholder} {value} {type} {disabled} {required} {autofocus} on:input={handleInput} on:keyup on:focus on:blur />
</label>