<script context="module" lang="ts">
    export function load({ error, status, page }) {
        if(page.path === "/error") return {
            props: {
                title: "An unknown error occurred"
            }
        }

        try {
            const message = JSON.parse(error.message)
            const status = message.status || 500

            if(status === 401) return {
                status: 301,
                redirect: "/error"
            }
            else return {
                props: {
                    title: `[${status}] ${message.error}`,
                    status,
                }
            }
        } catch (err) {
            return {
                props: {
                    title: `${status}: ${error.message}`,
                }
            }
        }
    }
</script>
<script lang="ts">
<<<<<<< Updated upstream
    export let title: string
=======
	import Layout from "../components/Layout.svelte"
	import Heading from "../components/hero/Heading.svelte"
	import Push from "../Push.svelte"
	import ApplyMeasurements from "../components/ApplyMeasurements.svelte"
	import { mobile } from "$lib/stores";
	import { isMobile } from "$lib/helper";

	export let title: string = "500"
	export let description: string = "Unknown server error (3)"
>>>>>>> Stashed changes
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