<script lang="ts">
    export let large: boolean = false
    export let larger: boolean = false
    export let smaller: boolean = false
    export let full: boolean = false
</script>

<div class:large class:larger class:smaller class:full>
    <slot />
</div>

<style lang="less">
    div {
        &:not(.large) {
            display: block;
            margin: 0 auto;

            width: 95%;
            max-width: 1740px;
        }

        &.smaller {
            max-width: 1500px;
        }
        &.larger {
            max-width: 2000px;
        }
        &.full {
            width: 100%;
        }
    }

    :global(#root:not(.mobile).showNavigation) {
        div {
            padding: 0 ~"calc(env(safe-area-inset-right, 20px) + 25px)" 0 ~"calc(env(safe-area-inset-left, 20px) + 85px)";
        }
    }
    :global(#root:not(.mobile).showNavigation.navigationExpanded) {
        div {
            padding-left: calc(env(safe-area-inset-left, 20px) + 25px);
        }
    }
</style>