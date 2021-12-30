<script lang="ts">
    import {icons} from "feather-icons";
    import {_} from "svelte-i18n";

    export let icon: string
    export let href: string
    export let title: string
    export let active: boolean = false
    export let dimmed: boolean = false
    export let flipped: boolean = false
    export let noAnimation: boolean = false
</script>

<a {href} class:dimmed class:noAnimation class:active class:flipped on:click>
    {@html icons[icon].toSvg()}
    <span>
        {$_(`navigation.${title}`)}
    </span>
</a>

<style>
    a {
        --inset-small: 7px;
        --inset: var(--inset-small);

        display: grid;
        grid-template-columns: calc(var(--colapsed) - var(--inset-small) * 2) calc(var(--expanded) - var(--colapsed));
        align-items: center;

        margin: 1px var(--inset);
        padding: 10px 0;
        border-radius: 10px;

        cursor: pointer;
        width: calc(var(--colapsed) - var(--inset) * 2);
    }
    a.dimmed {
        color: var(--grey);
    }
    a:hover:not(.noAnimation), a.active {
        background: var(--secondary);
        color: var(--text);
    }

    a :global(svg) {
        display: block;
        margin: auto;
    }
    a.flipped :global(svg) {
        transform: rotate(180deg);
    }

    span {
        margin-left: 7px;
    }

    :global(nav.expanded) a {
        --inset: 14px;

        padding: 10px 20px;
        width: calc(var(--expanded) - var(--inset) * 2);
    }
</style>