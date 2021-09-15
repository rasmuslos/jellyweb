<script lang="ts">
	import Navigation from '../components/Navigation.svelte';

	export let segment: string;
</script>

<div>
	<Navigation {segment}/>
	<main>
		<slot></slot>
	</main>
</div>