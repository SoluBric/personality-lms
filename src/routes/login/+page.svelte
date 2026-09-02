<script lang="ts">
	import { themeState, themeStyle } from '$lib/theme.svelte';

	let { data, form } = $props();
	let message = $state('');
	let pending = $state(false);

	type LoginResponse = {
		location?: unknown;
		message?: unknown;
	};

	$effect(() => {
		if (form?.message) message = form.message;
	});

	async function submitAccessCode(event: SubmitEvent) {
		event.preventDefault();
		if (!data.protectionEnabled || pending) return;

		const formElement = event.currentTarget as HTMLFormElement;
		const formData = new FormData(formElement);

		message = '';
		pending = true;

		try {
			const response = await fetch('/login/access', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					password: String(formData.get('password') ?? ''),
					next: data.next
				})
			});
			const result = (await response.json().catch(() => undefined)) as LoginResponse | undefined;

			if (response.ok && typeof result?.location === 'string') {
				window.location.assign(result.location);
				return;
			}

			message = typeof result?.message === 'string' ? result.message : 'Unable to submit access code. Please try again.';
		} catch {
			message = 'Unable to submit access code. Please try again.';
		} finally {
			pending = false;
		}
	}
</script>

<svelte:head>
	<title>Access | Personality LMS Demo</title>
	<meta name="description" content="Access panel for the private demo." />
</svelte:head>

<div class="app-shell login-shell" data-mode={themeState.mode} style={themeStyle()}>
	<main class="login-main">
		<section class="login-panel">
			<h1>Access code required</h1>

			<form method="POST" class="login-form" onsubmit={submitAccessCode}>
				<label for="password">Access code</label>
				<input id="password" name="password" type="password" autocomplete="current-password" disabled={!data.protectionEnabled || pending} />
				{#if data.configurationRequired}
					<p class="form-error">Access protection is required, but the demo access code has not been configured.</p>
				{/if}
				{#if message}
					<p class="form-error">{message}</p>
				{/if}
				<button type="submit" disabled={!data.protectionEnabled || pending}>{pending ? 'Checking...' : 'Submit code'}</button>
			</form>
		</section>
	</main>
</div>
