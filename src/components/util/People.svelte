<script lang="ts">
    import type {Person} from "$lib/typings";
    import ApplyMeasurements from "../ApplyMeasurements.svelte";
    import Image from "../item/Image.svelte";
    import {wrap} from "$lib/helper";
    import {applyMaxWidth} from "$lib/helper";
    import {_} from "svelte-i18n";
    import {getItemPath} from "$lib/helper";

    export let people: Person[]
    console.log(people)
</script>

<ApplyMeasurements>
    <h2>{$_("items.sections.people")}</h2>
    <div class="wrapper">
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
    </div>
</ApplyMeasurements>

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
    }
    .holder {
        display: grid;
        grid-template-rows: min(25vw, 125px) auto;
        grid-template-columns: 1fr;
        flex: min(25vw, 125px) 0 0;

        margin: 0 10px;

        background-color: transparent;
        color: transparent;
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