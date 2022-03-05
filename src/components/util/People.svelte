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
        {#each people as { id, name, role, image }}
            <a class="holder" href={getItemPath(id)} sveltekit:prefetch>
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

<style lang="less">
    a.holder {
        flex: calc(min(calc(33vw - 20px), 193.66px) * 0.666 - 6.66px) 0 0;

        display: grid;
        grid-template-rows: calc(min(calc(33vw - 20px), 193.66px) * 0.666 - 6.66px) auto;
        grid-template-columns: 1fr;

        background-color: transparent;
        color: transparent;

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
    }

    :global(#root.mobile) {
        a.holder {
            flex: calc(min(calc(33vw - 20px), 193.66px) * 0.8 - 8px) 0 0;
            grid-template-rows:  calc(min(calc(33vw - 20px), 193.66px) * 0.8 - 8px) auto;
        }
    }
</style>