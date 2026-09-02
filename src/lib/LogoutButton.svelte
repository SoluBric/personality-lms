<script lang="ts">
	let pending = $state(false);

	type LogoutResponse = {
		location?: unknown;
	};

	async function logout() {
		if (pending) return;
		pending = true;

		try {
			const response = await fetch('/logout', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: '{}'
			});
			const result = (await response.json().catch(() => undefined)) as LogoutResponse | undefined;

			window.location.assign(typeof result?.location === 'string' ? result.location : '/login');
		} catch {
			window.location.assign('/login');
		}
	}
</script>

<button class="logout-button" type="button" disabled={pending} onclick={logout}>
	{pending ? 'Logging out...' : 'Logout'}
</button>
