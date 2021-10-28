<script lang="ts">
    import {locales} from "$lib/i18n";
    import flags from "$lib/i18n/flags";
    import {locale, updatePreference} from "$lib/helper";
</script>

<style>
    select {
        background-color: transparent;
        border: none;

        height: 20px;
        width: 20px;

        padding: 0;
        margin: 0 7px;

        cursor: pointer;
        -webkit-appearance: none;
    }
    select:focus {
        outline: none;
    }
</style>

<select on:change={({ target }) => updatePreference("locale", target.value)}>
    {#each locales as l}
        <option selected={l === $locale} value={l}>{flags[l] || "🗿"}</option>
    {/each}
</select>