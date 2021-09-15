<script lang="ts">
    const handleGlobalKeydown = (event: KeyboardEvent) => {
        if(event.key.toLowerCase() === "k" && event.metaKey || event.ctrlKey || event.altKey) {
            alert("OPEN MODAL")
        }
    }
</script>
<svelte:window on:keydown={handleGlobalKeydown} />

<style>
    div {
        cursor: pointer;
        color: var(--secondary);

        padding: 7px;
        border-radius: 5px;
    }
    div:hover {
        background-color: var(--background-light);
    }

    .key {
        background-color: var(--background-secondary);

        font-size: smaller;
        padding: 5px;
        border-radius: 10px;
    }
</style>

<div>
    <span>Search</span>
    <span class="key">&#8984;K</span>
</div>