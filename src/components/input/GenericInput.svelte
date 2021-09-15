<script lang="ts">
    export let type: string
    export let placeholder: string
    export let value: string

    const handleInput = event => {
        // in here, you can switch on type and implement
        // whatever behaviour you need
        value = type.match(/^(number|range)$/)
            ? + event.target.value
            : event.target.value;
    };
</script>

<style>
    input {
        color: var(--text);
        font-size: calc(var(--size));

        width: 100%;
        padding: 10px 13px;
        margin: 5px 0;
        background-color: var(--background-secondary);

        border: none;
        border-radius: 10px;
    }
    input:focus {
        outline: none;
    }
</style>

<input {type} {placeholder} {value} on:input={handleInput} />