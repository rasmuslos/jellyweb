<script context="module" lang="ts">
    import {Response, Theme} from "$lib/typings";
    import type {ErrorLoad} from "@sveltejs/kit";
    import {mobile} from "$lib/stores";
    import {isMobile} from "$lib/helper";

    export const load: ErrorLoad = ({error, status, session}) => {
        mobile.set(isMobile(session.agent))

		try {
			const data = JSON.parse(error.message) as unknown as Response<string>
			const status = data.status ?? 500
			
			if(status === 401) return {
				status: 302,
				redirect: "/auth/logout"
			}

			return {
				props: {
					title: status,
					description: data.payload ?? "Unknown server error (1)"
				}
			}
		} catch (exception) {
			if(status === 404) return {
				props: {
					title: "Not found",
					description: "The requested resource cannot be found",
				}
			}

			return {
				props: {
					title: 500,
					description: "Unknown server error (2)",
				}
			}
		}
	}
</script>
<script lang="ts">
	import Layout from "../components/Layout.svelte"
	import Heading from "../components/hero/Heading.svelte"
	import Push from "../components/util/Push.svelte"
	import ApplyMeasurements from "../components/ApplyMeasurements.svelte"

	export let title: string = "500"
	export let description: string = "Unknown server error (3)"
</script>

<svelte:head>
	<title>Error {title}</title>
</svelte:head>

<Layout i18n="en" theme={Theme.DARK} showNavigation={false}>
		<ApplyMeasurements>
		<div>
			<Push big />
			<Heading>{title}</Heading>
			<p>
				{description}
			</p>
			<Push smaller />
			<a href="/" sveltekit:prefetch>&#8592; Take me back</a>
		</div>
	</ApplyMeasurements>
</Layout>

<style>
	div {
		text-align: center;
	}
	a {
		color: var(--primary);
	}
</style>
