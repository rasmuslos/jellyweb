<script lang="ts">
    import {goto} from "$app/navigation";

    export let itemId: string
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

<button on:click={() => goto(`/player/${itemId}`)}>
    Watch now
</button>