<script lang="ts">
    import {icons} from "feather-icons";
    import {_} from "svelte-i18n";

    export let icon: string
    export let href: string = null
    export let title: string
    export let active: boolean = false
</script>

<a {href} sveltekit:prefetch on:click class:active>
    {@html icons[icon].toSvg()}
    <span>{$_(`navigation.${title}`)}</span>
</a>

<style lang="less">
    a {
        flex: 25% 0 1;

        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;

        align-items: center;
        justify-content: center;
        text-align: center;

        margin: auto auto;

        & :global(svg) {
            margin: 0 auto;
        }

        span {
            margin-top: 4px;
            font-size: 10px;
        }

        &:focus, &:hover, &.active {
            color: var(--primary);
        }
    }
</style>