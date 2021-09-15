<script lang="ts">
	import "normalize.css";
	import Navigation from '../components/Navigation.svelte';

	export let segment: string;
</script>

<style>
	div {
		display: block;
		position: relative;

		height: 100vh;
		width: 100vw;
		overflow: hidden;

		font-family: var(--font);
		font-size: var(--size);

		background-color: var(--background);
		color: var(--text);
	}
</style>

<div>
	<Navigation {segment}/>
	<main>
		<slot></slot>
	</main>
</div>