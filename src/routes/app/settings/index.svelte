<script lang="ts">
    import {theme} from "$lib/stores";
    import {Theme} from "$lib/typings";
</script>

<svelte:head>
    <title>Settings</title>
</svelte:head>

<span on:click={() => theme.set(Theme.LIGHT)}>light</span>
<span on:click={() => theme.set(Theme.DARK)}>dark</span>
<span on:click={() => theme.set(Theme.UGLY)}>ugly</span>