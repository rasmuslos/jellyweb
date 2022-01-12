<script lang="ts">
    export let big: boolean = false
    export let smaller: boolean = false
</script>

<div class:big class:smaller></div>

<style>
    div {
        margin-bottom: 75px;
    }
    div.big {
        margin-bottom: 150px;
    }
    div.smaller {
        margin-bottom: 50px;
    }

    :global(#root.mobile) div {
        margin-bottom: 25px;
    }
    :global(#root.mobile) div.big {
        margin-bottom: 50px;
    }
</style>