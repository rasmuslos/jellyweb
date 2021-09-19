<script lang="ts">
    import type {Option} from "$lib/typings";
    import {createEventDispatcher} from "svelte";
    import Switch from "../navigation/Switch.svelte";

    const dispatcher = createEventDispatcher()
    export let options: Option[]
</script>

<style>
    div.holder {
        display: flex;
        flex-direction: column;

        max-width: 600px;
        margin: 0 auto;
    }
    div.option {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
    }

    h2 {
        margin: 0;
    }
    p {
        color: var(--dimmed);
        margin: 0 0 20px 0;
    }
</style>

<div class="holder">
    <h1>Images</h1>
    {#each options as { identifier, title, description, checked }}
        <div class="option">
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <Switch />
        </div>
    {/each}
</div>