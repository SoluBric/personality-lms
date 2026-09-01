<script lang="ts">
	import { themeState, themeStyle } from '$lib/theme.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Access | Personality LMS Demo</title>
	<meta name="description" content="Access panel for the private demo." />
</svelte:head>

<div class="app-shell login-shell" data-mode={themeState.mode} style={themeStyle()}>
	<main class="login-main">
		<section class="login-panel">
			<h1>Access code required</h1>

			<form method="POST" class="login-form">
				<label for="password">Access code</label>
				<input id="password" name="password" type="password" autocomplete="current-password" disabled={!data.protectionEnabled} />
				{#if data.configurationRequired}
					<p class="form-error">Access protection is required, but the demo access code has not been configured.</p>
				{/if}
				{#if form?.message}
					<p class="form-error">{form.message}</p>
				{/if}
				<button type="submit" disabled={!data.protectionEnabled}>Submit code</button>
			</form>
		</section>
	</main>
</div>
