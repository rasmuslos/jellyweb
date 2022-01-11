<script lang="ts">
    export let big: boolean = false
</script>

<div class:big></div>

<style>
    div {
        margin-bottom: 75px;
    }
    div.big {
        margin-top: 150px;
    }

    :global(#root.mobile) div {
        margin-bottom: 25px;
    }
    :global(#root.mobile) div.big {
        margin-bottom: 50px;
    }
</style>