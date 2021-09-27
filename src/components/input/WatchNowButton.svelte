<script lang="ts">
    import {goto} from "$app/navigation";
    import {generatePlayerUrl} from "$lib/helper";

    export let itemId: string
    export let position: number = 0
</script>

<style>
    button {
        border-radius: 5px;
        padding: 10px 20px;

        color: black;
        font-family: var(--font);
        font-size: 20px;

        background-color: var(--highlight);
        border: none;

        cursor: pointer;
    }
    button:focus {
        outline: none;
    }
</style>

<button on:click={() => goto(generatePlayerUrl(itemId, position))}>
    Watch now
</button>