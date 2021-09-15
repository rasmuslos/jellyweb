<script lang="ts">
    import type {Item} from "$lib/typings/navigation";
    import {page} from "$app/stores"

    export let item: Item
    const { title, href, regex } = item
</script>

<style>
    a {
        margin: 0 15px;

        text-decoration: none;
        font-weight: 600;
    }
    .active, a:hover {
        color: var(--highlight);
    }
</style>

<a href={href} class:active={new RegExp(regex).test($page.path)}>
    <span>{title}</span>
</a>