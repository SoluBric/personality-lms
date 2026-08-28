<script lang="ts">
	// @ts-nocheck
	import {
		courses,
		enneagramTypes,
		learnerCourseStates,
		members,
		recommendations as allRecommendations,
		relationships,
		skills,
		teams,
		type Course,
		type InsightKind,
		type Member,
		type Relationship,
		type Team
	} from '$lib/demo-data';

	type ViewMode = 'overview' | 'pathways' | 'team';

	const themes = [
		{ id: 'violet', name: 'Violet', accent: '#a78bfa', soft: '#251d3b' },
		{ id: 'teal', name: 'Teal', accent: '#2dd4bf', soft: '#102f2c' },
		{ id: 'ember', name: 'Ember', accent: '#f05d4f', soft: '#341b18' },
		{ id: 'gold', name: 'Gold', accent: '#f6c85f', soft: '#332712' }
	];

	const territories = ['Strengthen Strengths', 'Stress & Growth', 'Fortify Growth Areas', 'Team Development'] as const;

	let selectedMemberId = $state('emily');
	let selectedColleagueId = $state('james');
	let mode = $state<'dark' | 'light'>('dark');
	let themeId = $state('violet');
	let viewMode = $state<ViewMode>('overview');
	let selectedWheelType = $state<number | null>(null);
	let hoverWheelType = $state<number | null>(null);
	let selectedPatternType = $state<number>(9);
	let expandedInsight = $state<string | null>(null);
	let selectedCourseId = $state('S9-01');

	const selectedMember = $derived(members.find((member) => member.id === selectedMemberId) ?? members[0]);
	const selectedTheme = $derived(themes.find((theme) => theme.id === themeId) ?? themes[0]);
	const currentTeam = $derived(getTeam(selectedMember.teamId));
	const teamMembers = $derived(currentTeam.memberIds.map(getMember).filter(Boolean) as Member[]);
	const otherTeamMembers = $derived(teamMembers.filter((member) => member.id !== selectedMember.id));
	const mainType = $derived(getType(selectedMember.primaryType));
	const selectedWheelDetail = $derived(selectedWheelType ? getType(selectedWheelType) : null);
	const rankedTypes = $derived([...enneagramTypes].sort((a, b) => selectedMember.scores[b.number] - selectedMember.scores[a.number]));
	const selectedPatternDetail = $derived(getType(selectedPatternType));
	const selectedPatternCourses = $derived(getCoursesForType(selectedPatternType, selectedMember));
	const recommendations = $derived(legacyRecommendationsFor(selectedMember).map((recommendation) => ({ ...recommendation, territory: pathwayTerritory(recommendation.source.pathway), course: getCourse(recommendation.courseId) })).filter((item) => item.course));
	const pathwayCourses = $derived(legacyRecommendationsFor(selectedMember).slice(0, 4).map((recommendation) => getCourse(recommendation.courseId)).filter(Boolean) as Course[]);
	const teamPathwayCourses = $derived(currentTeam.pathwayCourseIds.map(getCourse).filter(Boolean) as Course[]);
	const teamAverage = $derived(getAverageScores(teamMembers));
	const teamRelationships = $derived(relationships.filter((relationship) => relationship.teamId === currentTeam.id && relationship.memberIds.includes(selectedMember.id)));
	const selectedRelationship = $derived(getRelationship(selectedMember.id, selectedColleagueId, currentTeam.id) ?? teamRelationships[0]);
	const selectedColleague = $derived(selectedRelationship ? getOtherMember(selectedRelationship, selectedMember.id) : otherTeamMembers[0]);
	const selectedCourse = $derived(getCourse(selectedCourseId) ?? recommendations[0]?.course ?? courses[0]);
	const totalProgress = $derived(pathwayCourses.length ? Math.round(pathwayCourses.reduce((sum, course) => sum + courseProgress(course.id), 0) / pathwayCourses.length) : 0);
	const overlapTypes = $derived(enneagramTypes.filter((type) => teamMembers.filter((member) => member.scores[type.number] >= 60).length >= Math.max(2, Math.ceil(teamMembers.length / 2))));
	const gapTypes = $derived([...enneagramTypes].sort((a, b) => teamAverage[a.number] - teamAverage[b.number]).slice(0, 4));

	$effect(() => {
		if (!currentTeam.memberIds.includes(selectedColleagueId)) {
			selectedColleagueId = otherTeamMembers[0]?.id ?? selectedMember.id;
		}
	});

	function getType(typeNumber: number) {
		return enneagramTypes.find((type) => type.number === typeNumber) ?? enneagramTypes[0];
	}

	function getCourse(courseId: string) {
		return courses.find((course) => course.id === courseId);
	}

	function legacyRecommendationsFor(member: Member) {
		return allRecommendations.filter((recommendation) => recommendation.learnerId === member.id);
	}

	function pathwayTerritory(pathway: string) {
		if (pathway === 'strengths') return 'Strengthen Strengths';
		if (pathway === 'stress-growth') return 'Stress & Growth';
		if (pathway === 'fortification') return 'Fortify Growth Areas';
		return 'Team Development';
	}

	function courseProgress(courseId: string) {
		return learnerCourseStates.find((state) => state.learnerId === selectedMember.id && state.courseId === courseId)?.progressPct ?? 0;
	}

	function isCourse(course: Course | undefined): course is Course {
		return Boolean(course);
	}

	function getMember(memberId: string) {
		return members.find((member) => member.id === memberId);
	}

	function getTeam(teamId: string): Team {
		return teams.find((team) => team.id === teamId) ?? teams[0];
	}

	function getSkill(skillId: string) {
		return skills.find((skill) => skill.id === skillId);
	}

	function getAverageScores(roster: Member[]) {
		const result: Record<number, number> = {};
		for (const type of enneagramTypes) {
			const total = roster.reduce((sum, member) => sum + member.scores[type.number], 0);
			result[type.number] = Math.round(total / roster.length);
		}
		return result;
	}

	function getRelationship(memberA: string, memberB: string, teamId: string) {
		return relationships.find((relationship) => relationship.teamId === teamId && relationship.memberIds.includes(memberA) && relationship.memberIds.includes(memberB));
	}

	function getOtherMember(relationship: Relationship, memberId: string) {
		return getMember(relationship.memberIds.find((id) => id !== memberId) ?? relationship.memberIds[0]);
	}

	function getCoursesForType(typeNumber: number, member: Member) {
		const typeSkills = getType(typeNumber).skills;
		return courses
			.filter((course) => course.develops.some((skillId) => typeSkills.includes(getSkill(skillId)?.name ?? '')))
			.concat(legacyRecommendationsFor(member).map((recommendation) => getCourse(recommendation.courseId)).filter(Boolean) as Course[])
			.filter((course, index, list) => list.findIndex((item) => item.id === course.id) === index)
			.slice(0, 4);
	}

	function selectMember(memberId: string) {
		selectedMemberId = memberId;
		const nextMember = getMember(memberId) ?? members[0];
		selectedWheelType = null;
		selectedPatternType = nextMember.primaryType;
		selectedCourseId = legacyRecommendationsFor(nextMember)[0]?.courseId ?? 'S9-01';
		expandedInsight = null;
	}

	function wheelPosition(index: number, score: number, typeNumber: number) {
		const angle = (-90 + index * 40) * (Math.PI / 180);
		const profileBoost = selectedMember.profile.includes(typeNumber) ? 26 : 0;
		const radius = 156 + (score / 100) * 34 + profileBoost;
		const size = 54 + (score / 100) * 42 + (selectedMember.profile.includes(typeNumber) ? 18 : 0);
		return `--x: ${Math.cos(angle) * radius}px; --y: ${Math.sin(angle) * radius}px; --node-size: ${size}px;`;
	}

	function toggleWheelType(typeNumber: number) {
		selectedWheelType = selectedWheelType === typeNumber ? null : typeNumber;
	}

	function profileRole(typeNumber: number) {
		const index = selectedMember.profile.indexOf(typeNumber);
		return ['Primary pattern', 'Secondary pattern', 'Tertiary pattern'][index] ?? '';
	}

	function toggleInsight(kind: InsightKind, index: number) {
		const key = `${kind}-${index}`;
		expandedInsight = expandedInsight === key ? null : key;
	}

	function isExpanded(kind: InsightKind, index: number) {
		return expandedInsight === `${kind}-${index}`;
	}
</script>

<svelte:head>
	<title>Personality LMS Demo</title>
	<meta name="description" content="A demo for assessment-informed development pathways, team relationships, and learning recommendations." />
</svelte:head>

<div class="app-shell" data-mode={mode} style={`--accent: ${selectedTheme.accent}; --accent-soft: ${selectedTheme.soft};`}>
	<header class="topbar">
		<div class="user-mark">
			<strong>{selectedMember.name}</strong>
			<span>{selectedMember.role}</span>
		</div>

		<nav class="main-nav" aria-label="Primary">
			{#each ['overview', 'pathways', 'team'] as item}
				<button class:active={viewMode === item} type="button" onclick={() => (viewMode = item as ViewMode)}>{item}</button>
			{/each}
		</nav>

		<div class="header-controls">
			<div class="segmented" aria-label="Color mode">
				<button class:active={mode === 'dark'} type="button" onclick={() => (mode = 'dark')}>Dark</button>
				<button class:active={mode === 'light'} type="button" onclick={() => (mode = 'light')}>Light</button>
			</div>
			<div class="theme-switcher" aria-label="Theme color">
				{#each themes as theme}
					<button class:active={theme.id === themeId} type="button" aria-label={`Use ${theme.name} theme`} title={theme.name} style={`--swatch: ${theme.accent};`} onclick={() => (themeId = theme.id)}></button>
				{/each}
			</div>
		</div>

		<label class="member-select">
			<span>For demo purposes</span>
			<select bind:value={selectedMemberId} onchange={(event) => selectMember(event.currentTarget.value)}>
				{#each members as member}
					<option value={member.id}>{member.name} / {member.profile.join('-')}</option>
				{/each}
			</select>
		</label>
	</header>

	<main>
		{#if viewMode === 'overview'}
			<section class="overview-hero">
				<div class="wheel-panel">
					<div class="trifix-strip" aria-label="Primary profile types">
						{#each selectedMember.profile as typeNumber, index}
							{@const type = getType(typeNumber)}
							<button type="button" onmouseenter={() => (hoverWheelType = typeNumber)} onmouseleave={() => (hoverWheelType = null)} onclick={() => toggleWheelType(typeNumber)}>
								<span>{index + 1}</span>
								<strong>{type.number} / {type.name}</strong>
							</button>
						{/each}
					</div>
					<div class="wheel-stage" aria-label="Interactive Enneagram score wheel">
						<div class="wheel-rings"></div>
						{#each enneagramTypes as type, index}
							{@const score = selectedMember.scores[type.number]}
							<button
								class:primary={selectedMember.profile.includes(type.number)}
								class:active={selectedWheelType === type.number || hoverWheelType === type.number}
								class="wheel-node"
								type="button"
								style={`${wheelPosition(index, score, type.number)} --type-color: ${type.color};`}
								onclick={() => toggleWheelType(type.number)}
								aria-label={`${type.number} ${type.name}, score ${score}`}
							>
								<span>{type.number}</span>
								<strong>{score}</strong>
							</button>
						{/each}
						<div class="wheel-center">
							<span>Profile</span>
							<strong>{selectedMember.profile.join('-')}</strong>
						</div>
					</div>
					<button class="trifix-bubble" type="button" onclick={() => (selectedWheelType = null)}>
						<span>Profile blend: {selectedMember.profile.join('-')}</span>
						<strong>{selectedMember.profileName}</strong>
					</button>
				</div>

				<aside class="hero-detail">
					{#if selectedWheelDetail}
						<div class="detail-topline">
							<p class="eyebrow">Assessment overview</p>
							{#if profileRole(selectedWheelDetail.number)}
								<span>{profileRole(selectedWheelDetail.number)}</span>
							{/if}
						</div>
						<h1>{selectedWheelDetail.number} / {selectedWheelDetail.name}</h1>
						<p>{selectedWheelDetail.description}</p>
						<div class="detail-score">
							<span>Score</span>
							<strong>{selectedMember.scores[selectedWheelDetail.number]}</strong>
						</div>
						<div class="dual-list">
							<div>
								<h3>Strengths</h3>
								<ul>
									{#each selectedWheelDetail.strengths as strength}<li>{strength}</li>{/each}
								</ul>
							</div>
							<div>
								<h3>Challenges</h3>
								<ul>
									{#each selectedWheelDetail.weaknesses as weakness}<li>{weakness}</li>{/each}
								</ul>
							</div>
						</div>
					{:else}
						<p class="eyebrow">Assessment overview</p>
						<h1>{mainType.number} / {mainType.name}</h1>
						<p class="lead">{selectedMember.summary}</p>
						<h3>Profile blend {selectedMember.profile.join('-')}: {selectedMember.profileName}</h3>
						<p>{selectedMember.profileDescription}</p>
					{/if}
				</aside>
			</section>

			<section class="insight-grid">
				{@render InsightColumn('Main patterns', 'What shows up often', 'patterns', selectedMember.patterns)}
				{@render InsightColumn('Optimal growth edges', 'Where development pays off', 'growth', selectedMember.growthEdges)}
				{@render InsightColumn('Blind spots', 'What may be missed', 'blind', selectedMember.blindSpots)}
			</section>

			<section class="strength-course-grid">
				<article class="panel">
					<div class="panel-heading">
						<div>
							<p class="eyebrow">Pattern distribution</p>
							<h2>Highest to lowest</h2>
						</div>
						<p class="muted">These are assessment pattern scores, not skill scores. Select any type to inspect related capabilities.</p>
					</div>
					<div class="ranked-list">
						{#each rankedTypes as type, index}
							{@const score = selectedMember.scores[type.number]}
							<button class:active={selectedPatternType === type.number} type="button" onclick={() => (selectedPatternType = type.number)}>
								<span class="rank">{index + 1}</span>
								<span class="type-dot" style={`--type-color: ${type.color};`}>{type.number}</span>
								<span class="rank-copy">
									<strong>{type.name}</strong>
									<i><b style={`width: ${score}%; background: ${type.color};`}></b></i>
								</span>
								<span class="score">{score}</span>
							</button>
						{/each}
					</div>
				</article>

				<aside class="panel skill-panel">
					<p class="eyebrow">Capabilities from selected pattern</p>
					<h2>{selectedPatternDetail.name}</h2>
					<p>{selectedPatternDetail.description}</p>
					<h3>Traits</h3>
					<ul class="trait-list">
						{#each selectedPatternDetail.strengths as trait}<li>{trait}</li>{/each}
					</ul>
					<h3>Skills</h3>
					<div class="skill-tags">
						{#each selectedPatternDetail.skills as skill}<span>{skill}</span>{/each}
					</div>
					<h3>Suggested courses</h3>
					<div class="compact-courses">
						{#each selectedPatternCourses as course}
							<div>
								<strong>{course.name}</strong>
								<span>{course.level} / {course.lengthMinutes} min</span>
							</div>
						{/each}
					</div>
				</aside>
			</section>
		{:else if viewMode === 'pathways'}
			<section class="mode-hero">
				<div>
					<p class="eyebrow">Pathways</p>
					<h1>{selectedMember.profileName}</h1>
					<p>{selectedMember.name}'s pathway connects profile signals to development reasons, reusable skills, courses and team application.</p>
				</div>
				<div class="progress-summary large">
					<span>Pathway progress</span>
					<strong>{totalProgress}%</strong>
				</div>
			</section>

			<section class="territory-grid">
				{#each territories as territory}
					<article class="panel territory-card">
						<p class="eyebrow">{territory}</p>
						<h2>{recommendations.filter((recommendation) => recommendation.territory === territory).length || 1}</h2>
						<p>{territory === 'Strengthen Strengths' ? 'Build on what already comes naturally.' : territory === 'Stress & Growth' ? 'Increase flexibility under pressure.' : territory === 'Fortify Growth Areas' ? 'Develop range around constraints and blind spots.' : 'Connect individual development to collaboration.'}</p>
					</article>
				{/each}
			</section>

			<section class="pathway-map panel">
				<div class="panel-heading">
					<div>
						<p class="eyebrow">Visible pathway</p>
						<h2>{pathwayCourses.map((course) => course.name).join(' -> ')}</h2>
					</div>
					<p class="muted">Courses are reusable. The recommendation reason is what makes them personal.</p>
				</div>
				<div class="node-track">
					{#each pathwayCourses as course, index}
						<button class:active={selectedCourse.id === course.id} type="button" onclick={() => (selectedCourseId = course.id)}>
							<span>{index + 1}</span>
							<strong>{course.name}</strong>
							<small>{getSkill(course.develops[0])?.name}</small>
						</button>
					{/each}
				</div>
			</section>

			<section class="strength-course-grid">
				<article class="panel">
					<p class="eyebrow">Why this is recommended</p>
					<h2>{selectedCourse.name}</h2>
					<p>{recommendations.find((recommendation) => recommendation.courseId === selectedCourse.id)?.reason ?? selectedCourse.description}</p>
					<div class="skill-tags">
						<span>{getSkill(selectedCourse.develops[0])?.name}</span>
						{#each selectedCourse.develops.slice(1) as skillId}<span>{getSkill(skillId)?.name}</span>{/each}
					</div>
				</article>
				<article class="panel">
					<p class="eyebrow">Course outline</p>
					<h2>{selectedCourse.level} / {selectedCourse.lengthMinutes} min</h2>
					<ul class="trait-list">
						{#each selectedCourse.learningFocus as item}<li>{item}</li>{/each}
					</ul>
				</article>
			</section>
		{:else}
			<section class="mode-hero">
				<div>
					<p class="eyebrow">Team</p>
					<h1>{currentTeam.name}</h1>
					<p>{currentTeam.description}</p>
				</div>
				<div class="progress-summary large">
					<span>Members</span>
					<strong>{teamMembers.length}</strong>
				</div>
			</section>

			<section class="team-summary">
				<article class="panel">
					<div class="panel-heading">
						<div>
							<p class="eyebrow">Colleagues</p>
							<h2>Working styles</h2>
						</div>
					</div>
					<div class="teammate-grid">
						{#each otherTeamMembers as teammate}
							<button class:active={selectedColleague?.id === teammate.id} type="button" onclick={() => (selectedColleagueId = teammate.id)}>
								<span class="avatar">{teammate.primaryType}</span>
								<span>
									<strong>{teammate.name}</strong>
									<small>{teammate.role}</small>
									<i>Profile {teammate.profile.join('-')}</i>
								</span>
							</button>
						{/each}
					</div>
				</article>

				<article class="panel">
					<p class="eyebrow">Relationship lens</p>
					<h2>{selectedMember.name.split(' ')[0]} + {selectedColleague?.name.split(' ')[0]}</h2>
					<p>{selectedRelationship?.complementarity}</p>
					<div class="relationship-note">
						<span>Watch for</span>
						<strong>{selectedRelationship?.friction}</strong>
					</div>
					<p>{selectedRelationship?.viewerNotes[selectedMember.id]}</p>
				</article>

				<article class="panel">
					<p class="eyebrow">Shared learning</p>
					<h2>{selectedRelationship?.theme}</h2>
					<div class="compact-courses">
						{#each (selectedRelationship?.courses ?? []).map(getCourse).filter(isCourse) as course}
							<div>
								<strong>{course.name}</strong>
								<span>{course.level} / {course.lengthMinutes} min</span>
							</div>
						{/each}
					</div>
				</article>
			</section>

			<section class="strength-course-grid">
				<article class="panel">
					<p class="eyebrow">Collective strengths</p>
					<h2>{currentTeam.pathwayName}</h2>
					<div class="skill-tags">
						{#each currentTeam.strengths as strength}<span>{strength}</span>{/each}
					</div>
					<div class="team-bars">
						{#each overlapTypes.slice(0, 5) as type}
							<div>
								<span>{type.number}</span>
								<div><i style={`width: ${teamAverage[type.number]}%; background: ${type.color};`}></i></div>
								<strong>{teamAverage[type.number]}</strong>
							</div>
						{/each}
					</div>
				</article>
				<article class="panel">
					<p class="eyebrow">Development priorities</p>
					<h2>Where the team can grow</h2>
					<ul class="trait-list">
						{#each currentTeam.priorities as priority}<li>{priority}</li>{/each}
					</ul>
					<div class="team-bars">
						{#each gapTypes as type}
							<div>
								<span>{type.number}</span>
								<div><i style={`width: ${teamAverage[type.number]}%; background: ${type.color};`}></i></div>
								<strong>{teamAverage[type.number]}</strong>
							</div>
						{/each}
					</div>
				</article>
			</section>

			<section class="pathway-map panel">
				<div class="panel-heading">
					<div>
						<p class="eyebrow">Team pathway</p>
						<h2>{currentTeam.pathwayName}</h2>
					</div>
				</div>
				<div class="node-track">
					{#each teamPathwayCourses as course, index}
						<button type="button" onclick={() => ((selectedCourseId = course.id), (viewMode = 'pathways'))}>
							<span>{index + 1}</span>
							<strong>{course.name}</strong>
							<small>{course.pathway}</small>
						</button>
					{/each}
				</div>
			</section>
		{/if}
	</main>
</div>

{#snippet InsightColumn(title: string, subtitle: string, kind: InsightKind, items: string[])}
	<article class="panel">
		<p class="eyebrow">{title}</p>
		<h2>{subtitle}</h2>
		<div class="expand-list">
			{#each items as item, index}
				<button class:open={isExpanded(kind, index)} type="button" onclick={() => toggleInsight(kind, index)}>
					<strong>{item}</strong><i aria-hidden="true"></i>
					{#if isExpanded(kind, index)}
						<span>Placeholder detail: this will connect to a profile signal, skill, course, and practical behaviour example.</span>
					{/if}
				</button>
			{/each}
		</div>
	</article>
{/snippet}
