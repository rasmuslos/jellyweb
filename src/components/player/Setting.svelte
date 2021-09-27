<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let title: string
    export let activeIndex: number
    export let arr: { index: number, value: any }[]

    const dispatcher = createEventDispatcher()
    const set = (value) => dispatcher("set", value)
</script>

<style>
    select {
        display: block;
        margin: 5px 0 10px 0;

        background-color: var(--background-light);
        border: none;

        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        cursor: pointer;
        padding: 3px;

        color: var(--secondary);
    }
    select[disabled] {
        color: var(--dimmed);
    }
</style>

<span>{title}</span>
<select disabled={arr.length < 2}  on:change={({ target }) => set(target.value)}>
    {#each arr as {index, value}}
        <option selected={activeIndex === index} value={index}>{value}</option>
    {/each}
</select>