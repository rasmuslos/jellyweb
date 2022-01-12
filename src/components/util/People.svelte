<script lang="ts">
    import type {Person} from "$lib/typings";
    import ApplyMeasurements from "../ApplyMeasurements.svelte";
    import Image from "../item/Image.svelte";
    import {wrap} from "$lib/helper";
    import {applyMaxWidth} from "$lib/helper";
    import {getItemPath} from "$lib/helper";
    import List from "./List.svelte";

    export let people: Person[]
</script>

<ApplyMeasurements>
    <List title="items.sections.people">
        {#each people as { id, name, role, image }, index}
            <a class="holder" href={getItemPath(id)}>
                <Image alt={name} url={wrap(applyMaxWidth(image.url, 300))} />
                <p>
                    <span>{name}</span>
                    <br />
                    {role}
                </p>
            </a>
        {/each}
    </List>
</ApplyMeasurements>

<style>
    .holder {
        display: grid;
        grid-template-rows: min(25vw, 125px) auto;
        grid-template-columns: 1fr;
        flex: min(25vw, 125px) 0 0;

        background-color: transparent;
        color: transparent;
    }
    .holder:not(:last-child) {
        margin-right: 20px;
    }

    p {
        display: inline-block;

        overflow: hidden;
        text-indent: hanging;

        padding-top: 10px;
        margin: 0;

        text-align: center;
        color: var(--grey);
    }
    span {
        display: inline-block;

        color: var(--text);
        margin-bottom: 3px;
    }
</style>