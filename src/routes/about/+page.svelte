<script lang="ts">
	import { onMount } from 'svelte';
	import MemberPicker from '$lib/MemberPicker.svelte';
	import ThemeControls from '$lib/ThemeControls.svelte';
	import { selectedDemoLearner, setSelectedDemoLearner } from '$lib/demo-routing.svelte';
	import { members, teams } from '$lib/demo-data';
	import { themeState, themeStyle } from '$lib/theme.svelte';

	const sections = [
		{ id: 'quick-start', label: 'Quick start' },
		{ id: 'about-demo-app', label: 'About this demo app' },
		{ id: 'content-context', label: 'Content context' }
	];

	let selectedMemberId = $derived(selectedDemoLearner.id);
	let activeSection = $state(sections[0].id);
	const selectedMember = $derived(members.find((member) => member.id === selectedMemberId) ?? members[0]);

	function selectMember(memberId: string) {
		setSelectedDemoLearner(memberId);
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
				if (visible?.target.id) activeSection = visible.target.id;
			},
			{ rootMargin: '-22% 0px -58% 0px', threshold: [0.12, 0.28, 0.5] }
		);

		for (const section of sections) {
			const element = document.getElementById(section.id);
			if (element) observer.observe(element);
		}

		return () => observer.disconnect();
	});
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

		<MemberPicker members={members} teams={teams} value={selectedMemberId} onSelect={selectMember} />

		<ThemeControls />

		<form class="logout-form" method="POST" action="/logout">
			<button class="logout-button" type="submit">Logout</button>
		</form>

		<details class="tablet-settings">
			<summary aria-label="Open display settings"><span class="settings-glyph" aria-hidden="true"></span></summary>
			<div class="tablet-settings-panel">
				<MemberPicker members={members} teams={teams} value={selectedMemberId} onSelect={selectMember} />
				<ThemeControls />
				<form class="logout-form" method="POST" action="/logout">
					<button class="logout-button" type="submit">Logout</button>
				</form>
			</div>
		</details>
	</header>

	<main>
		<div class="about-layout">
			<aside class="about-sidebar" aria-label="About sections">
				<p class="eyebrow">About this demo</p>
				<nav>
					{#each sections as section}
						<a class:active={activeSection === section.id} href={`#${section.id}`}>{section.label}</a>
					{/each}
				</nav>
			</aside>

			<section class="about-display panel">
				<article id="quick-start" class="about-section">
					<p class="eyebrow">Quick start</p>

					<div class="about-instruction">
						<div class="about-picker-shell" aria-hidden="true">
							<span>For demo purposes</span>
							<strong>Emily Carter / 9-2-6</strong>
							<small>Team Atlas</small>
							<i></i>
						</div>
						<p>Use the user selector dropdown in the top-left nav to switch between different user accounts. There are six demo users of varying configurations, split across two teams.</p>
					</div>

					<div class="about-instruction">
						<div class="about-theme-shell" aria-hidden="true">
							<div><b>Dark</b><b>Light</b></div>
							<div class="about-theme-swatches">
								<span></span><span></span><span></span><span></span>
							</div>
						</div>
						<p>Use the toggle in the top-left nav to switch between dark and light mode, and choose a theme colour too.</p>
					</div>

					<div class="about-note">
						<strong>To note:</strong>
						<ul>
							<li>Data is not able to be modified in this demo app, including course progress changes.</li>
							<li>For best viewing use a laptop or desktop. There is some responsive styling for tablet view, but mobile view has not been properly covered and this demo app will not look good on a mobile.</li>
						</ul>
					</div>
				</article>

				<article id="about-demo-app" class="about-section">
					<p class="eyebrow">About this demo app</p>
					<p>Primary purpose of this demo app was to explore the intersection between a personality test app and a LMS.</p>
					<p>Other main focuses of this demo app were exploring how various interfaces and dynamics can be used to cleanly represent differing details, and exploring tailored learning pathways as compared to generic and straight-line setups.</p>
				</article>

				<article id="content-context" class="about-section">
					<p class="eyebrow">Content context</p>
					<p>This demo app makes use of the Enneagram for content, which is a personality test that involves nine types. More information about the Enneagram can be found below.</p>

					<div class="about-note">
						<strong>To note:</strong>
						<p>Some of this content deviates for demo purposes from the proper understanding of the Enneagram. For instance, the skill courses in this demo app are presented as skills belonging to different types, such as leadership skills belonging to Type 8s. In actual practice this is not the case; a skill like this may be accessible to all types, with variance in how the skill is applied.</p>
					</div>

					<div class="about-accordion">
						<details>
							<summary>What is the Enneagram?</summary>
							<p>The Enneagram is a personality framework organised around nine interconnected personality types. Each type describes a characteristic way of interpreting situations, responding to challenges and directing attention, with its own typical motivations, strengths and potential areas for development.</p>
							<p>Rather than treating a type as a fixed label, the Enneagram can also be used as a framework for exploring personal development. In this demo, the nine types provide a useful structure for showing how personality information could be connected to skills, learning recommendations and different development pathways.</p>
						</details>

						<details>
							<summary>What is the Trifix?</summary>
							<p>A Trifix describes a person through three Enneagram types rather than focusing on a single dominant type. The three types provide a broader picture of the different patterns and capabilities that may feature strongly in the person’s profile, while one will normally remain the primary type.</p>
							<p>In this demo, the Trifix is used as a flexible way of representing a learner’s strongest personality patterns. For example, a 9-2-6 profile draws together characteristics associated with Types 9, 2 and 6. These three types can then inform strengths-based learning, while the remaining types provide additional areas that the learner can explore and develop.</p>
						</details>

						<details>
							<summary>What are the relationships between the types and the Stress and Growth lines?</summary>
							<p>The nine Enneagram types are interconnected rather than existing independently. The familiar Enneagram diagram contains a set of lines connecting particular types, representing developmental relationships between them.</p>
							<p>These connections are often described in terms of stress and growth. Under pressure, a person may begin to display patterns associated with one connected type, while another connection can represent qualities or resources that support growth and greater flexibility. For example, Type 9 is connected with Types 6 and 3.</p>
							<p>In the demo, these relationships provide a useful way to demonstrate how learning can be mapped visually: courses can help someone recognise and manage pressure patterns, develop useful qualities associated with a growth direction, or build broader skills that support resilience across situations.</p>
						</details>

						<details>
							<summary>What are the Three Centres?</summary>
							<p>The nine Enneagram types are grouped into three Centres, each containing three types and representing a broad way of processing and responding to experience.</p>
							<ul>
								<li><strong>Body / Instinctive Centre - Types 8, 9 and 1:</strong> associated with instinct, action, autonomy and how a person engages with their environment.</li>
								<li><strong>Heart / Feeling Centre - Types 2, 3 and 4:</strong> associated with emotion, relationships, identity and interpersonal connection.</li>
								<li><strong>Head / Thinking Centre - Types 5, 6 and 7:</strong> associated with thinking, anticipation, understanding and navigating uncertainty.</li>
							</ul>
							<p>Everyone uses all three Centres, although individuals may rely on some modes more naturally than others. For the demo, the Centres provide another way of organising personality information and showing how learning could help someone strengthen familiar capabilities while also developing greater flexibility across different ways of thinking, relating and acting.</p>
						</details>
					</div>
				</article>
			</section>
		</div>
	</main>
</div>
