<script lang="ts">
    import {theme} from "$lib/stores";
    import {Theme} from "$lib/typings";
    import { locale } from "svelte-i18n";
</script>

<svelte:head>
    <title>Settings</title>
</svelte:head>

<span on:click={() => theme.set(Theme.LIGHT)}>light</span>
<span on:click={() => theme.set(Theme.DARK)}>dark</span>
<span on:click={() => theme.set(Theme.UGLY)}>ugly</span>

<br />

<span on:click={() => locale.set("en")}>EN</span>
<span on:click={() => locale.set("de")}>DE</span>