<script lang="ts">
	import {
		courses,
		enneagramTypes,
		members,
		recommendations,
		relationships,
		skills,
		teams,
		territoryToPathway,
		type Center,
		type Course,
		type EnneagramType,
		type Member,
		type Recommendation,
		type Skill,
		type Territory
	} from '$lib/demo-data';

	const themes = [
		{ id: 'violet', name: 'Violet', accent: '#a78bfa', soft: '#251d3b' },
		{ id: 'teal', name: 'Teal', accent: '#2dd4bf', soft: '#102f2c' },
		{ id: 'gold', name: 'Gold', accent: '#f6c85f', soft: '#332712' },
		{ id: 'slate', name: 'Slate', accent: '#93c5fd', soft: '#172033' }
	];

	const connectionLines: Record<number, { growth: number; stress: number }> = {
		1: { growth: 7, stress: 4 },
		2: { growth: 4, stress: 8 },
		3: { growth: 6, stress: 9 },
		4: { growth: 1, stress: 2 },
		5: { growth: 8, stress: 7 },
		6: { growth: 9, stress: 3 },
		7: { growth: 5, stress: 1 },
		8: { growth: 2, stress: 5 },
		9: { growth: 3, stress: 6 }
	};

	const centers: { name: Center; types: number[]; theme: string }[] = [
		{ name: 'Body', types: [8, 9, 1], theme: 'Action, autonomy, boundaries and instinctive response.' },
		{ name: 'Heart', types: [2, 3, 4], theme: 'Relationship, identity, value and emotional information.' },
		{ name: 'Head', types: [5, 6, 7], theme: 'Understanding, anticipation, planning and uncertainty.' }
	];

	const territoryCopy: Record<Territory, { label: string; compact: string; question: string; pathway: string }> = {
		Strengths: {
			label: 'Strengths',
			compact: 'Build further on capabilities that already come naturally and turn them into more deliberate professional strengths.',
			question: 'What already works well, and where could mastery look more intentional?',
			pathway: 'Listening / influence / facilitation progression'
		},
		'Stress & Growth': {
			label: 'Stress & Growth',
			compact: 'Recognise how your patterns shift under pressure and practise alternative responses that increase flexibility.',
			question: 'What happens when pressure increases, and what response would create more range?',
			pathway: 'Recognition -> regulation -> alternative responses'
		},
		Fortification: {
			label: 'Fortification',
			compact: 'Build capabilities around recurring challenges, overuse patterns and blind spots so more responses are available.',
			question: 'Where would additional capability give you more range?',
			pathway: 'From Accommodation to Constructive Assertion'
		},
		Team: {
			label: 'Team',
			compact: 'Use profile insight to improve collaboration, navigate differences and develop shared capability with colleagues.',
			question: 'How can this understanding help you work more effectively with others?',
			pathway: 'Shared team pathway'
		}
	};

	const territories = Object.keys(territoryCopy) as Territory[];
	const priorityRank: Record<Recommendation['priority'], number> = { primary: 0, supporting: 1, explore: 2 };

	let selectedMemberId = $state('emily');
	let mode = $state<'dark' | 'light'>('dark');
	let themeId = $state('violet');
	let selectedWheelType = $state<number | null>(null);
	let hoverWheelType = $state<number | null>(null);
	let selectedPatternType = $state<number>(9);
	let selectedLevel = $state(3);
	let expandedKey = $state<string | null>('main-0');
	let selectedLearningTerritory = $state<Territory | null>(null);

	const selectedMember = $derived(members.find((member) => member.id === selectedMemberId) ?? members[0]);
	const selectedTheme = $derived(themes.find((theme) => theme.id === themeId) ?? themes[0]);
	const mainType = $derived(getType(selectedMember.primaryType));
	const selectedWheelDetail = $derived(selectedWheelType ? getType(selectedWheelType) : null);
	const rankedTypes = $derived([...enneagramTypes].sort((a, b) => selectedMember.scores[b.number] - selectedMember.scores[a.number]));
	const selectedPatternDetail = $derived(getType(selectedPatternType));
	const selectedLevelDetail = $derived(mainType.developmentLevels.find((level) => level.level === selectedLevel) ?? mainType.developmentLevels[2]);
	const profileTypes = $derived(selectedMember.profile.map((typeNumber) => getType(typeNumber)));
	const connectionAnchor = $derived(selectedWheelDetail ?? mainType);
	const growthType = $derived(getType(connectionLines[connectionAnchor.number].growth));
	const stressType = $derived(getType(connectionLines[connectionAnchor.number].stress));
	const currentTeam = $derived(teams.find((team) => team.id === selectedMember.teamId) ?? teams[0]);
	const selectedTerritoryCopy = $derived(selectedLearningTerritory ? territoryCopy[selectedLearningTerritory] : null);
	const selectedTerritoryCourses = $derived(selectedLearningTerritory ? getCoursesForTerritory(selectedLearningTerritory, selectedMember) : []);
	const selectedTerritorySkills = $derived(getSkillsForCourses(selectedTerritoryCourses.map((item) => item.course)));
	const selectedTerritoryStory = $derived(selectedLearningTerritory ? getTerritoryStory(selectedLearningTerritory, selectedMember) : '');
	const teamRelationships = $derived(relationships.filter((relationship) => relationship.teamId === currentTeam.id && relationship.memberIds.includes(selectedMember.id)));
	const teamMembers = $derived(currentTeam.memberIds.map(getMember).filter(isMember));
	const teammates = $derived(teamMembers.filter((member) => member.id !== selectedMember.id));
	const teamWatchItems = $derived([...currentTeam.priorities, ...currentTeam.risks].filter((item, index, list) => list.indexOf(item) === index).slice(0, 6));

	function getType(typeNumber: number): EnneagramType {
		return enneagramTypes.find((type) => type.number === typeNumber) ?? enneagramTypes[0];
	}

	function selectMember(memberId: string) {
		selectedMemberId = memberId;
		const nextMember = members.find((member) => member.id === memberId) ?? members[0];
		selectedWheelType = null;
		selectedPatternType = nextMember.primaryType;
		selectedLevel = 3;
		expandedKey = 'main-0';
		selectedLearningTerritory = null;
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
		return ['Primary type', '2nd type', '3rd type'][index] ?? '';
	}

	function ordinal(index: number) {
		return ['1st', '2nd', '3rd'][index] ?? `${index + 1}th`;
	}

	function toggleExpanded(key: string) {
		expandedKey = expandedKey === key ? null : key;
	}

	function profileTypeForCenter(center: Center) {
		return profileTypes.find((type) => type.center === center);
	}

	function getCourse(courseId: string) {
		return courses.find((course) => course.id === courseId);
	}

	function getMember(memberId: string) {
		return members.find((member) => member.id === memberId);
	}

	function isMember(member: Member | undefined): member is Member {
		return Boolean(member);
	}

	function getSkill(skillId: string) {
		return skills.find((skill) => skill.id === skillId);
	}

	function isSkill(skill: Skill | undefined): skill is Skill {
		return Boolean(skill);
	}

	function skillsForType(typeNumber: number) {
		return skills.filter((skill) => skill.typeNumber === typeNumber);
	}

	function getCoursesForTerritory(territory: Territory, member = selectedMember) {
		const pathway = territoryToPathway[territory];
		const personalised = recommendations
			.filter((recommendation) => recommendation.learnerId === member.id && recommendation.source.pathway === pathway)
			.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])
			.map((recommendation) => ({ recommendation, course: getCourse(recommendation.courseId) }))
			.filter((item): item is { recommendation: Recommendation; course: Course } => Boolean(item.course));

		if (territory !== 'Team') {
			return personalised;
		}

		const teamItems = currentTeam.pathwayCourseIds
			.map((courseId) => ({ recommendation: undefined, course: getCourse(courseId) }))
			.filter((item): item is { recommendation: undefined; course: Course } => Boolean(item.course));
		const relationshipItems = teamRelationships
			.flatMap((relationship) => relationship.courses)
			.map((courseId) => ({ recommendation: undefined, course: getCourse(courseId) }))
			.filter((item): item is { recommendation: undefined; course: Course } => Boolean(item.course));

		return [...personalised, ...teamItems, ...relationshipItems].filter((item, index, list) => list.findIndex((candidate) => candidate.course.id === item.course.id) === index);
	}

	function getSkillsForCourses(courseList: Course[]) {
		const skillIds = new Set(courseList.flatMap((course) => course.develops));
		return [...skillIds].map(getSkill).filter(isSkill).slice(0, 6);
	}

	function getTerritoryStory(territory: Territory, member = selectedMember) {
		if (territory === 'Strengths') {
			return `${member.name.split(' ')[0]}'s profile already shows ${mainType.capacity}. This direction asks what mastery could look like when that natural pattern becomes more deliberate, influential and transferable.`;
		}
		if (territory === 'Stress & Growth') {
			return `${member.name.split(' ')[0]} can use pressure signals from ${stressType.number} / ${stressType.name} and growth resources from ${growthType.number} / ${growthType.name} to practise more flexible responses.`;
		}
		if (territory === 'Fortification') {
			return `This direction connects recurring challenges such as ${member.growthEdges.slice(0, 2).join(' and ').toLowerCase()} to trainable professional capabilities.`;
		}
		return `${member.name.split(' ')[0]}'s team context adds relationship and shared decision patterns, especially through ${currentTeam.name}'s pathway: ${currentTeam.pathwayName}.`;
	}

	function getRelationshipWith(teammate: Member) {
		return relationships.find((relationship) => relationship.teamId === currentTeam.id && relationship.memberIds.includes(selectedMember.id) && relationship.memberIds.includes(teammate.id));
	}

	function sharedTypeNumbers(teammate: Member) {
		return selectedMember.profile.filter((typeNumber) => teammate.profile.includes(typeNumber));
	}

	function sharedCenterNames(teammate: Member) {
		const selectedCenters = new Set(profileTypes.map((type) => type.center));
		return [...new Set(teammate.profile.map((typeNumber) => getType(typeNumber).center).filter((center) => selectedCenters.has(center)))];
	}

	function complementTypes(teammate: Member) {
		return teammate.profile.map(getType).filter((type) => !selectedMember.profile.includes(type.number)).slice(0, 2);
	}

	function overlapSummary(teammate: Member) {
		const sharedTypes = sharedTypeNumbers(teammate);
		if (sharedTypes.length) {
			return `Shared Type ${sharedTypes.join(' / ')} influence around ${sharedTypes.map((typeNumber) => getType(typeNumber).capacity).join(' and ')}.`;
		}
		const centersInCommon = sharedCenterNames(teammate);
		if (centersInCommon.length) {
			return `Shared ${centersInCommon.join(' and ')} centre emphasis, expressed through different patterns.`;
		}
		return getRelationshipWith(teammate)?.complementarity ?? 'Different profiles that can broaden the team perspective.';
	}

	function complementSummary(teammate: Member) {
		const complements = complementTypes(teammate);
		if (complements.length) {
			return `Adds ${complements.map((type) => `${type.name.toLowerCase()} (${type.capacity})`).join(' and ')}.`;
		}
		return getRelationshipWith(teammate)?.viewerNotes[selectedMember.id] ?? 'Adds a different expression of a familiar pattern.';
	}
</script>

<svelte:head>
	<title>Profile | Personality LMS Demo</title>
	<meta name="description" content="Profile page for assessment-informed development insight." />
</svelte:head>

<div class="app-shell" data-mode={mode} style={`--accent: ${selectedTheme.accent}; --accent-soft: ${selectedTheme.soft};`}>
	<header class="topbar">
		<div class="user-mark">
			<strong>{selectedMember.name}</strong>
			<span>{selectedMember.role}</span>
		</div>

		<nav class="main-nav" aria-label="Primary">
			<a href="/">Dashboard</a>
			<a class="active" href="/profile">Profile</a>
			<a href="/pathways">Pathways</a>
			<a href="/team">Team</a>
		</nav>

		<label class="member-select">
			<span>For demo purposes</span>
			<div class="select-shell">
				<select bind:value={selectedMemberId} onchange={(event) => selectMember(event.currentTarget.value)}>
					{#each members as member}
						<option value={member.id}>{member.name} / {member.profile.join('-')}</option>
					{/each}
				</select>
			</div>
		</label>

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
	</header>

	<main>
		<section class="overview-hero profile-hero">
			<div class="wheel-panel">
				<div class="profile-top-grid" aria-label="Primary profile types">
					<button class:active={selectedWheelType === profileTypes[0].number} class="profile-type-card primary-card" type="button" onmouseenter={() => (hoverWheelType = profileTypes[0].number)} onmouseleave={() => (hoverWheelType = null)} onclick={() => toggleWheelType(profileTypes[0].number)}>
						<span class="order-square">1st</span>
						<span class="type-dot" style={`--type-color: ${profileTypes[0].color};`}>{profileTypes[0].number}</span>
						<strong>{profileTypes[0].name}</strong>
					</button>

					<div class="support-type-stack">
						{#each profileTypes.slice(1) as type, index}
							<button class:active={selectedWheelType === type.number} class="profile-type-card compact-card" type="button" onmouseenter={() => (hoverWheelType = type.number)} onmouseleave={() => (hoverWheelType = null)} onclick={() => toggleWheelType(type.number)}>
								<span class="order-square">{ordinal(index + 1)}</span>
								<span class="type-dot" style={`--type-color: ${type.color};`}>{type.number}</span>
								<strong>{type.name}</strong>
							</button>
						{/each}
					</div>

					<button class:active={selectedWheelType === null} class="trifix-bubble profile-blend-card" type="button" onclick={() => (selectedWheelType = null)}>
						<span>Profile blend</span>
						<strong>{selectedMember.profile.join('-')}: {selectedMember.profileName}</strong>
					</button>
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
					<p class="lead">{selectedWheelDetail.description}</p>
					<div class="detail-meta-grid">
						<div><span>Center</span><strong>{selectedWheelDetail.center}</strong></div>
						<div><span>Score</span><strong>{selectedMember.scores[selectedWheelDetail.number]}</strong></div>
					</div>
					<div class="expression-stack">
						<div>
							<span>At its best</span>
							<p>{selectedWheelDetail.healthyExpression}</p>
						</div>
						<div>
							<span>Under pressure</span>
							<p>{selectedWheelDetail.overusedExpression}</p>
						</div>
					</div>
					<h3>Traits</h3>
					<div class="chip-list">
						{#each selectedWheelDetail.strengths as strength}<span>{strength}</span>{/each}
					</div>
				{:else}
					<div class="detail-topline">
						<p class="eyebrow">Assessment overview</p>
						<span>Profile blend</span>
					</div>
					<h1>{selectedMember.profile.join('-')}: {selectedMember.profileName}</h1>
					<p class="lead">{selectedMember.summary}</p>
					<div class="blend-summary">
						<span>{selectedMember.profile.join('-')}</span>
						<div>
							<p>{selectedMember.profileDescription}</p>
						</div>
					</div>
					<div class="profile-role-grid">
						{#each profileTypes as type, index}
							<div>
								<span>{ordinal(index)}</span>
								<strong>{type.number} / {type.name}</strong>
								<small>{type.capacity}</small>
							</div>
						{/each}
					</div>
				{/if}
			</aside>
		</section>

		<section class="main-type-section">
			<article class="panel section-intro">
				<p class="eyebrow">Main type</p>
				<h2>{mainType.name}</h2>
				<p>{mainType.description}</p>
			</article>
			{@render OperatingColumn('Healthy expression', mainType.healthyExpression, mainType.strengths, 'main')}
			{@render OperatingColumn('When overused', mainType.overusedExpression, mainType.blindSpotsDetailed, 'overuse')}
			{@render OperatingColumn('Growth direction', mainType.developmentQuestion, mainType.growthPractices, 'growth')}
		</section>

		<section class="profile-bridge-grid">
			<article class="panel connections-panel">
				<div class="panel-heading">
					<div>
						<p class="eyebrow">Connections</p>
						<h2>Stress & growth</h2>
					</div>
					<p class="muted">Anchored to {connectionAnchor.number} / {connectionAnchor.name}</p>
				</div>
				<div class="connection-map">
					<div class="connection-card growth-card">
						<span>Growth resource</span>
						<strong><i class="type-dot" style={`--type-color: ${growthType.color};`}>{growthType.number}</i>{growthType.name}</strong>
						<p>{growthType.healthyExpression}</p>
						<div class="chip-list">
							{#each growthType.growthPractices as practice}<span>{practice}</span>{/each}
						</div>
					</div>

					<div class="connection-anchor">
						<span class="type-dot" style={`--type-color: ${connectionAnchor.color};`}>{connectionAnchor.number}</span>
						<strong>{connectionAnchor.name}</strong>
						<small>{connectionAnchor.capacity}</small>
					</div>

					<div class="connection-card stress-card">
						<span>Pressure signal</span>
						<strong><i class="type-dot" style={`--type-color: ${stressType.color};`}>{stressType.number}</i>{stressType.name}</strong>
						<p>{stressType.overusedExpression}</p>
						<div class="chip-list">
							{#each stressType.strengths as strength}<span>{strength}</span>{/each}
						</div>
					</div>
				</div>
			</article>

			<article class="panel centers-panel">
				<div class="panel-heading">
					<div>
						<p class="eyebrow">Three centres</p>
						<h2>Where the profile draws from</h2>
					</div>
					<p class="muted">Your top-three profile is shown against the Body, Heart and Head structure.</p>
				</div>
				<div class="center-list">
					{#each centers as center}
						{@const profileType = profileTypeForCenter(center.name)}
						<div class:active={Boolean(profileType)}>
							<div>
								<strong>{center.name}</strong>
								<span>{center.theme}</span>
							</div>
							<div class="center-types">
								{#each center.types as typeNumber}
									{@const type = getType(typeNumber)}
									<span class:profile-hit={selectedMember.profile.includes(typeNumber)} style={`--type-color: ${type.color};`}>{typeNumber}</span>
								{/each}
							</div>
							{#if profileType}
								<p><b>{profileType.number} / {profileType.name}</b> is the strongest {center.name.toLowerCase()} pattern in this profile.</p>
							{/if}
						</div>
					{/each}
				</div>
			</article>
		</section>

		<section class="development-section panel">
			<div class="panel-heading">
				<div>
					<p class="eyebrow">Development levels</p>
					<h2>{mainType.number} / {mainType.name}</h2>
				</div>
				<p class="muted">These levels describe possible expressions of the pattern. They are not a diagnostic placement or course score.</p>
			</div>
			<div class="level-layout">
				<div class="level-ladder" aria-label="Nine development levels">
					{#each mainType.developmentLevels as level}
						<button class:active={selectedLevel === level.level} type="button" onclick={() => (selectedLevel = level.level)}>
							<span class="order-square">{level.level}</span>
							<strong>{level.title}</strong>
							<small>{level.band}</small>
						</button>
					{/each}
				</div>
				<aside class="level-detail">
					<p class="eyebrow">Level {selectedLevelDetail.level} / {selectedLevelDetail.band}</p>
					<h3>{selectedLevelDetail.title}</h3>
					<p>{selectedLevelDetail.summary}</p>
					<div class="relationship-note">
						<span>Development signal</span>
						<strong>{selectedLevelDetail.signal}</strong>
					</div>
				</aside>
			</div>
		</section>

		<section class="strength-course-grid">
			<article class="panel">
				<div class="panel-heading">
					<div>
						<p class="eyebrow">Pattern distribution</p>
						<h2>Highest to lowest</h2>
					</div>
					<p class="muted">These are assessment pattern scores, not skill scores. Select any type to inspect how that capacity may show up.</p>
				</div>
				<div class="ranked-list">
					{#each rankedTypes as type, index}
						{@const score = selectedMember.scores[type.number]}
						<button class:active={selectedPatternType === type.number} type="button" onclick={() => (selectedPatternType = type.number)}>
							<span class="rank order-square">{index + 1}</span>
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
				<p class="eyebrow">Selected pattern</p>
				<h2>{selectedPatternDetail.number} / {selectedPatternDetail.name}</h2>
				<p>{selectedPatternDetail.description}</p>
				<div class="detail-meta-grid">
					<div><span>Traditional</span><strong>{selectedPatternDetail.traditional}</strong></div>
					<div><span>Center</span><strong>{selectedPatternDetail.center}</strong></div>
				</div>
				<h3>Useful capacities</h3>
				<div class="chip-list">
					<span>{selectedPatternDetail.capacity}</span>
					{#each skillsForType(selectedPatternDetail.number) as skill}<span>{skill.name}</span>{/each}
				</div>
				<h3>Watch for</h3>
				<ul class="trait-list">
					{#each selectedPatternDetail.weaknesses as weakness}<li>{weakness}</li>{/each}
				</ul>
			</aside>
		</section>

		<section id="suggested-learning" class:expanded={selectedLearningTerritory !== null} class="learning-section panel">
			<div class="panel-heading">
				<div>
					<p class="eyebrow">Suggested learning</p>
					<h2>Development directions</h2>
				</div>
				<p class="muted">Recommendations use existing profile signals, skills, reusable courses, pathway context and team data. Assessment scores are not skill scores.</p>
			</div>

			{#if selectedLearningTerritory && selectedTerritoryCopy}
				<div class="learning-expanded">
					<nav class="territory-rail" aria-label="Development territories">
						{#each territories as territory}
							<button class:active={selectedLearningTerritory === territory} type="button" onclick={() => (selectedLearningTerritory = territory)}>
								<strong>{territoryCopy[territory].label}</strong>
								<span>{getCoursesForTerritory(territory).length} suggestions</span>
							</button>
						{/each}
						<button class="return-button" type="button" onclick={() => (selectedLearningTerritory = null)}>Return to overview</button>
					</nav>

					<article class="learning-detail">
						<p class="eyebrow">{selectedTerritoryCopy.label}</p>
						<h3>{selectedTerritoryCopy.question}</h3>
						<p>{selectedTerritoryStory}</p>

						<div class="learning-subgrid">
							<div>
								<span>Why this matters</span>
								<ul>
									{#each selectedLearningTerritory === 'Team' ? currentTeam.priorities : selectedMember.growthEdges as reason}
										<li>{reason}</li>
									{/each}
								</ul>
							</div>
							<div>
								<span>Key skills</span>
								<div class="skill-tags">
									{#each selectedTerritorySkills as skill}
										<span>{skill.name}</span>
									{/each}
								</div>
							</div>
						</div>

						<div class="pathway-strip">
							<span>Pathway / learning route</span>
							<strong>{selectedLearningTerritory === 'Team' ? currentTeam.pathwayName : selectedTerritoryCopy.pathway}</strong>
						</div>

						<div class="learning-course-list">
							{#each selectedTerritoryCourses as item, index}
								<article>
									<div class="course-index order-square">{index + 1}</div>
									<div>
										<div class="course-row-top">
											<h4>{item.course.name}</h4>
											<span>{item.course.level} / {item.course.lengthMinutes} min</span>
										</div>
										<p>{item.course.description}</p>
										<div class="skill-tags">
											{#if getSkill(item.course.develops[0])}
												<span>{getSkill(item.course.develops[0])?.name}</span>
											{/if}
											{#each item.course.develops.slice(1).map(getSkill).filter(isSkill) as skill}
												<span>{skill.name}</span>
											{/each}
										</div>
										<div class="recommendation-reason">
											<span>{item.recommendation?.priority ?? item.course.pathway}</span>
											<strong>{item.recommendation?.reason ?? (item.course.pathway === 'team' ? 'Part of the shared team learning route.' : 'Included because it supports this v3 pathway and category.')}</strong>
										</div>
									</div>
								</article>
							{/each}
						</div>
					</article>
				</div>
			{:else}
				<div class="territory-overview-grid">
					{#each territories as territory}
						{@const territoryCourses = getCoursesForTerritory(territory).slice(0, 3)}
						<button type="button" onclick={() => (selectedLearningTerritory = territory)}>
							<p class="eyebrow">{territoryCopy[territory].label}</p>
							<h3>{territoryCopy[territory].question}</h3>
							<p>{territoryCopy[territory].compact}</p>
							<div>
								{#each territoryCourses as item}
									<span>{item.course.name}</span>
								{/each}
							</div>
							<strong>Explore</strong>
						</button>
					{/each}
				</div>
			{/if}
		</section>

		<section id="team-summary" class="profile-team-summary panel">
			<div class="panel-heading">
				<div>
					<p class="eyebrow">Team summary</p>
					<h2>{currentTeam.name}</h2>
				</div>
				<p class="muted">A compact snapshot of how your profile sits within the current team mix. Detailed relationship guidance belongs in the Team area.</p>
			</div>

			<div class="team-summary-layout">
				<div class="team-roster">
					<div class="team-roster-heading">
						<strong>{teamMembers.length} members</strong>
						<span>{currentTeam.description}</span>
					</div>
					<div class="team-member-cards">
						{#each teamMembers as member}
							{@const type = getType(member.primaryType)}
							<article class:current={member.id === selectedMember.id}>
								<span class="type-dot" style={`--type-color: ${type.color};`}>{member.primaryType}</span>
								<div>
									<strong>{member.name}</strong>
									<small>{member.role}</small>
									<i>{member.profile.join('-')}: {member.profileName}</i>
								</div>
							</article>
						{/each}
					</div>
				</div>

				<div class="team-fit-panel">
					<p class="eyebrow">Your fit with the team</p>
					<div class="fit-list">
						{#each teammates as teammate}
							<article>
								<h3>{teammate.name.split(' ')[0]}</h3>
								<div>
									<span>Shared</span>
									<p>{overlapSummary(teammate)}</p>
								</div>
								<div>
									<span>Adds</span>
									<p>{complementSummary(teammate)}</p>
								</div>
							</article>
						{/each}
					</div>
				</div>
			</div>

			<div class="team-coverage-grid">
				<article>
					<p class="eyebrow">Well represented</p>
					<div class="coverage-chips">
						{#each currentTeam.strengths as strength}<span>{strength}</span>{/each}
					</div>
				</article>
				<article>
					<p class="eyebrow">Areas to watch</p>
					<div class="coverage-chips watch">
						{#each teamWatchItems as item}<span>{item}</span>{/each}
					</div>
				</article>
				<button type="button" onclick={() => (selectedLearningTerritory = 'Team')}>
					<span>Explore team development</span>
					<strong>{currentTeam.pathwayName}</strong>
				</button>
			</div>
		</section>
	</main>
</div>

{#snippet OperatingColumn(title: string, intro: string, items: string[], kind: string)}
	<article class="panel">
		<p class="eyebrow">{title}</p>
		<h2>{intro}</h2>
		<div class="expand-list">
			{#each items as item, index}
				{@const key = `${kind}-${index}`}
				<button class:open={expandedKey === key} type="button" onclick={() => toggleExpanded(key)}>
					<strong>{item}</strong>
					<i aria-hidden="true"></i>
					{#if expandedKey === key}
						<span>This connects to {mainType.name}'s broader capacity for {mainType.capacity}, and can later link into skills, reflection prompts and pathway recommendations.</span>
					{/if}
				</button>
			{/each}
		</div>
	</article>
{/snippet}
