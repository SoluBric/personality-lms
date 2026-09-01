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
			<p class="eyebrow">Private demo</p>
			<h1>Access required</h1>
			<p>This demo is protected so only invited viewers can open the app.</p>

			<form method="POST" class="login-form">
				<label for="password">Access code</label>
				<input id="password" name="password" type="password" autocomplete="current-password" disabled={!data.protectionEnabled} />
				{#if form?.message}
					<p class="form-error">{form.message}</p>
				{/if}
				<button type="submit" disabled={!data.protectionEnabled}>Enter demo</button>
			</form>

			{#if !data.protectionEnabled}
				<p class="login-note">Set <code>DEMO_ACCESS_PASSWORD</code> in Cloudflare Pages to enable the gate.</p>
			{/if}
		</section>
	</main>
</div>
