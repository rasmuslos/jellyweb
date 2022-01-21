<script lang="ts">
    import Button from "../../../components/form/Button.svelte";
    import {theme} from "$lib/stores";
    import {Theme} from "$lib/typings";
</script>

<Button on:click={() => theme.set(Theme.UGLY)}>PAIN</Button>