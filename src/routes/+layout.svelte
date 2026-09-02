<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { restoreSelectedDemoLearner } from '$lib/demo-routing.svelte';

	let { children } = $props();
	let showWidthNotice = $state(true);

	$effect(() => {
		restoreSelectedDemoLearner();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{#if showWidthNotice}
	<aside class="viewport-width-notice" role="status">
		<span>Increase browser width for optimal viewing</span>
		<button type="button" aria-label="Dismiss width notice" onclick={() => (showWidthNotice = false)}>×</button>
	</aside>
{/if}
{@render children()}
