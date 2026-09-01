<script lang="ts">
	import MemberPicker from '$lib/MemberPicker.svelte';
	import ThemeControls from '$lib/ThemeControls.svelte';
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
		type CoursePathway,
		type EnneagramType,
		type Member,
		type Recommendation,
		type Skill,
		type Territory
	} from '$lib/demo-data';
	import { themeState, themeStyle } from '$lib/theme.svelte';

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

	type HighlightedConnection = { from: number; to: number; kind: 'stress' | 'growth' };

	const pathwayDescriptions: Record<CoursePathway, string> = {
		strengths: 'Develop capabilities already associated with your strongest profile patterns, moving from natural preference toward more deliberate and advanced application.',
		'stress-growth': 'Build flexibility under pressure by recognising stress patterns, accessing growth resources and developing general resilience practices.',
		fortification: 'Broaden behavioural range by developing useful capabilities associated with type territories outside your strongest three patterns.',
		team: 'Connect personal development to colleagues, relationship dynamics and shared team capability.'
	};

	const territoryCopy: Record<Territory, { label: string; compact: string; question: string }> = {
		Strengths: {
			label: 'Strengths',
			compact: pathwayDescriptions.strengths,
			question: 'Pathway: Strengths'
		},
		'Stress & Growth': {
			label: 'Stress & Growth',
			compact: pathwayDescriptions['stress-growth'],
			question: 'Pathway: Stress & Growth'
		},
		Fortification: {
			label: 'Fortification',
			compact: pathwayDescriptions.fortification,
			question: 'Pathway: Fortification'
		},
		Team: {
			label: 'Team',
			compact: pathwayDescriptions.team,
			question: 'Pathway: Team'
		}
	};

	const territories = Object.keys(territoryCopy) as Territory[];
	const priorityRank: Record<Recommendation['priority'], number> = { primary: 0, supporting: 1, explore: 2 };
	const enneagramOrder = [9, 1, 2, 3, 4, 5, 6, 7, 8];
	const enneagramConnections = [
		[1, 4],
		[4, 2],
		[2, 8],
		[8, 5],
		[5, 7],
		[7, 1],
		[9, 3],
		[3, 6],
		[6, 9]
	] as const;

	let selectedMemberId = $state('emily');
	let selectedWheelType = $state<number | null>(null);
	let hoverWheelType = $state<number | null>(null);
	let selectedPatternType = $state<number>(9);
	let selectedLevel = $state(3);
	let selectedLearningTerritory = $state<Territory | null>(null);

	const selectedMember = $derived(members.find((member) => member.id === selectedMemberId) ?? members[0]);
	const mainType = $derived(getType(selectedMember.primaryType));
	const selectedWheelDetail = $derived(selectedWheelType ? getType(selectedWheelType) : null);
	const rankedTypes = $derived([...enneagramTypes].sort((a, b) => selectedMember.scores[b.number] - selectedMember.scores[a.number]));
	const selectedPatternDetail = $derived(getType(selectedPatternType));
	const selectedLevelDetail = $derived(mainType.developmentLevels.find((level) => level.level === selectedLevel) ?? mainType.developmentLevels[2]);
	const profileTypes = $derived(selectedMember.profile.map((typeNumber) => getType(typeNumber)));
	const connectionAnchor = $derived(selectedWheelDetail ?? mainType);
	const growthType = $derived(getType(connectionLines[connectionAnchor.number].growth));
	const stressType = $derived(getType(connectionLines[connectionAnchor.number].stress));
	const primaryStressType = $derived(getType(connectionLines[selectedMember.primaryType].stress));
	const primaryGrowthType = $derived(getType(connectionLines[selectedMember.primaryType].growth));
	const currentTeam = $derived(teams.find((team) => team.id === selectedMember.teamId) ?? teams[0]);
	const selectedTerritoryCopy = $derived(selectedLearningTerritory ? territoryCopy[selectedLearningTerritory] : null);
	const selectedTerritoryPathway = $derived(selectedLearningTerritory ? territoryToPathway[selectedLearningTerritory] : null);
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
		selectedLearningTerritory = null;
	}

	function wheelPosition(typeNumber: number) {
		const angle = typeAngle(typeNumber) * (Math.PI / 180);
		const radius = 206;
		return `--x: ${Math.cos(angle) * radius}px; --y: ${Math.sin(angle) * radius}px;`;
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

	function titleCase(value: string) {
		return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
	}

	function categoryType(course: Course) {
		const match = course.category.match(/(?:type|stress|growth)-(\d+)/);
		return match ? Number(match[1]) : undefined;
	}

	function courseMeta(course: Course) {
		return `${titleCase(course.level)} · ${course.lengthMinutes} min`;
	}

	function courseUrl(course: Course) {
		return `/courses/${course.id}?learner=${selectedMember.id}`;
	}

	function recommendationPriorityLabel(priority: Recommendation['priority']) {
		if (priority === 'primary') return 'Top recommendation';
		if (priority === 'supporting') return 'Recommended';
		return 'Explore';
	}

	function courseCategoryContext(course: Course) {
		const pathwayLabel = territoryCopy[pathwayTerritory(course.pathway)].label;
		const typeNumber = categoryType(course);
		if (typeNumber) return `${pathwayLabel} · Type ${typeNumber}`;
		if (course.pathway === 'stress-growth') {
			if (course.category.startsWith('stress-')) return `${pathwayLabel} · Pressure Practice`;
			if (course.category.startsWith('growth-')) return `${pathwayLabel} · Growth Resource`;
			return `${pathwayLabel} · Core Resilience`;
		}
		if (course.pathway === 'team') {
			if (course.category.startsWith('center-')) return `${pathwayLabel} · ${titleCase(course.category.replace('center-', ''))} Center`;
			return `${pathwayLabel} · General`;
		}
		return pathwayLabel;
	}

	function pathwayTerritory(pathway: CoursePathway): Territory {
		return territories.find((territory) => territoryToPathway[territory] === pathway) ?? 'Strengths';
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
			return `${member.name.split(' ')[0]}'s top three patterns are ${member.profile.map((typeNumber) => `Type ${typeNumber}`).join(', ')}. This pathway develops those familiar capacities into more deliberate, transferable practice.`;
		}
		if (territory === 'Stress & Growth') {
			return `${member.name.split(' ')[0]}'s Type ${member.primaryType} pattern can use pressure signals from Type ${primaryStressType.number} and growth resources from Type ${primaryGrowthType.number}, alongside general resilience practices.`;
		}
		if (territory === 'Fortification') {
			const fortificationTypes = enneagramTypes.map((type) => type.number).filter((typeNumber) => !member.profile.includes(typeNumber));
			return `This pathway looks beyond ${member.profile.map((typeNumber) => `Type ${typeNumber}`).join(', ')} into useful complementary territories: ${fortificationTypes.map((typeNumber) => `Type ${typeNumber}`).join(', ')}.`;
		}
		return `${member.name.split(' ')[0]}'s team context adds colleague patterns, relationship dynamics and shared courses from ${currentTeam.name}'s pathway: ${currentTeam.pathwayName}.`;
	}

	function whyThisMatters(territory: Territory) {
		const pathway = territoryToPathway[territory];
		const recommendedReasons = getCoursesForTerritory(territory)
			.map((item) => item.recommendation?.reason ?? item.course.recommendationContext)
			.filter(Boolean)
			.slice(0, 3);
		if (recommendedReasons.length) return recommendedReasons;
		if (territory === 'Strengths') return selectedMember.profile.map((typeNumber) => `Type ${typeNumber} is part of ${selectedMember.name.split(' ')[0]}'s strongest profile pattern.`);
		if (territory === 'Stress & Growth') return [`Primary Type ${selectedMember.primaryType} connects pressure to Type ${primaryStressType.number} and growth to Type ${primaryGrowthType.number}.`];
		if (territory === 'Team') return currentTeam.priorities.slice(0, 3);
		return courses.filter((course) => course.pathway === pathway).map((course) => course.recommendationContext).filter(Boolean).slice(0, 3);
	}

	function miniMapActiveZoneIds(territory: Territory) {
		if (territory === 'Strengths') return selectedMember.profile;
		if (territory === 'Stress & Growth') return [primaryStressType.number, primaryGrowthType.number];
		if (territory === 'Fortification') return enneagramTypes.map((type) => type.number).filter((typeNumber) => !selectedMember.profile.includes(typeNumber));
		return enneagramTypes.map((type) => type.number);
	}

	function miniMapActiveTypeIds(territory: Territory) {
		if (territory === 'Stress & Growth') return [selectedMember.primaryType, primaryStressType.number, primaryGrowthType.number];
		if (territory === 'Team') return enneagramTypes.map((type) => type.number);
		return selectedMember.profile;
	}

	function miniMapHighlightedConnections(territory: Territory): HighlightedConnection[] {
		if (territory !== 'Stress & Growth') return [];
		return [
			{ from: selectedMember.primaryType, to: primaryStressType.number, kind: 'stress' },
			{ from: selectedMember.primaryType, to: primaryGrowthType.number, kind: 'growth' }
		];
	}

	function typeAngle(typeNumber: number) {
		const index = enneagramOrder.indexOf(typeNumber);
		return -90 + index * 40;
	}

	function polarPoint(angleDeg: number, radius: number) {
		const angle = angleDeg * (Math.PI / 180);
		return { x: 50 + Math.cos(angle) * radius, y: 50 + Math.sin(angle) * radius };
	}

	function sectorPath(typeNumber: number) {
		const center = typeAngle(typeNumber);
		const start = polarPoint(center - 20, 43);
		const end = polarPoint(center + 20, 43);
		const innerEnd = polarPoint(center + 20, 15);
		const innerStart = polarPoint(center - 20, 15);
		return `M ${start.x} ${start.y} A 43 43 0 0 1 ${end.x} ${end.y} L ${innerEnd.x} ${innerEnd.y} A 15 15 0 0 0 ${innerStart.x} ${innerStart.y} Z`;
	}

	function overviewTypePoint(typeNumber: number) {
		return polarPoint(typeAngle(typeNumber), 16);
	}

	function profileWheelPoint(typeNumber: number) {
		return polarPoint(typeAngle(typeNumber), 50);
	}

	function profileConnectionClass(from: number, to: number) {
		const primary = selectedMember.primaryType;
		const stress = connectionLines[primary].stress;
		const growth = connectionLines[primary].growth;
		const connectsPrimary = from === primary || to === primary;
		const other = from === primary ? to : from;
		if (connectsPrimary && other === stress) return 'stress-line';
		if (connectsPrimary && other === growth) return 'growth-line';
		return '';
	}

	function overviewSectorClass(territory: Territory, typeNumber: number) {
		return [
			'overview-sector',
			miniMapActiveZoneIds(territory).includes(typeNumber) ? 'active-zone' : '',
			miniMapActiveTypeIds(territory).includes(typeNumber) ? 'active-type' : ''
		].filter(Boolean).join(' ');
	}

	function overviewTypeDotClass(territory: Territory, typeNumber: number) {
		return [
			'overview-type-dot',
			miniMapActiveZoneIds(territory).includes(typeNumber) ? 'active-zone' : '',
			miniMapActiveTypeIds(territory).includes(typeNumber) ? 'active-type' : ''
		].filter(Boolean).join(' ');
	}

	function overviewConnectionClass(territory: Territory, from: number, to: number) {
		const highlight = miniMapHighlightedConnections(territory).find((connection) => (connection.from === from && connection.to === to) || (connection.from === to && connection.to === from));
		return ['overview-map-line', highlight ? `connection-${highlight.kind}` : 'connection-inactive'].join(' ');
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

<div class="app-shell" data-mode={themeState.mode} style={themeStyle()}>
	<header class="topbar">
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

		<MemberPicker members={members} teams={teams} bind:value={selectedMemberId} onSelect={selectMember} />

		<ThemeControls />

		<details class="tablet-settings">
			<summary aria-label="Open display settings"><span class="settings-glyph" aria-hidden="true"></span></summary>
			<div class="tablet-settings-panel">
				<MemberPicker members={members} teams={teams} bind:value={selectedMemberId} onSelect={selectMember} />
				<ThemeControls />
			</div>
		</details>
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
					<svg class="profile-wheel-lines" viewBox="0 0 100 100" aria-hidden="true">
						<circle cx="50" cy="50" r="50" />
						{#each enneagramConnections as [from, to]}
							{@const fromPoint = profileWheelPoint(from)}
							{@const toPoint = profileWheelPoint(to)}
							<line class={profileConnectionClass(from, to)} x1={fromPoint.x} y1={fromPoint.y} x2={toPoint.x} y2={toPoint.y} />
						{/each}
					</svg>
					{#each enneagramTypes as type}
						{@const score = selectedMember.scores[type.number]}
						<button
							class:primary={selectedMember.profile.includes(type.number)}
							class:muted={!selectedMember.profile.includes(type.number)}
							class:active={selectedWheelType === type.number || hoverWheelType === type.number}
							class="wheel-node"
							type="button"
							style={`${wheelPosition(type.number)} --type-color: ${type.color};`}
							onclick={() => toggleWheelType(type.number)}
							aria-label={`${type.number} ${type.name}, score ${score}`}
						>
							<span>{type.number}</span>
						</button>
					{/each}
					<button class:active={selectedWheelType === null} class="wheel-center" type="button" onclick={() => (selectedWheelType = null)}>
						<span>{selectedMember.profileName}</span>
						<strong>{selectedMember.profile.join('-')}</strong>
					</button>
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
			{@render OperatingColumn('Healthy expression', mainType.healthyExpression, mainType.strengths)}
			{@render OperatingColumn('When overused', mainType.overusedExpression, mainType.blindSpotsDetailed)}
			{@render OperatingColumn('Growth direction', mainType.developmentQuestion, mainType.growthPractices)}
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
						<p>Useful capabilities from this connection can broaden {connectionAnchor.number}'s response range without asking the person to become another type.</p>
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
						<span>Pressure direction</span>
						<strong><i class="type-dot" style={`--type-color: ${stressType.color};`}>{stressType.number}</i>{stressType.name}</strong>
						<p>Under sustained pressure, signals associated with this connection may become more prominent. Notice the shift early rather than treating it as a fixed identity.</p>
						<div class="chip-list">
							<span>{stressType.overusedExpression}</span>
							<span>{stressType.developmentQuestion}</span>
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
								<div class="overview-map-preview compact-preview" aria-hidden="true">
									<svg viewBox="0 0 100 100" role="img">
										<circle class="overview-ring outer" cx="50" cy="50" r="43" />
										<circle class="overview-ring hub" cx="50" cy="50" r="15" />
										{#each enneagramTypes as type}
											<path class={overviewSectorClass(territory, type.number)} d={sectorPath(type.number)} style={`--sector-color: ${type.color};`} />
										{/each}
										{#each enneagramConnections as [from, to]}
											{@const fromPoint = overviewTypePoint(from)}
											{@const toPoint = overviewTypePoint(to)}
											<line class={overviewConnectionClass(territory, from, to)} x1={fromPoint.x} y1={fromPoint.y} x2={toPoint.x} y2={toPoint.y} />
										{/each}
										{#each enneagramTypes as type}
											{@const point = overviewTypePoint(type.number)}
											<circle class={overviewTypeDotClass(territory, type.number)} cx={point.x} cy={point.y} r="3.4" style={`--sector-color: ${type.color};`} />
										{/each}
									</svg>
								</div>
								<strong>{territoryCopy[territory].label}</strong>
								<span>{getCoursesForTerritory(territory).length} suggestions</span>
							</button>
						{/each}
						<button class="return-button" type="button" onclick={() => (selectedLearningTerritory = null)}>Return to overview</button>
					</nav>

					<article class="learning-detail">
						<div class="learning-detail-topline">
							<div>
								<p class="eyebrow">Pathway</p>
								<h3>{selectedTerritoryCopy.label}</h3>
							</div>
							<a href={`/pathways?area=${selectedTerritoryPathway ?? 'All'}&view=map#development-map`}>View Map</a>
						</div>
						<p>{selectedTerritoryPathway ? pathwayDescriptions[selectedTerritoryPathway] : selectedTerritoryCopy.compact}</p>
						<p>{selectedTerritoryStory}</p>

						<div class="learning-subgrid">
							<div>
								<span>Why this matters</span>
								<ul>
									{#each whyThisMatters(selectedLearningTerritory) as reason}
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
							<strong>{selectedTerritoryCopy.label}</strong>
						</div>

						<div class="learning-course-list">
							{#each selectedTerritoryCourses as item, index}
								<article>
									<div class="course-index order-square">{index + 1}</div>
									<div>
										<div class="course-row-top">
											<h4>{item.course.name}</h4>
											<span>{courseMeta(item.course)}</span>
										</div>
										<span class="course-context-label">{courseCategoryContext(item.course)}</span>
										<p>{item.course.description}</p>
										<div class="skill-tags">
											{#if getSkill(item.course.develops[0])}
												<span>{getSkill(item.course.develops[0])?.name}</span>
											{/if}
											{#each item.course.develops.slice(1, 3).map(getSkill).filter(isSkill) as skill}
												<span>{skill.name}</span>
											{/each}
										</div>
										<div class="recommendation-reason">
											<span>{item.recommendation ? recommendationPriorityLabel(item.recommendation.priority) : courseCategoryContext(item.course)}</span>
											<strong>{item.recommendation?.reason ?? (item.course.pathway === 'team' ? 'Part of the shared team learning route.' : 'Included because it supports this v3 pathway and category.')}</strong>
										</div>
										<a class="inline-course-action" href={courseUrl(item.course)}>
											{item.recommendation ? 'View course' : 'Open course'}
										</a>
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
							<div class="overview-map-preview profile-pathway-preview" aria-hidden="true">
								<svg viewBox="0 0 100 100" role="img">
									<circle class="overview-ring outer" cx="50" cy="50" r="43" />
									<circle class="overview-ring hub" cx="50" cy="50" r="15" />
									{#each enneagramTypes as type}
										<path class={overviewSectorClass(territory, type.number)} d={sectorPath(type.number)} style={`--sector-color: ${type.color};`} />
									{/each}
									{#each enneagramConnections as [from, to]}
										{@const fromPoint = overviewTypePoint(from)}
										{@const toPoint = overviewTypePoint(to)}
										<line class={overviewConnectionClass(territory, from, to)} x1={fromPoint.x} y1={fromPoint.y} x2={toPoint.x} y2={toPoint.y} />
									{/each}
									{#each enneagramTypes as type}
										{@const point = overviewTypePoint(type.number)}
										<circle class={overviewTypeDotClass(territory, type.number)} cx={point.x} cy={point.y} r="3.4" style={`--sector-color: ${type.color};`} />
									{/each}
								</svg>
							</div>
							<p class="eyebrow">Pathway</p>
							<h3>{territoryCopy[territory].label}</h3>
							<p>{territoryCopy[territory].compact}</p>
							<small>{getTerritoryStory(territory)}</small>
							<div class="territory-course-pills">
								{#each territoryCourses as item}
									<span>{item.course.name}</span>
								{/each}
							</div>
							<strong>View pathway</strong>
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

{#snippet OperatingColumn(title: string, intro: string, items: string[])}
	<article class="panel">
		<p class="eyebrow">{title}</p>
		<h2>{intro}</h2>
		<div class="expand-list">
			{#each items as item}
				<div class="static-insight-row">
					<strong>{item}</strong>
				</div>
			{/each}
		</div>
	</article>
{/snippet}
