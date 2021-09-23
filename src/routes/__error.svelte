<script context="module" lang="ts">
    export function load({ error, status, page }) {
        if(page.path === "/error") return {
            props: {
                title: "An unknown error occurred"
            }
        }
        else return {
            props: {
                title: `${status}: ${error.message}`
            }
        }
    }
</script>
<script lang="ts">
    export let title: string
</script>

<style>
    section {
        text-align: center;
    }
    h1 {
        color: var(--error);
    }
    a {
        background-color: #8FBCBB80;
    }
</style>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<section>
    <h1>{title || "Unknown error"}</h1>
    <a href="/">Take me back</a>
</section>