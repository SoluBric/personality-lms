<script lang="ts">
	import MemberPicker from '$lib/MemberPicker.svelte';
	import ThemeControls from '$lib/ThemeControls.svelte';
	import { members, teams } from '$lib/demo-data';
	import { themeState, themeStyle } from '$lib/theme.svelte';

	let selectedMemberId = $state('emily');
	const selectedMember = $derived(members.find((member) => member.id === selectedMemberId) ?? members[0]);
</script>

<svelte:head>
	<title>About This Demo | Personality LMS Demo</title>
	<meta name="description" content="Context for the Personality LMS demo." />
</svelte:head>

<div class="app-shell" data-mode={themeState.mode} style={themeStyle()}>
	<header class="topbar">
		<div class="user-mark">
			<strong>{selectedMember.name}</strong>
			<span>{selectedMember.role}</span>
		</div>

		<nav class="main-nav" aria-label="Primary">
			<a href="/profile">Profile</a>
			<a href="/pathways">Pathways</a>
			<a href="/team">Team</a>
			<span class="nav-divider" aria-hidden="true"></span>
			<a class="about-link active" href="/about">About This Demo</a>
		</nav>

		<MemberPicker members={members} teams={teams} bind:value={selectedMemberId} />

		<ThemeControls />

		<details class="tablet-settings">
			<summary aria-label="Open display settings"><span class="settings-glyph" aria-hidden="true"></span></summary>
			<div class="tablet-settings-panel">
				<MemberPicker members={members} teams={teams} bind:value={selectedMemberId} />
				<ThemeControls />
			</div>
		</details>
	</header>

	<main>
		<section class="about-hero panel">
			<div>
				<p class="eyebrow">About this demo</p>
				<h1>Assessment-informed learning, shown as a working product prototype.</h1>
				<p>
					This demo connects a user profile, enneagram-style type patterns, suggested learning routes, team relationships and shared development pathways. It is designed to show the product experience and content model, not to act as a clinical or diagnostic tool.
				</p>
			</div>
		</section>

		<section class="about-grid">
			<article class="about-card">
				<p class="eyebrow">What it shows</p>
				<h2>Personal profile to learning action</h2>
				<p>The profile page turns type signals into a readable map, key patterns and concrete development directions.</p>
			</article>
			<article class="about-card">
				<p class="eyebrow">Pathways</p>
				<h2>Courses organized by context</h2>
				<p>Learning is grouped into strengths, stress and growth, fortification and team routes, with maps and course lists supporting different exploration styles.</p>
			</article>
			<article class="about-card">
				<p class="eyebrow">Team layer</p>
				<h2>Individual insight connected to colleagues</h2>
				<p>The team area demonstrates relationship dynamics, pair routes, watch areas and shared courses for team-level capability.</p>
			</article>
			<article class="about-card">
				<p class="eyebrow">Demo boundaries</p>
				<h2>Prototype data, not live accounts</h2>
				<p>The visible users are sample learners. The app-level access gate is only for controlling who can view the demo.</p>
			</article>
		</section>
	</main>
</div>
