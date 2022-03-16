<script lang="ts">
    export let big: boolean = false
    export let smaller: boolean = false
</script>

<div class:big class:smaller></div>

<style>
    div {
        padding-bottom: 75px;
    }
    div.big {
        padding-bottom: 150px;
    }
    div.smaller {
        padding-bottom: 50px;
    }

    :global(#root.mobile) div {
        padding-bottom: 25px;
    }
    :global(#root.mobile) div.big {
        padding-bottom: 50px;
    }
</style>