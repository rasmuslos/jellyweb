<script lang="ts">
import { DEVELOPMENT, setLanguage, setTheme, VERSION } from "$lib/helper";
    import {Theme} from "$lib/typings";
    import ApplyMeasurements from "../../../components/ApplyMeasurements.svelte";
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

<ApplyMeasurements>
    <p>
        Jellyweb {VERSION} ({DEVELOPMENT ? "dev" : "stable"})
    </p>
</ApplyMeasurements>

<style>
    p {
        color: var(--grey);
        text-align: center;
    }
</style>