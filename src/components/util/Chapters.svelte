<script lang="ts">
    import type {Chapter} from "$lib/typings";
    import ApplyMeasurements from "../ApplyMeasurements.svelte";
    import Image from "../item/Image.svelte";
    import {wrap} from "$lib/helper";
    import {applyMaxWidth} from "$lib/helper";
    import List from "./List.svelte";

    export let chapters: Chapter[]
</script>

<ApplyMeasurements>
    <List title="items.sections.chapters">
        {#each chapters as { name, image }, index}
            <!--TODO: GOTO Player-->
            <a class="holder" href="add_me">
                <Image alt="Chapter {index + 1}" url={wrap(applyMaxWidth(image.url, 300))} />
                <span>{name}</span>
            </a>
        {/each}
    </List>
</ApplyMeasurements>

<style lang="less">
    .holder {
        display: grid;
        grid-template-rows: min(25vw, 150px) auto;
        grid-template-columns: 1fr;
        flex: min(calc(25vw * 2), 300px) 0 0;

        background-color: transparent;
        color: transparent;

        span {
            margin-top: 10px;

            text-align: center;
            color: var(--grey);
        }
    }
</style>