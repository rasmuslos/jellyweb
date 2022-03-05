<script lang="ts">
    import {icons} from "feather-icons";
    import {_} from "svelte-i18n";

    export let icon: string
    export let href: string = null
    export let title: string
    export let active: boolean = false
    export let dimmed: boolean = false
    export let flipped: boolean = false
    export let noAnimation: boolean = false
</script>

<a {href} sveltekit:prefetch class:dimmed class:noAnimation class:active class:flipped on:click>
    {@html icons[icon].toSvg()}
    <span>
        {$_(`navigation.${title}`)}
    </span>
</a>

<style lang="less">
    a {
        --inset-small: 7px;
        --inset: var(--inset-small);

        display: grid;
        grid-template-columns: calc(var(--collapsed) - var(--inset-small) * 2) calc(var(--expanded) - var(--collapsed));
        align-items: center;

        margin: 1px var(--inset);
        padding: 10px 0;
        border-radius: 10px;

        cursor: pointer;
        width: calc(var(--collapsed) - var(--inset) * 2);

        &.dimmed {
            color: var(--grey);
        }
        &:hover:not(.noAnimation), &.active {
            background: var(--primary);
            color: var(--text);
        }

        :global(svg) {
            display: block;
            margin: auto;
        }

        &.flipped :global(svg) {
            transform: rotate(180deg);
        }

        span {
            margin-left: 7px;
        }
    }

    :global(nav.expanded) {
        a {
            --inset: 14px;

            padding: 10px 20px;
            width: calc(var(--expanded) - var(--inset) * 2);
        }
    }
</style>