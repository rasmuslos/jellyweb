<script lang="ts">
import { _ } from "svelte-i18n";

    import Search from "./Search.svelte";
</script>

<div>
    <h1>{$_("util.search")}</h1>
    <Search autofocus />
</div>

<style>
    div {
        display: block;
        margin: 200px auto;

        width: 750px;
        max-width: 90%;
    }
    h1 {
        text-align: center;
    }
</style>