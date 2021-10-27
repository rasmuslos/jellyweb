<script lang="ts">
    import {locale, locales} from "$lib/i18n";
    import flags from "$lib/i18n/flags";
</script>

<style>
    select {
        background-color: transparent;
        cursor: pointer;

        height: 20px;
        width: 20px;

        margin: 7px;
        -webkit-appearance: none;
    }
</style>

<select bind:value={$locale}>
    {#each locales as l}
        <option value={l}>{flags[l] || "🗿"}</option>
    {/each}
</select>