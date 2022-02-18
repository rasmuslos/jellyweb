<script>
    import Layout from "../../components/Layout.svelte";
    import {preferences} from "$lib/stores";
</script>

<Layout theme={$preferences.theme}>
    <slot />
</Layout>