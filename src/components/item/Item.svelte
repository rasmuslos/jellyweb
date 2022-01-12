<script lang="ts">
    import type {Item} from "$lib/typings";
    import Image from "./Image.svelte";
    import {wrap, applyMaxWidth} from "$lib/helper";
    import {getItemPath} from "$lib/helper";

    export let item: Item
</script>

<a class="wrapper" href={getItemPath(item.id)}>
    <Image url={wrap(applyMaxWidth(item.images?.primary?.url, 400))} alt={item.name} />
    <span>{item.name}</span>
</a>

<style>
    a.wrapper {
        flex: min(calc(33vw - 20px - 4vw), 200px) 0 0;
        width: min(calc(33vw - 20px - 4vw), 200px);
        height: fit-content;

        display: grid;
        grid-template-rows: min(calc(calc(33vw - 20px - 4vw) * 1.5), 300px) auto;
        grid-template-columns: 1fr;
    }
    a.wrapper:not(:last-child) {
        margin-right: 20px;
    }

    span {
        position: relative;
        display: block;

        text-align: center;

        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
        white-space: nowrap;

        padding: 5px;
    }
</style>