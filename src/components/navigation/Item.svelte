<script lang="ts">
    import type {NavigationItem} from "$lib/typings";
    import {page} from "$app/stores"
    import {t} from "$lib/i18n"

    export let item: NavigationItem
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
    <span>{$t(title)}</span>
</a>