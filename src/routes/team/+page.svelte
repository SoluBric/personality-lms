<script lang="ts">
	import {
		courses,
		enneagramTypes,
		members,
		relationships,
		teams,
		type Course,
		type EnneagramType,
		type Member,
		type Relationship,
		type Team
	} from '$lib/demo-data';

	type Lens = 'people' | 'relationships' | 'strengths' | 'watch' | 'development';

	type CoverageItem = {
		label: string;
		memberIds: string[];
		description: string;
		riskId?: string;
		courseIds?: string[];
	};

	const themes = [
		{ id: 'violet', name: 'Violet', accent: '#a78bfa', soft: '#251d3b' },
		{ id: 'teal', name: 'Teal', accent: '#2dd4bf', soft: '#102f2c' },
		{ id: 'gold', name: 'Gold', accent: '#f6c85f', soft: '#332712' },
		{ id: 'slate', name: 'Slate', accent: '#93c5fd', soft: '#172033' }
	];

	const nodePositions: Record<string, { x: number; y: number }> = {
		emily: { x: 50, y: 22 },
		james: { x: 76, y: 48 },
		sophie: { x: 50, y: 76 },
		thomas: { x: 24, y: 48 },
		sarah: { x: 34, y: 52 },
		oliver: { x: 66, y: 52 }
	};

	const contributionLabels: Record<string, string[]> = {
		emily: ['Cohesion', 'Listening', 'Preparedness'],
		james: ['Action', 'Delivery', 'Standards'],
		sophie: ['Originality', 'Possibility', 'Quality'],
		thomas: ['Analysis', 'Risk testing', 'Scenarios'],
		sarah: ['Synthesis', 'Feasibility', 'Quiet execution'],
		oliver: ['Opportunity', 'Persuasion', 'Momentum']
	};

	const coverageByTeam: Record<string, CoverageItem[]> = {
		atlas: [
			{ label: 'Relational awareness', memberIds: ['emily'], description: 'Emily tends to notice cohesion, inclusion and stakeholder impact.' },
			{ label: 'Decisive action', memberIds: ['james'], description: 'James brings closure, momentum and willingness to confront hard issues.' },
			{ label: 'Creative exploration', memberIds: ['sophie'], description: 'Sophie protects originality, meaning and design quality.' },
			{ label: 'Analytical depth', memberIds: ['thomas'], description: 'Thomas tests assumptions and creates scenario clarity.' },
			{ label: 'Quality orientation', memberIds: ['james', 'sophie'], description: 'James and Sophie both care about standards, though they may define quality differently.' },
			{ label: 'Risk awareness', memberIds: ['emily', 'thomas'], description: 'Emily notices relational risk; Thomas notices analytical and delivery risk.' },
			{ label: 'Delivery energy', memberIds: ['james', 'sophie'], description: 'Momentum and completion become strongest when closure and creative commitment reinforce each other.' }
		],
		beacon: [
			{ label: 'Opportunity recognition', memberIds: ['oliver'], description: 'Oliver spots commercial possibility and creates external momentum.' },
			{ label: 'Persuasion and momentum', memberIds: ['oliver'], description: 'Oliver naturally moves conversations toward interest and action.' },
			{ label: 'Synthesis', memberIds: ['sarah'], description: 'Sarah turns complexity into a calmer operational view.' },
			{ label: 'Feasibility', memberIds: ['sarah'], description: 'Sarah notices constraints, delivery reality and implementation structure.' },
			{ label: 'Operational judgement', memberIds: ['sarah', 'oliver'], description: 'Both are outcome-oriented, but Sarah emphasises feasibility while Oliver emphasises opportunity.' }
		]
	};

	const watchByTeam: Record<string, CoverageItem[]> = {
		atlas: [
			{ label: 'Speed versus deliberation', memberIds: ['james', 'thomas', 'sophie'], description: 'James may want closure while Thomas wants further analysis and Sophie wants further exploration.', courseIds: ['C10', 'C11', 'C13'] },
			{ label: 'Harmony versus productive disagreement', memberIds: ['emily', 'james'], description: 'Visible conflict can reduce exactly when the team needs useful differences to become explicit.', courseIds: ['C04', 'C06', 'C08', 'C20'] },
			{ label: 'Exploration versus completion', memberIds: ['sophie', 'thomas', 'james'], description: 'Creative and analytical expansion can delay commitment while delivery pressure increases.', courseIds: ['C12', 'C14', 'C19'] },
			{ label: 'Unequal airtime', memberIds: ['james', 'emily', 'thomas'], description: 'Fast confidence can unintentionally dominate people who process before speaking.', courseIds: ['C08', 'C20'] },
			{ label: 'Hidden disagreement', memberIds: ['emily', 'thomas', 'james'], description: 'A meeting can appear more aligned than it actually is.', courseIds: ['C06', 'C22'] }
		],
		beacon: [
			{ label: 'Commitment before challenge', memberIds: ['oliver', 'sarah'], description: 'Oliver can create external momentum before Sarah has made reservations visible.', courseIds: ['C08', 'C18'] },
			{ label: 'Late braking', memberIds: ['sarah', 'oliver'], description: 'Sarah may constrain something Oliver already considers active.', courseIds: ['C04', 'C10'] },
			{ label: 'Unequal visibility', memberIds: ['oliver', 'sarah'], description: "Oliver's contribution is externally visible while Sarah's may stay hidden until implementation.", courseIds: ['C18', 'C21'] },
			{ label: 'Expansion versus capacity', memberIds: ['oliver', 'sarah'], description: 'New possibilities can outrun the small team’s actual delivery capacity.', courseIds: ['C12', 'C19'] }
		]
	};

	const stageCopy: Record<string, Record<string, string>> = {
		atlas: {
			C08: 'Create explicit space for reservations, alternative ideas and analytical concerns before moving toward closure.',
			C06: 'Normalise disagreement as useful information rather than a sign that the team is failing to align.',
			C10: 'Give the team a common language for deciding when there is enough information to act.',
			C20: 'Prevent domination or avoidance while synthesising different perspectives.',
			C22: 'Make dissent visible before closure and commitment explicit afterward.'
		},
		beacon: {
			C21: 'Turn persuasion into consultation and clarify the real stakeholder need.',
			C12: 'Make new opportunities compete explicitly with existing commitments.',
			C10: 'Create a shared threshold for when an opportunity has been tested enough.',
			C19: 'Connect ambition to capacity, completion and credibility.',
			C22: 'Formalise a repeatable rhythm for challenge, decision and commitment.'
		}
	};

	const lensOptions: { id: Lens; label: string }[] = [
		{ id: 'people', label: 'People' },
		{ id: 'relationships', label: 'Relationships' },
		{ id: 'strengths', label: 'Team Strengths' },
		{ id: 'watch', label: 'Areas to Watch' },
		{ id: 'development', label: 'Development' }
	];

	let selectedMemberId = $state('emily');
	let selectedColleagueId = $state('james');
	let perspectiveMemberId = $state('emily');
	let mode = $state<'dark' | 'light'>('dark');
	let themeId = $state('violet');
	let lens = $state<Lens>('relationships');
	let selectedCoverageId = $state('Relational awareness');
	let selectedWatchId = $state('Harmony versus productive disagreement');

	const selectedMember = $derived(members.find((member) => member.id === selectedMemberId) ?? members[0]);
	const selectedTheme = $derived(themes.find((theme) => theme.id === themeId) ?? themes[0]);
	const currentTeam = $derived(getTeam(selectedMember.teamId));
	const teamMembers = $derived(currentTeam.memberIds.map(getMember).filter(isMember));
	const colleagues = $derived(teamMembers.filter((member) => member.id !== selectedMember.id));
	const selectedColleague = $derived(colleagues.find((member) => member.id === selectedColleagueId) ?? colleagues[0] ?? selectedMember);
	const selectedRelationship = $derived(getRelationship(selectedMember.id, selectedColleague.id, currentTeam.id));
	const perspectiveMember = $derived(getMember(perspectiveMemberId) ?? selectedMember);
	const selectedPerspectiveNote = $derived(selectedRelationship?.viewerNotes[perspectiveMember.id] ?? selectedRelationship?.theme ?? '');
	const teamRelationships = $derived(relationships.filter((relationship) => relationship.teamId === currentTeam.id));
	const selectedCoverage = $derived((coverageByTeam[currentTeam.id] ?? [])[0] && ((coverageByTeam[currentTeam.id] ?? []).find((item) => item.label === selectedCoverageId) ?? (coverageByTeam[currentTeam.id] ?? [])[0]));
	const selectedWatch = $derived((watchByTeam[currentTeam.id] ?? [])[0] && ((watchByTeam[currentTeam.id] ?? []).find((item) => item.label === selectedWatchId) ?? (watchByTeam[currentTeam.id] ?? [])[0]));
	const sharedCourses = $derived((selectedRelationship?.courses ?? []).map(getCourse).filter(isCourse));
	const primarySharedCourse = $derived(sharedCourses[0]);
	const teamPathwayCourses = $derived(currentTeam.pathwayCourseIds.map(getCourse).filter(isCourse));
	const highlightedMemberIds = $derived(getHighlightedMemberIds());

	$effect(() => {
		if (!currentTeam.memberIds.includes(selectedMemberId)) return;
		if (!colleagues.some((member) => member.id === selectedColleagueId)) {
			selectedColleagueId = colleagues[0]?.id ?? selectedMember.id;
		}
		if (!currentTeam.memberIds.includes(perspectiveMemberId)) {
			perspectiveMemberId = selectedMember.id;
		}
		if (!(coverageByTeam[currentTeam.id] ?? []).some((item) => item.label === selectedCoverageId)) {
			selectedCoverageId = coverageByTeam[currentTeam.id]?.[0]?.label ?? '';
		}
		if (!(watchByTeam[currentTeam.id] ?? []).some((item) => item.label === selectedWatchId)) {
			selectedWatchId = watchByTeam[currentTeam.id]?.[0]?.label ?? '';
		}
	});

	function getTeam(teamId: string): Team {
		return teams.find((team) => team.id === teamId) ?? teams[0];
	}

	function getMember(memberId: string) {
		return members.find((member) => member.id === memberId);
	}

	function isMember(member: Member | undefined): member is Member {
		return Boolean(member);
	}

	function getType(typeNumber: number): EnneagramType {
		return enneagramTypes.find((type) => type.number === typeNumber) ?? enneagramTypes[0];
	}

	function getCourse(courseId: string) {
		return courses.find((course) => course.id === courseId);
	}

	function isCourse(course: Course | undefined): course is Course {
		return Boolean(course);
	}

	function getRelationship(firstId: string, secondId: string, teamId: string) {
		return relationships.find((relationship) => relationship.teamId === teamId && relationship.memberIds.includes(firstId) && relationship.memberIds.includes(secondId));
	}

	function selectMember(memberId: string) {
		selectedMemberId = memberId;
		const nextMember = members.find((member) => member.id === memberId) ?? members[0];
		const nextTeam = getTeam(nextMember.teamId);
		const nextColleague = nextTeam.memberIds.find((id) => id !== nextMember.id) ?? nextMember.id;
		selectedColleagueId = nextColleague;
		perspectiveMemberId = nextMember.id;
		selectedCoverageId = coverageByTeam[nextTeam.id]?.[0]?.label ?? '';
		selectedWatchId = watchByTeam[nextTeam.id]?.[0]?.label ?? '';
	}

	function selectColleague(memberId: string) {
		selectedColleagueId = memberId;
		perspectiveMemberId = selectedMember.id;
		lens = 'relationships';
	}

	function memberPosition(member: Member) {
		const position = nodePositions[member.id] ?? { x: 50, y: 50 };
		return `--x: ${position.x}%; --y: ${position.y}%; --type-color: ${getType(member.primaryType).color};`;
	}

	function sharedTypeNumbers(member: Member) {
		return selectedMember.profile.filter((typeNumber) => member.profile.includes(typeNumber));
	}

	function sharedCenterNames(member: Member) {
		const selectedCenters = new Set(selectedMember.profile.map((typeNumber) => getType(typeNumber).center));
		return [...new Set(member.profile.map((typeNumber) => getType(typeNumber).center).filter((center) => selectedCenters.has(center)))];
	}

	function overlapSummary(member: Member) {
		const sharedTypes = sharedTypeNumbers(member);
		if (sharedTypes.length) return `Shared Type ${sharedTypes.join(' / ')} influence.`;
		const centers = sharedCenterNames(member);
		if (centers.length) return `Shared ${centers.join(' and ')} centre emphasis, expressed through different patterns.`;
		return getRelationship(selectedMember.id, member.id, currentTeam.id)?.complementarity ?? 'Different working orientations.';
	}

	function practicalPrompt(relationship: Relationship | undefined, viewer: Member) {
		if (!relationship) return 'Select a colleague to inspect a working relationship.';
		const note = relationship.viewerNotes[viewer.id] ?? relationship.theme;
		if (viewer.id === selectedMember.id) return note;
		return note;
	}

	function getHighlightedMemberIds() {
		if (lens === 'strengths' && selectedCoverage) return selectedCoverage.memberIds;
		if (lens === 'watch' && selectedWatch) return selectedWatch.memberIds;
		if (lens === 'relationships') return [selectedMember.id, selectedColleague.id];
		return [selectedMember.id];
	}
</script>

<svelte:head>
	<title>Team | Personality LMS Demo</title>
	<meta name="description" content="Team relationship and shared development view." />
</svelte:head>

<div class="app-shell" data-mode={mode} style={`--accent: ${selectedTheme.accent}; --accent-soft: ${selectedTheme.soft};`}>
	<header class="topbar">
		<div class="user-mark">
			<strong>{selectedMember.name}</strong>
			<span>{selectedMember.role}</span>
		</div>

		<nav class="main-nav" aria-label="Primary">
			<a href="/">Dashboard</a>
			<a href="/profile">Profile</a>
			<a href="/pathways">Pathways</a>
			<a class="active" href="/team">Team</a>
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
		<section class="team-dashboard panel">
			<div>
				<p class="eyebrow">Team</p>
				<h1>{currentTeam.name}</h1>
				<p>{currentTeam.description}</p>
			</div>
			<div class="team-kpis">
				<div><span>Members</span><strong>{teamMembers.length}</strong></div>
				<div><span>Pair routes</span><strong>{teamRelationships.length}</strong></div>
				<div><span>Shared pathway</span><strong>{teamPathwayCourses.length} stages</strong></div>
			</div>
		</section>

		<section class="team-map-section panel">
			<div class="panel-heading map-heading">
				<div>
					<p class="eyebrow">Team system</p>
					<h2>{lensOptions.find((option) => option.id === lens)?.label}</h2>
				</div>
				<nav class="map-filter" aria-label="Team view lens">
					{#each lensOptions as option}
						<button class:active={lens === option.id} type="button" onclick={() => (lens = option.id)}>{option.label}</button>
					{/each}
				</nav>
			</div>

			<div class="team-map-layout">
				<div class="team-network" aria-label={`${currentTeam.name} relationship map`}>
					<svg class="team-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
						{#each teamRelationships as relationship}
							{@const first = getMember(relationship.memberIds[0])}
							{@const second = getMember(relationship.memberIds[1])}
							{#if first && second}
								<line
									class:active={selectedRelationship?.id === relationship.id || lens === 'relationships'}
									x1={nodePositions[first.id]?.x ?? 50}
									y1={nodePositions[first.id]?.y ?? 50}
									x2={nodePositions[second.id]?.x ?? 50}
									y2={nodePositions[second.id]?.y ?? 50}
								/>
							{/if}
						{/each}
					</svg>
					<div class="team-center">
						<span>{currentTeam.name}</span>
						<strong>{currentTeam.pathwayName}</strong>
					</div>
					{#each teamMembers as member}
						<button
							class:me={member.id === selectedMember.id}
							class:selected={member.id === selectedColleague.id}
							class:highlighted={highlightedMemberIds.includes(member.id)}
							class="member-node"
							type="button"
							style={memberPosition(member)}
							onclick={() => member.id !== selectedMember.id && selectColleague(member.id)}
						>
							<i>{member.id === selectedMember.id ? 'Me' : member.profile.join('-')}</i>
							<span class="type-dot" style={`--type-color: ${getType(member.primaryType).color};`}>{member.primaryType}</span>
							<strong>{member.name}</strong>
							<small>{member.role}</small>
						</button>
					{/each}
				</div>

				<aside class="relationship-panel">
					{#if selectedRelationship}
						<p class="eyebrow">How we relate</p>
						<h2>{selectedMember.name.split(' ')[0]} + {selectedColleague.name.split(' ')[0]}</h2>
						<div class="perspective-toggle">
							<button class:active={perspectiveMemberId === selectedMember.id} type="button" onclick={() => (perspectiveMemberId = selectedMember.id)}>Your lens</button>
							<button class:active={perspectiveMemberId === selectedColleague.id} type="button" onclick={() => (perspectiveMemberId = selectedColleague.id)}>{selectedColleague.name.split(' ')[0]}'s lens</button>
						</div>
						<div class="relationship-focus">
							<span>{perspectiveMember.name}'s view</span>
							<strong>{selectedPerspectiveNote}</strong>
						</div>
						<div class="relation-grid">
							<div>
								<span>What I bring</span>
								<strong>{contributionLabels[selectedMember.id]?.join(' / ')}</strong>
							</div>
							<div>
								<span>What they bring</span>
								<strong>{contributionLabels[selectedColleague.id]?.join(' / ')}</strong>
							</div>
							<div>
								<span>Overlap</span>
								<strong>{overlapSummary(selectedColleague)}</strong>
							</div>
							<div>
								<span>Complement</span>
								<strong>{selectedRelationship.complementarity}</strong>
							</div>
						</div>
						<div class="friction-loop">
							<p class="eyebrow">Watch for</p>
							<h3>{selectedRelationship.theme}</h3>
							<div>
								<span>{selectedRelationship.friction}</span>
								<i></i>
								<span>{practicalPrompt(selectedRelationship, perspectiveMember)}</span>
							</div>
						</div>
						{#if primarySharedCourse}
							<div class="context-course">
								<span>Contextual learning</span>
								<strong>{primarySharedCourse.title}</strong>
								<p>{primarySharedCourse.description}</p>
								<small>This appears here because the relationship theme is {selectedRelationship.theme.toLowerCase()}.</small>
							</div>
						{/if}
					{:else}
						<p class="eyebrow">Team view</p>
						<h2>Select a colleague</h2>
						<p>Choose a member node to inspect complementarity, possible friction and perspective-specific guidance.</p>
					{/if}
				</aside>
			</div>
		</section>

		<section class="team-coverage-section">
			<article class="panel">
				<div class="panel-heading">
					<div>
						<p class="eyebrow">Team coverage</p>
						<h2>What this mix helps the team notice</h2>
					</div>
					<p class="muted">Select a capability to highlight contributing members in the team map.</p>
				</div>
				<div class="coverage-list">
					{#each coverageByTeam[currentTeam.id] ?? [] as item}
						<button class:active={selectedCoverage?.label === item.label} type="button" onclick={() => { selectedCoverageId = item.label; lens = 'strengths'; }}>
							<strong>{item.label}</strong>
							<span>{item.memberIds.map((id) => getMember(id)?.name.split(' ')[0]).join(' + ')}</span>
						</button>
					{/each}
				</div>
				{#if selectedCoverage}
					<div class="coverage-detail">
						<span>{selectedCoverage.memberIds.map((id) => getMember(id)?.name.split(' ')[0]).join(' + ')}</span>
						<strong>{selectedCoverage.description}</strong>
					</div>
				{/if}
			</article>

			<article class="panel">
				<div class="panel-heading">
					<div>
						<p class="eyebrow">Areas to watch</p>
						<h2>Dynamics to manage deliberately</h2>
					</div>
					<p class="muted">These are coordination patterns, not deficits or scores.</p>
				</div>
				<div class="coverage-list watch-list">
					{#each watchByTeam[currentTeam.id] ?? [] as item}
						<button class:active={selectedWatch?.label === item.label} type="button" onclick={() => { selectedWatchId = item.label; lens = 'watch'; }}>
							<strong>{item.label}</strong>
							<span>{item.memberIds.map((id) => getMember(id)?.name.split(' ')[0]).join(' + ')}</span>
						</button>
					{/each}
				</div>
				{#if selectedWatch}
					<div class="coverage-detail">
						<span>{selectedWatch.memberIds.map((id) => getMember(id)?.name.split(' ')[0]).join(' + ')}</span>
						<strong>{selectedWatch.description}</strong>
						<div class="mini-list">
							{#each selectedWatch.courseIds?.map(getCourse).filter(isCourse) ?? [] as course}
								<button type="button">{course.title}</button>
							{/each}
						</div>
					</div>
				{/if}
			</article>
		</section>

		<section class="team-pathway panel">
			<div class="panel-heading">
				<div>
					<p class="eyebrow">Shared team development</p>
					<h2>{currentTeam.pathwayName}</h2>
				</div>
				<p class="muted">The same course can matter personally, relationally and at team level. This section keeps the reason tied to the team pathway.</p>
			</div>
			<div class="team-pathway-line">
				{#each teamPathwayCourses as course, index}
					<article>
						<span class="order-square">{index + 1}</span>
						<div>
							<small>Stage {index + 1}</small>
							<h3>{course.title}</h3>
							<p>{stageCopy[currentTeam.id]?.[course.id] ?? course.description}</p>
							<div class="pathway-badges">
								{#if selectedMember.pathwayCourseIds.includes(course.id)}<span>Personal</span>{/if}
								{#if sharedCourses.some((sharedCourse) => sharedCourse.id === course.id)}<span>Relationship</span>{/if}
								<span>Team</span>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</section>
	</main>
</div>
