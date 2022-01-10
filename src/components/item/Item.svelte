<script lang="ts">
    import type {Item} from "$lib/typings";
    import Image from "./Image.svelte";
    import {wrap, applyMaxWidth} from "$lib/helper";

    export let item: Item
</script>

<a class="wrapper">
    <Image url={wrap(applyMaxWidth(item.images?.primary?.url, 400))} />
    <span>{item.name}</span>
</a>

<style>
    a.wrapper {
        width: min(33vw, 200px);
        height: fit-content;

        display: grid;
        grid-template-rows: min(calc(33vw * 1.5), 300px) auto;
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