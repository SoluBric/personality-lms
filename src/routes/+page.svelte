<script lang="ts">
	import { members } from '$lib/demo-data';
	import { themeState, themeStyle } from '$lib/theme.svelte';

	const selectedMember = members[0];
</script>

<svelte:head>
	<title>Dashboard | Personality LMS Demo</title>
	<meta name="description" content="Dashboard placeholder for the assessment-informed learning demo." />
</svelte:head>

<div class="app-shell" data-mode={themeState.mode} style={themeStyle()}>
	<header class="topbar dashboard-topbar">
		<div class="user-mark">
			<strong>{selectedMember.name}</strong>
			<span>{selectedMember.role}</span>
		</div>

		<nav class="main-nav" aria-label="Primary">
			<a class="active" href="/profile">Profile</a>
			<a href="/pathways">Pathways</a>
			<a href="/team">Team</a>
			<span class="nav-divider" aria-hidden="true"></span>
			<a class="about-link" href="/about">About This Demo</a>
		</nav>
	</header>

	<main>
		<section class="mode-hero dashboard-placeholder">
			<div>
				<p class="eyebrow">Dashboard</p>
				<h1>Learning dashboard</h1>
				<p>This page will become the main launch point for profile insight, active pathways, team context and recommended learning. For now, the focused profile experience lives on the Profile page.</p>
			</div>
			<a class="primary-link" href="/profile">Open profile</a>
		</section>
	</main>
</div>
