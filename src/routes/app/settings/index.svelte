<script lang="ts">
import { setLanguage, setTheme } from "$lib/helper";
    import {theme} from "$lib/stores";
    import {Theme} from "$lib/typings";
    import { locale } from "svelte-i18n";
</script>

<svelte:head>
    <title>Settings</title>
</svelte:head>

<span on:click={() => setTheme(Theme.LIGHT)}>light</span>
<span on:click={() => setTheme(Theme.DARK)}>dark</span>
<span on:click={() => setTheme(Theme.UGLY)}>ugly</span>

<br />

<span on:click={() => setLanguage("en")}>EN</span>
<span on:click={() => setLanguage("de")}>DE</span>