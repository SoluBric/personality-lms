<script lang="ts">
	import {
		courses,
		enneagramTypes,
		learnerCourseStates,
		members,
		pathwayToTerritory,
		relationships,
		recommendations,
		skills,
		teams,
		territoryToPathway,
		type Course,
		type CoursePathway,
		type EnneagramType,
		type LearnerCourseState,
		type Member,
		type Recommendation,
		type Skill,
		type Territory
	} from '$lib/demo-data';

	type FocusMode = 'current' | 'suggested';
	type FilterMode = 'All' | CoursePathway;
	type SharedMapPathway = 'strengths' | 'stress-growth' | 'fortification';
	type NodeKind = 'profile' | 'territory' | 'signal' | 'skill' | 'course' | 'pathway' | 'team' | 'person';
	type RadialBand = 'inner' | 'middle' | 'outer';
	type MapPoint = { x: number; y: number };
	type ChainSegment = { id: string; from: MapPoint; to: MapPoint; selected: boolean };
	type HighlightedConnection = { from: number; to: number; kind: 'stress' | 'growth' | 'profile' };
	type TeamTypeArc = { id: string; typeNumber: number; rank: 1 | 2 | 3; offset: number; path: string };
	type MapState = {
		activeTypeIds: number[];
		activeZoneIds: number[];
		highlightedConnections: HighlightedConnection[];
		courses: Course[];
		generalCourses: Course[];
	};
	type MapRole =
		| 'Foundation'
		| 'Strength Mastery'
		| 'Growth Resource'
		| 'Fortification'
		| 'Type Perspective'
		| 'Collaboration'
		| 'Shared Team Learning'
		| 'Team Member'
		| 'Core Resilience'
		| 'Pressure Practice'
		| 'Center Collaboration'
		| 'Profile Origin'
		| 'Territory';

	type Node = {
		id: string;
		kind: NodeKind;
		title: string;
		label: string;
		detail: string;
		role?: MapRole;
		typeNumber?: number;
		band?: RadialBand;
		members?: string[];
		territory?: Territory;
		skillIds?: string[];
		courseIds?: string[];
		meta?: string;
		status?: string;
		weight?: number;
		connectedObjectIds?: string[];
		x: number;
		y: number;
	};

	type InspectorMeta = { label: string; value: string };
	type InspectorAction = { label: string; courseId?: string };
	type InspectorBlock = {
		id: string;
		label: string;
		kind: 'text' | 'chips' | 'courses' | 'meta' | 'status' | 'progression';
		text?: string;
		items?: string[];
		skills?: Skill[];
		courses?: Course[];
		meta?: InspectorMeta[];
		action?: InspectorAction;
	};
	type InspectorView = {
		eyebrow: string;
		title: string;
		description: string;
		badge?: string;
		blocks: InspectorBlock[];
		action?: InspectorAction;
	};
	type DevelopmentView = 'map' | 'list';
	type CourseListGroup = {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		context?: string;
		relevantMembers?: Member[];
		courses: Course[];
	};

	const themes = [
		{ id: 'violet', name: 'Violet', accent: '#a78bfa', soft: '#251d3b' },
		{ id: 'teal', name: 'Teal', accent: '#2dd4bf', soft: '#102f2c' },
		{ id: 'gold', name: 'Gold', accent: '#f6c85f', soft: '#332712' },
		{ id: 'slate', name: 'Slate', accent: '#93c5fd', soft: '#172033' }
	];

	const pathwayCopy: Record<CoursePathway, { label: string; short: string }> = {
		strengths: { label: 'Strengths', short: 'Extend natural capability into deliberate mastery.' },
		'stress-growth': { label: 'Stress & Growth', short: 'Build flexibility when pressure changes the pattern.' },
		fortification: { label: 'Fortification', short: 'Build capability in less familiar operating patterns.' },
		team: { label: 'Team', short: 'Connect personal growth to shared collaboration needs.' }
	};

	const filters: FilterMode[] = ['All', 'strengths', 'stress-growth', 'fortification', 'team'];
	const pathways = Object.keys(pathwayCopy) as CoursePathway[];
	const enneagramOrder = [9, 1, 2, 3, 4, 5, 6, 7, 8];
	const wheelTypes = enneagramOrder.map(getType);
	const sharedMapPathways: SharedMapPathway[] = ['strengths', 'stress-growth', 'fortification'];
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
	const radialBands: Record<RadialBand, number> = { inner: 28, middle: 38, outer: 47 };
	const strengthRadialBands: Record<RadialBand, number> = { inner: 31, middle: 40, outer: 48 };
	const sharedEnneagramRadius = 16;
	const strengthCourseLaneAngles = [-6.5, 6.5, -12, 12, 0];
	const typeTerritories: Record<number, string> = {
		1: 'Standards & disciplined improvement',
		2: 'Support & relational influence',
		3: 'Agency & achievement',
		4: 'Creative identity & contribution',
		5: 'Analysis & strategic depth',
		6: 'Preparedness & calibrated risk',
		7: 'Possibility & experimentation',
		8: 'Directness & protective agency',
		9: 'Integration & facilitative cohesion'
	};

	const skillRelations = [
		{ from: ['SK01', 'SK02'], to: 'SK16', label: 'self-awareness + regulation support constructive conflict' },
		{ from: ['SK06', 'SK07'], to: 'SK16', label: 'listening + assertion build constructive conflict' },
		{ from: ['SK06', 'SK16'], to: 'SK17', label: 'listening + conflict build facilitation' },
		{ from: ['SK13', 'SK03'], to: 'SK12', label: 'risk judgement + prioritisation support uncertainty decisions' },
		{ from: ['SK12', 'SK14'], to: 'SK04', label: 'decision thresholds + iteration support follow-through' },
		{ from: ['SK10', 'SK06'], to: 'SK18', label: 'communication + listening build influence' },
		{ from: ['SK15', 'SK18'], to: 'SK17', label: 'empowerment + influence support group integration' },
		{ from: ['SK11', 'SK10'], to: 'SK18', label: 'stakeholder trust + clear messaging support influence' }
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

	let selectedMemberId = $state('emily');
	let mode = $state<'dark' | 'light'>('dark');
	let themeId = $state('violet');
	let focusMode = $state<FocusMode>('current');
	let developmentView = $state<DevelopmentView>('map');
	let selectedArea = $state<FilterMode | null>('All');
	let selectedNodeId = $state<string | null>(null);

	const selectedMember = $derived(members.find((member) => member.id === selectedMemberId) ?? members[0]);
	const selectedTheme = $derived(themes.find((theme) => theme.id === themeId) ?? themes[0]);
	const currentTeam = $derived(teams.find((team) => team.id === selectedMember.teamId) ?? teams[0]);
	const primaryType = $derived(getType(selectedMember.primaryType));
	const profileTypes = $derived(selectedMember.profile.map(getType));
	const stressType = $derived(getType(connectionLines[selectedMember.primaryType].stress));
	const growthType = $derived(getType(connectionLines[selectedMember.primaryType].growth));
	const memberRecommendations = $derived(recommendations.filter((recommendation) => recommendation.learnerId === selectedMember.id));
	const memberCourseStates = $derived(learnerCourseStates.filter((state) => state.learnerId === selectedMember.id));
	const activeCourseStates = $derived(memberCourseStates.filter((state) => state.status !== 'not-started'));
	const activeCourses = $derived(activeCourseStates.map((state) => getCourse(state.courseId)).filter(isCourse));
	const recommendedCourses = $derived(getRecommendedCourses(selectedMember));
	const suggestedCourses = $derived(recommendedCourses.filter((item) => !activeCourseStates.some((state) => state.courseId === item.course.id)).slice(0, 5));
	const activeSkills = $derived(getSkillsForCourses(activeCourses));
	const relationshipRoutes = $derived(relationships.filter((relationship) => relationship.teamId === currentTeam.id && relationship.memberIds.includes(selectedMember.id)));
	const teamCourses = $derived(currentTeam.pathwayCourseIds.map(getCourse).filter(isCourse));
	const currentTeamMembers = $derived(currentTeam.memberIds.map(getMember).filter(isMember));
	const sharedMapState = $derived(buildSharedMapState());
	const mapNodes = $derived(buildMapNodes());
	const visibleNodes = $derived(mapNodes);
	const displayedMapNodes = $derived(selectedArea === 'team' ? visibleNodes.filter((node) => node.kind !== 'person') : visibleNodes);
	const selectedNode = $derived(selectedNodeId ? mapNodes.find((node) => node.id === selectedNodeId) : undefined);
	const selectedCourse = $derived(
		selectedNode?.kind === 'course' && selectedNode.courseIds?.[0]
			? getCourse(selectedNode.courseIds[0])
			: selectedNodeId?.startsWith('course-')
				? getCourse(selectedNodeId.replace('course-', ''))
				: undefined
	);
	const selectedSkill = $derived(selectedNode?.kind === 'skill' && selectedNode.skillIds?.[0] ? getSkill(selectedNode.skillIds[0]) : undefined);
	const activeSectorTypes = $derived(getActiveSectorTypes());
	const activeZoneTypes = $derived(getActiveZoneTypes());
	const usesSharedEnneagramMap = $derived(isSharedMapPathway(selectedArea));
	const usesEnneagramCore = $derived(usesSharedEnneagramMap || selectedArea === 'team');
	const showWheel = $derived(selectedArea !== null && selectedArea !== 'All');
	const courseChainSegments = $derived(buildCourseChainSegments());
	const teamTypeArcs = $derived(buildTeamTypeArcs());
	const completedCourses = $derived(activeCourseStates.filter((state) => state.status === 'completed'));
	const inProgressCourses = $derived(activeCourseStates.filter((state) => state.status === 'in-progress'));
	const selectedTerritoryLabel = $derived(selectedArea === null ? 'Profile origin' : selectedArea === 'All' ? 'Development atlas' : pathwayCopy[selectedArea].label);
	const areaGuide = $derived(getAreaGuide());
	const inspectorView = $derived(buildInspectorView());
	const currentListGroups = $derived(buildCourseListGroups());

	function getType(typeNumber: number): EnneagramType {
		return enneagramTypes.find((type) => type.number === typeNumber) ?? enneagramTypes[0];
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

	function isCourse(course: Course | undefined): course is Course {
		return Boolean(course);
	}

	function getSkill(skillId: string) {
		return skills.find((skill) => skill.id === skillId);
	}

	function isSkill(skill: Skill | undefined): skill is Skill {
		return Boolean(skill);
	}

	function isSharedMapPathway(area: FilterMode | null): area is SharedMapPathway {
		return Boolean(area && sharedMapPathways.includes(area as SharedMapPathway));
	}

	function getRecommendedCourses(member: Member) {
		return recommendations
			.filter((recommendation) => recommendation.learnerId === member.id)
			.map((recommendation) => ({ recommendation, course: getCourse(recommendation.courseId) }))
			.filter((item): item is { recommendation: Recommendation; course: Course } => Boolean(item.course));
	}

	function getCourseState(courseId: string): LearnerCourseState | undefined {
		return memberCourseStates.find((state) => state.courseId === courseId);
	}

	function getSkillsForCourses(courseList: Course[]) {
		const skillIds = new Set(courseList.flatMap((course) => course.develops));
		return [...skillIds].map(getSkill).filter(isSkill);
	}

	function courseSkills(course: Course) {
		return course.develops.map(getSkill).filter(isSkill);
	}

	function coursesForSkill(skillId: string) {
		return courses.filter((course) => course.develops.includes(skillId));
	}

	function recommendationForCourse(courseId: string) {
		return memberRecommendations.find((recommendation) => recommendation.courseId === courseId);
	}

	function selectMember(memberId: string) {
		selectedMemberId = memberId;
		selectedArea = 'All';
		selectedNodeId = null;
	}

	function selectNode(nodeId: string) {
		if (nodeId === 'profile') {
			selectedArea = null;
		}
		const pathwayNode = mapNodes.find((node) => node.id === nodeId && node.kind === 'territory');
		if (pathwayNode?.territory) {
			selectedArea = territoryToPathway[pathwayNode.territory];
			selectedNodeId = null;
			return;
		}
		selectedNodeId = nodeId;
	}

	function canSelectNode(node: Node) {
		if (usesEnneagramCore && node.kind === 'profile') return false;
		if (usesEnneagramCore && node.kind === 'signal') {
			if (!node.typeNumber) return false;
			if (selectedArea === 'team') return activeZoneTypes.includes(node.typeNumber);
			if (selectedArea === 'fortification') return sharedMapState.activeZoneIds.includes(node.typeNumber);
			return sharedMapState.activeTypeIds.includes(node.typeNumber) || sharedMapState.activeZoneIds.includes(node.typeNumber);
		}
		return true;
	}

	function clearMapSelection() {
		selectedNodeId = null;
	}

	function focusCourse(mode: FocusMode, courseId: string) {
		focusMode = mode;
		selectedArea = getCourse(courseId)?.pathway ?? selectedArea;
		selectedNodeId = `course-${courseId}`;
	}

	function isNodeVisible(nodeId: string) {
		return visibleNodes.some((node) => node.id === nodeId);
	}

	function nodeClass(node: Node) {
		const classes = ['map-node', `node-${node.kind}`];
		if (!canSelectNode(node)) classes.push('non-interactive-node');
		if (node.kind === 'course') {
			classes.push(`course-${courseNodeStatusKind(node)}`);
		}
		if (usesEnneagramCore && node.typeNumber) {
			const rank = selectedMember.profile.indexOf(node.typeNumber);
			const isActiveType = activeSectorTypes.includes(node.typeNumber);
			const isActiveZone = activeZoneTypes.includes(node.typeNumber);
			classes.push(isActiveType ? 'active-type-node' : 'inactive-type-node');
			classes.push(isActiveZone ? 'active-zone-node' : 'inactive-zone-node');
			if (usesSharedEnneagramMap && rank === 0) classes.push('primary-type-node');
			if (usesSharedEnneagramMap && rank === 1) classes.push('secondary-type-node');
			if (usesSharedEnneagramMap && rank === 2) classes.push('tertiary-type-node');
			if (selectedNode?.kind === 'signal' && selectedNode.typeNumber !== node.typeNumber) classes.push('off-selected-type');
		}
		if (node.kind === 'course' || node.kind === 'skill') {
			if (node.x < 24) classes.push('expand-right');
			if (node.x > 76) classes.push('expand-left');
			if (node.y < 28) classes.push('expand-down');
		}
		return classes.join(' ');
	}

	function nodeStyle(node: Node) {
		const type = node.typeNumber ? getType(node.typeNumber) : undefined;
		return [`--x: ${node.x}%`, `--y: ${node.y}%`, type ? `--type-color: ${type.color}` : ''].filter(Boolean).join('; ');
	}

	function selectArea(area: FilterMode) {
		selectedArea = area;
		selectedNodeId = null;
	}

	function selectDevelopmentView(view: DevelopmentView) {
		developmentView = view;
	}

	function titleFor(course: Course) {
		return course.name;
	}

	function levelLabel(course: Course) {
		return course.level.replace('-', ' ');
	}

	function courseMeta(course: Course) {
		return `${levelLabel(course)} / ${course.lengthMinutes} min`;
	}

	function generalTrayEyebrow() {
		if (selectedArea === 'team') return 'Shared team courses';
		if (selectedArea === 'stress-growth') return 'General resilience courses';
		return 'General courses';
	}

	function generalTrayTitle() {
		if (selectedArea === 'team') return currentTeam.pathwayName;
		if (selectedArea === 'stress-growth') return 'Type-independent support for pressure and flexibility';
		return 'Shared courses outside type zones';
	}

	function generalTrayCourses() {
		if (selectedArea === 'team') return teamCourses.length ? teamCourses : courses.filter((course) => course.pathway === 'team' && course.category === 'general');
		return sharedMapState.generalCourses;
	}

	function generalCourseTrayRole(course: Course) {
		if (course.pathway === 'team') return 'Shared Team Learning';
		if (course.pathway === 'stress-growth') return 'Core Resilience';
		return courseRoleForSharedMap(course);
	}

	function courseStateLabel(course: Course) {
		const state = getCourseState(course.id);
		if (state?.status === 'completed') return 'Completed';
		if (state?.status === 'in-progress') return 'In progress';
		return 'Not started';
	}

	function courseNodeCourse(node: Node) {
		return node.kind === 'course' && node.courseIds?.[0] ? getCourse(node.courseIds[0]) : undefined;
	}

	function courseNodeStatusKind(node: Node) {
		const course = courseNodeCourse(node);
		if (!course) return 'neutral';
		const state = getCourseState(course.id);
		if (state?.status === 'completed') return 'completed';
		if (state?.status === 'in-progress') return 'in-progress';
		if (course.prerequisites.some((courseId) => getCourseState(courseId)?.status !== 'completed')) return 'locked';
		return 'not-started';
	}

	function courseVisualStatusLabel(node: Node) {
		const course = courseNodeCourse(node);
		if (!course) return node.status ?? 'Available';
		if (courseNodeStatusKind(node) === 'locked') return 'Locked';
		return courseStateLabel(course);
	}

	function courseNodeProgress(node: Node) {
		const course = courseNodeCourse(node);
		return course ? progressPct(course.id) : 0;
	}

	function compactNodeMeta(node: Node) {
		const course = courseNodeCourse(node);
		if (!course) return node.meta ?? node.label;
		return `${titleCase(levelLabel(course))} / ${course.lengthMinutes} min`;
	}

	function roleAbbreviation(role: string) {
		const labels: Record<string, string> = {
			Foundation: 'F',
			'Strength Mastery': 'SM',
			'Growth Resource': 'GR',
			Fortification: 'FT',
			'Type Perspective': 'TP',
			Collaboration: 'C',
			'Shared Team Learning': 'TEAM',
			'Team Member': 'TM',
			'Core Resilience': 'CR',
			'Pressure Practice': 'PP',
			'Center Collaboration': 'CC',
			'Profile Origin': 'P',
			Territory: 'T'
		};
		return labels[role] ?? role.split(' ').map((word) => word[0]).join('').slice(0, 4).toUpperCase();
	}

	function nodeAriaLabel(node: Node) {
		if (node.kind === 'course') {
			return `${node.title}, ${compactNodeMeta(node)}, ${courseVisualStatusLabel(node)}`;
		}
		return `${node.label}, ${node.title}`;
	}

	function progressPct(courseId: string) {
		return getCourseState(courseId)?.progressPct ?? 0;
	}

	function getCourseTitles(courseIds: string[] | undefined) {
		return courseIds?.map(getCourse).filter(isCourse).map((course) => course.name).join(', ') || 'None listed';
	}

	function buildCourseListGroups(): CourseListGroup[] {
		if (!selectedArea || selectedArea === 'All') return [];
		if (selectedArea === 'strengths') return buildStrengthsListGroups();
		if (selectedArea === 'stress-growth') return buildStressGrowthListGroups();
		if (selectedArea === 'fortification') return buildFortificationListGroups();
		return buildTeamListGroups();
	}

	function buildStrengthsListGroups(): CourseListGroup[] {
		const pathwayCourses = coursesForPathwayView('strengths');
		return profileTypes.map((type, index) => ({
			id: `strengths-type-${type.number}`,
			eyebrow: index === 0 ? 'Primary strength territory' : index === 1 ? 'Secondary strength territory' : 'Tertiary strength territory',
			title: `Type ${type.number} / ${type.name}`,
			description: typeTerritories[type.number],
			context: `${pathwayCourses.filter((course) => course.category === `type-${type.number}`).length} courses connected to ${selectedMember.name.split(' ')[0]}'s profile order.`,
			courses: sortCoursesForList(pathwayCourses.filter((course) => course.category === `type-${type.number}`))
		})).filter((group) => group.courses.length);
	}

	function buildStressGrowthListGroups(): CourseListGroup[] {
		const pathwayCourses = coursesForPathwayView('stress-growth');
		const groups = [
			{
				id: 'stress',
				eyebrow: 'Pressure / stress',
				title: `Type ${selectedMember.primaryType} stress curriculum`,
				description: `Visually connected with Type ${stressType.number} / ${stressType.name}.`,
				context: 'Courses for recognising pressure earlier and choosing a steadier response.',
				courses: pathwayCourses.filter((course) => course.category === currentStressCategory())
			},
			{
				id: 'growth',
				eyebrow: 'Growth resources',
				title: `Type ${selectedMember.primaryType} growth curriculum`,
				description: `Visually connected with Type ${growthType.number} / ${growthType.name}.`,
				context: 'Courses for broadening the response range beyond the familiar primary pattern.',
				courses: pathwayCourses.filter((course) => course.category === currentGrowthCategory())
			},
			{
				id: 'general',
				eyebrow: 'General resilience',
				title: 'Core resilience',
				description: 'Useful across all types.',
				context: 'General courses remain separate from stress and growth type categories.',
				courses: pathwayCourses.filter((course) => course.category === 'general')
			}
		];
		return groups.map((group) => ({ ...group, courses: sortCoursesForList(group.courses) })).filter((group) => group.courses.length);
	}

	function buildFortificationListGroups(): CourseListGroup[] {
		const pathwayCourses = coursesForPathwayView('fortification');
		return enneagramTypes
			.map((type) => type.number)
			.sort((a, b) => a - b)
			.filter((typeNumber) => !selectedMember.profile.includes(typeNumber))
			.map((typeNumber) => {
				const type = getType(typeNumber);
				return {
					id: `fortification-type-${type.number}`,
					eyebrow: 'Fortification territory',
					title: `Type ${type.number} / ${type.name}`,
					description: typeTerritories[type.number],
					context: 'Top-three profile territories are excluded here; this explores less-familiar capability areas.',
					courses: sortCoursesForList(pathwayCourses.filter((course) => course.category === `type-${type.number}`))
				};
			})
			.filter((group) => group.courses.length);
	}

	function buildTeamListGroups(): CourseListGroup[] {
		const pathwayCourses = coursesForPathwayView('team');
		const teamMembers = currentTeam.memberIds.map(getMember).filter(isMember);
		const representedTypes = [...teamDistribution().keys()].sort((a, b) => a - b);
		const typeGroups = representedTypes
			.map((typeNumber) => {
				const type = getType(typeNumber);
				return {
					id: `team-type-${type.number}`,
					eyebrow: 'Type perspective',
					title: `Type ${type.number} / ${type.name}`,
					description: typeTerritories[type.number],
					context: 'Perspective learning for working with represented team patterns.',
					relevantMembers: teamMembers.filter((member) => member.profile.includes(type.number)),
					courses: sortCoursesForList(pathwayCourses.filter((course) => course.category === `type-${type.number}`))
				};
			})
			.filter((group) => group.courses.length);
		const centerGroups = ['body', 'heart', 'head'].map((center) => ({
			id: `team-center-${center}`,
			eyebrow: 'Center collaboration',
			title: `${titleCase(center)} center`,
			description: `${titleCase(center)}-center collaboration courses for the selected team context.`,
			context: 'Center courses sit separately from type-perspective learning.',
			courses: sortCoursesForList(pathwayCourses.filter((course) => course.category === `center-${center}`))
		})).filter((group) => group.courses.length);
		const generalGroup = {
			id: 'team-general',
			eyebrow: 'Shared team learning',
			title: currentTeam.pathwayName,
			description: 'Team-wide courses that support shared agreements, decisions and commitments.',
			context: `${currentTeam.name} shared pathway.`,
			courses: sortCoursesForList(pathwayCourses.filter((course) => course.category === 'general'))
		};
		return [...typeGroups, ...centerGroups, ...(generalGroup.courses.length ? [generalGroup] : [])];
	}

	function sortCoursesForList(courseList: Course[]) {
		return [...courseList].sort((a, b) => {
			const chainA = a.chain?.id ?? '';
			const chainB = b.chain?.id ?? '';
			if (chainA !== chainB) return chainA.localeCompare(chainB);
			if (a.chain && b.chain && a.chain.sequence !== b.chain.sequence) return a.chain.sequence - b.chain.sequence;
			const levelOrder = { foundation: 1, intermediate: 2, advanced: 3 };
			if (levelOrder[a.level] !== levelOrder[b.level]) return levelOrder[a.level] - levelOrder[b.level];
			return a.name.localeCompare(b.name);
		});
	}

	function courseListStatusKind(course: Course) {
		return courseNodeStatusKind({ id: `course-${course.id}`, kind: 'course', title: course.name, label: '', detail: '', courseIds: [course.id], x: 0, y: 0 });
	}

	function listCourseStatusLabel(course: Course) {
		const status = courseListStatusKind(course);
		if (status === 'completed') return 'Completed';
		if (status === 'in-progress') return `${progressPct(course.id)}%`;
		if (status === 'locked') return 'Locked';
		return 'Not started';
	}

	function listCourseActionLabel(course: Course) {
		const status = courseListStatusKind(course);
		if (status === 'completed') return 'Review';
		if (status === 'in-progress') return 'Continue';
		if (status === 'locked') return 'View prerequisite';
		return 'Start';
	}

	function isRecommendedCourse(course: Course) {
		return memberRecommendations.some((recommendation) => recommendation.courseId === course.id);
	}

	function listCourseClasses(course: Course) {
		return [
			'list-course-row',
			`status-${courseListStatusKind(course)}`,
			course.chain ? 'chain-course' : '',
			isRecommendedCourse(course) ? 'recommended-course' : ''
		].filter(Boolean).join(' ');
	}

	function selectListCourse(course: Course) {
		selectNode(`course-${course.id}`);
	}

	function buildSharedMapState(): MapState {
		if (selectedArea === 'strengths') {
			const activeTypeIds = selectedMember.profile;
			const coursesInView = coursesForPathwayView('strengths');
			return {
				activeTypeIds,
				activeZoneIds: activeTypeIds,
				highlightedConnections: [],
				courses: coursesInView,
				generalCourses: courses.filter((course) => course.pathway === 'strengths' && course.category === 'general')
			};
		}
		if (selectedArea === 'stress-growth') {
			const stressCategory = currentStressCategory();
			const growthCategory = currentGrowthCategory();
			const coursesInView = courses.filter((course) => course.pathway === 'stress-growth' && [stressCategory, growthCategory].includes(course.category));
			return {
				activeTypeIds: [selectedMember.primaryType, stressType.number, growthType.number],
				activeZoneIds: [stressType.number, growthType.number],
				highlightedConnections: [
					{ from: selectedMember.primaryType, to: stressType.number, kind: 'stress' },
					{ from: selectedMember.primaryType, to: growthType.number, kind: 'growth' }
				],
				courses: coursesInView,
				generalCourses: courses.filter((course) => course.pathway === 'stress-growth' && course.category === 'general')
			};
		}
		if (selectedArea === 'fortification') {
			const activeZoneIds = enneagramTypes.map((type) => type.number).filter((typeNumber) => !selectedMember.profile.includes(typeNumber));
			const coursesInView = coursesForPathwayView('fortification');
			return {
				activeTypeIds: selectedMember.profile,
				activeZoneIds,
				highlightedConnections: [],
				courses: coursesInView,
				generalCourses: courses.filter((course) => course.pathway === 'fortification' && course.category === 'general')
			};
		}
		return { activeTypeIds: [], activeZoneIds: [], highlightedConnections: [], courses: [], generalCourses: [] };
	}

	function buildMapNodes(): Node[] {
		if (selectedArea === null) return buildProfileOriginNodes();
		if (selectedArea === 'All') return buildAtlasNodes();
		if (isSharedMapPathway(selectedArea)) return buildSharedEnneagramNodes();
		return buildTeamNodes();
	}

	function buildSharedEnneagramNodes(): Node[] {
		const pathway = selectedArea;
		if (!isSharedMapPathway(pathway)) return [];
		const coursesInView = sharedMapState.courses;
		const courseNodes = coursesInView.flatMap((course) => {
			const typeNumber = zoneTypeForCourse(course);
			if (!typeNumber) return [];
			const point = sharedCoursePoint(course, coursesInView.filter((item) => zoneTypeForCourse(item) === typeNumber), typeNumber);
			return courseNode(course, courseRoleForSharedMap(course), typeNumber, bandForCourseLevel(course), 0, [], point);
		});
		return [
			{
				id: 'profile',
				kind: 'profile',
				title: selectedMember.profile.join('-'),
				label: selectedMember.profileName,
				detail: selectedMember.profileDescription,
				role: 'Profile Origin',
				typeNumber: selectedMember.primaryType,
				x: 50,
				y: 50
			},
			...wheelTypes.map((type) => {
				const point = typeMarkerPoint(type.number);
				const isActiveType = sharedMapState.activeTypeIds.includes(type.number);
				return {
					id: `signal-type-${type.number}`,
					kind: 'signal' as const,
					title: `${type.number}`,
					label: isActiveType ? activeTypeLabel(type.number) : 'Type anchor',
					detail: `${type.capacity}. ${type.healthyExpression}`,
					role: isActiveType ? courseRoleForTypeAnchor(type.number) : 'Type Perspective' as const,
					typeNumber: type.number,
					band: 'inner' as const,
					territory: pathwayToTerritory[pathway],
					skillIds: skillsForType(type.number).map((skill) => skill.id),
					courseIds: coursesInView.filter((course) => zoneTypeForCourse(course) === type.number).map((course) => course.id),
					meta: typeTerritories[type.number],
					x: point.x,
					y: point.y
				};
			}),
			...courseNodes
		];
	}

	function buildProfileOriginNodes(): Node[] {
		return [
			{
				id: 'profile',
				kind: 'profile',
				title: `${selectedMember.name.split(' ')[0]} / ${selectedMember.profile.join('-')}`,
				label: selectedMember.profileName,
				detail: selectedMember.profileDescription,
				courseIds: activeCourses.map((course) => course.id),
				skillIds: activeSkills.map((skill) => skill.id),
				x: 50,
				y: 50
			},
			...profileTypes.map((type, index) => ({
				id: `signal-type-${type.number}`,
				kind: 'signal' as const,
				title: `${index === 0 ? 'Primary' : index === 1 ? 'Second' : 'Third'}: ${type.number} / ${type.name}`,
				label: type.center,
				detail: type.description,
				skillIds: skillsForType(type.number).map((skill) => skill.id),
				x: [50, 70, 30][index] ?? 50,
				y: [22, 62, 62][index] ?? 50
			}))
		];
	}

	function buildAtlasNodes(): Node[] {
		const atlasPositions = [
			{ x: 28, y: 33 },
			{ x: 72, y: 33 },
			{ x: 28, y: 69 },
			{ x: 72, y: 69 }
		];
		return pathways.map((pathway, index) => {
			const pathwayCourses = coursesForPathwayView(pathway);
			const activeCount = pathwayCourses.filter((course) => activeCourseStates.some((state) => state.courseId === course.id)).length;
			return {
				id: `territory-${pathway}`,
				kind: 'territory' as const,
				title: pathwayCopy[pathway].label,
				label: `${pathwayCourses.length} courses`,
				detail: pathwayCopy[pathway].short,
				role: 'Territory' as const,
				territory: pathwayToTerritory[pathway],
				courseIds: pathwayCourses.map((course) => course.id),
				meta: `${activeCount} active / ${pathwayCourses.slice(0, 2).map((course) => course.name).join(' + ')}`,
				x: atlasPositions[index].x,
				y: atlasPositions[index].y
			};
		});
	}

	function buildTeamNodes(): Node[] {
		const distribution = teamDistribution();
		const typeCourses = coursesForPathwayView('team').filter((course) => course.category.startsWith('type-'));
		const centerCourses = coursesForPathwayView('team').filter((course) => course.category.startsWith('center-'));
		return [
			{ id: 'profile', kind: 'profile', title: currentTeam.name, label: 'Team', detail: currentTeam.description, role: 'Profile Origin', territory: pathwayToTerritory.team, courseIds: currentTeam.pathwayCourseIds, x: 50, y: 50 },
			...wheelTypes.map((type) => {
				const point = typeMarkerPoint(type.number);
				const representedBy = distribution.get(type.number) ?? [];
				return {
					id: `signal-type-${type.number}`,
					kind: 'signal' as const,
					title: `${type.number}`,
					label: representedBy.length ? `${representedBy.length} team ${representedBy.length === 1 ? 'signal' : 'signals'}` : 'Type anchor',
					detail: `${type.capacity}. ${type.healthyExpression}`,
					role: 'Type Perspective' as const,
					typeNumber: type.number,
					band: 'inner' as const,
					territory: pathwayToTerritory.team,
					skillIds: skillsForType(type.number).map((skill) => skill.id),
					courseIds: typeCourses.filter((course) => categoryType(course) === type.number).map((course) => course.id),
					meta: typeTerritories[type.number],
					members: representedBy,
					x: point.x,
					y: point.y
				};
			}),
			...currentTeamMembers.map((member, index) => ({
				id: `person-${member.id}`,
				kind: 'person' as const,
				title: member.name,
				label: member.profileName,
				detail: member.summary,
				role: 'Team Member' as const,
				typeNumber: member.primaryType,
				band: 'inner' as const,
				territory: pathwayToTerritory.team,
				members: [member.name],
				...mapPoint(member.primaryType, 'inner', laneForIndex(index))
			})),
			...typeCourses.map((course, index) => courseNode(course, 'Type Perspective', categoryType(course) ?? 9, 'inner', laneForIndex(index), distribution.get(categoryType(course) ?? 9))),
			...centerCourses.map((course, index) => courseNode(course, 'Center Collaboration', selectedMember.primaryType, 'middle', laneForIndex(index)))
		];
	}

	function courseNode(course: Course, role: MapRole, typeNumber: number, band: RadialBand, lane = 0, memberNames: string[] = [], explicitPoint?: MapPoint): Node {
		const point = explicitPoint ?? mapPoint(typeNumber, band, lane);
		return {
			id: `course-${course.id}`,
			kind: 'course',
			title: course.name,
			label: role,
			detail: course.recommendationContext || course.description,
			role,
			typeNumber,
			band,
			territory: pathwayToTerritory[course.pathway],
			skillIds: course.develops,
			courseIds: [course.id],
			meta: courseMeta(course),
			status: courseStateLabel(course),
			members: memberNames,
			connectedObjectIds: [...(course.prerequisites ?? []), ...(course.unlocks ?? [])],
			x: point.x,
			y: point.y
		};
	}

	function typeAngle(typeNumber: number) {
		const index = enneagramOrder.indexOf(typeNumber);
		return -90 + index * 40;
	}

	function bandForCourseLevel(course: Course): RadialBand {
		if (course.level === 'advanced') return 'outer';
		if (course.level === 'intermediate') return 'middle';
		return 'inner';
	}

	function zoneTypeForCourse(course: Course) {
		if (course.pathway === 'stress-growth') {
			if (course.category === currentStressCategory()) return stressType.number;
			if (course.category === currentGrowthCategory()) return growthType.number;
			return undefined;
		}
		return categoryType(course);
	}

	function activeTypeLabel(typeNumber: number) {
		if (selectedArea === 'stress-growth') {
			if (typeNumber === selectedMember.primaryType) return 'Primary origin';
			if (typeNumber === stressType.number) return 'Pressure destination';
			if (typeNumber === growthType.number) return 'Growth resource';
		}
		const rank = selectedMember.profile.indexOf(typeNumber);
		if (rank >= 0) return ['Primary', 'Secondary', 'Tertiary'][rank] ?? 'Profile type';
		return 'Active type';
	}

	function courseRoleForTypeAnchor(typeNumber: number): MapRole {
		if (selectedArea === 'stress-growth') {
			if (typeNumber === stressType.number) return 'Pressure Practice';
			if (typeNumber === growthType.number) return 'Growth Resource';
			return 'Profile Origin';
		}
		if (selectedArea === 'fortification') return selectedMember.profile.includes(typeNumber) ? 'Profile Origin' : 'Fortification';
		return 'Strength Mastery';
	}

	function courseRoleForSharedMap(course: Course): MapRole {
		if (course.pathway === 'team') return 'Shared Team Learning';
		if (course.pathway === 'stress-growth') return course.category === currentStressCategory() ? 'Pressure Practice' : 'Growth Resource';
		if (course.pathway === 'fortification') return 'Fortification';
		return 'Strength Mastery';
	}

	function polarPoint(angleDeg: number, radius: number, centerY = 50): MapPoint {
		const angle = angleDeg * (Math.PI / 180);
		return { x: 50 + Math.cos(angle) * radius, y: centerY + Math.sin(angle) * radius };
	}

	function sharedPoint(typeNumber: number, band: RadialBand, lane = 0): MapPoint {
		const angle = typeAngle(typeNumber) + (strengthCourseLaneAngles[lane] ?? 0);
		return polarPoint(angle, strengthRadialBands[band]);
	}

	function sharedCoursePoint(course: Course, zoneCourses: Course[], typeNumber: number): MapPoint {
		const band = bandForCourseLevel(course);
		if (course.chain) return sharedPoint(typeNumber, band, 4);
		const sameBandStandalone = zoneCourses
			.filter((item) => !item.chain && bandForCourseLevel(item) === band)
			.sort((a, b) => a.id.localeCompare(b.id));
		const laneIndex = Math.max(0, sameBandStandalone.findIndex((item) => item.id === course.id));
		return sharedPoint(typeNumber, band, laneIndex % 4);
	}

	function buildCourseChainSegments(): ChainSegment[] {
		if (!usesSharedEnneagramMap) return [];
		const courseNodes = mapNodes.filter((node) => node.kind === 'course' && node.courseIds?.[0]);
		return courseNodes.flatMap((node) => {
			const courseId = node.courseIds?.[0];
			const course = courseId ? getCourse(courseId) : undefined;
			if (!course?.chain?.id) return [];
			return course.unlocks.flatMap((unlockId) => {
				const nextCourse = getCourse(unlockId);
				if (nextCourse?.chain?.id !== course.chain?.id) return [];
				const nextNode = courseNodes.find((item) => item.courseIds?.[0] === unlockId);
				if (!nextNode) return [];
				const selected = Boolean(selectedNode?.courseIds?.[0] === course.id || selectedNode?.courseIds?.[0] === unlockId || selectedNode?.connectedObjectIds?.includes(course.id) || selectedNode?.connectedObjectIds?.includes(unlockId));
				return [{
					id: `${course.id}-${unlockId}`,
					from: { x: node.x, y: node.y },
					to: { x: nextNode.x, y: nextNode.y },
					selected
				}];
			});
		});
	}

	function mapPoint(typeNumber: number, band: RadialBand, lane = 0) {
		const angle = (typeAngle(typeNumber) + lane * 8) * (Math.PI / 180);
		const radius = radialBands[band] + Math.abs(lane) * 2.8;
		return { x: 50 + Math.cos(angle) * radius, y: 58 + Math.sin(angle) * radius * 0.72 };
	}

	function getActiveSectorTypes() {
		if (isSharedMapPathway(selectedArea)) return sharedMapState.activeTypeIds;
		if (selectedArea === 'team') return [...teamDistribution().keys()];
		return [];
	}

	function getActiveZoneTypes() {
		if (isSharedMapPathway(selectedArea)) return sharedMapState.activeZoneIds;
		if (selectedArea === 'team') return [...teamDistribution().keys()];
		return [];
	}

	function sectorPath(typeNumber: number) {
		const center = typeAngle(typeNumber);
		const start = polar(center - 20, 47);
		const end = polar(center + 20, 47);
		const innerEnd = polar(center + 20, 16);
		const innerStart = polar(center - 20, 16);
		return `M ${start.x} ${start.y} A 47 47 0 0 1 ${end.x} ${end.y} L ${innerEnd.x} ${innerEnd.y} A 16 16 0 0 0 ${innerStart.x} ${innerStart.y} Z`;
	}

	function polar(angleDeg: number, radius: number) {
		return polarPoint(angleDeg, radius);
	}

	function typeMarkerPoint(typeNumber: number) {
		return polar(typeAngle(typeNumber), usesEnneagramCore ? sharedEnneagramRadius : 22);
	}

	function arcPoint(center: MapPoint, angleDeg: number, radius: number) {
		const angle = angleDeg * (Math.PI / 180);
		return { x: center.x + Math.cos(angle) * radius, y: center.y + Math.sin(angle) * radius };
	}

	function arcPath(center: MapPoint, middleAngle: number, sweep: number, radius: number) {
		const start = arcPoint(center, middleAngle - sweep / 2, radius);
		const end = arcPoint(center, middleAngle + sweep / 2, radius);
		return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${sweep > 180 ? 1 : 0} 1 ${end.x} ${end.y}`;
	}

	function buildTeamTypeArcs(): TeamTypeArc[] {
		if (selectedArea !== 'team') return [];
		const sweepByRank = { 1: 180, 2: 120, 3: 90 } as const;
		const arcs: TeamTypeArc[] = [];
		currentTeamMembers.forEach((member) => {
			member.profile.forEach((typeNumber, index) => {
				const rank = (index + 1) as 1 | 2 | 3;
				const offset = arcs.filter((arc) => arc.typeNumber === typeNumber).length;
				const sameRankOffset = arcs.filter((arc) => arc.typeNumber === typeNumber && arc.rank === rank).length;
				const point = typeMarkerPoint(typeNumber);
				const inwardAngle = typeAngle(typeNumber) + 180;
				const radius = 4.25 + offset * 0.72;
				arcs.push({
					id: `${member.id}-${typeNumber}-${rank}`,
					typeNumber,
					rank,
					offset: sameRankOffset,
					path: arcPath(point, inwardAngle, sweepByRank[rank], radius)
				});
			});
		});
		return arcs.sort((a, b) => a.rank - b.rank || a.typeNumber - b.typeNumber || a.offset - b.offset);
	}

	function laneForIndex(index: number) {
		return [-1, 0, 1, -2, 2, -3, 3, -4, 4][index % 9] ?? 0;
	}

	function coursesForPathwayView(pathway: CoursePathway) {
		if (pathway === 'strengths') {
			const categories = selectedMember.profile.map((typeNumber) => `type-${typeNumber}`);
			return courses.filter((course) => course.pathway === pathway && categories.includes(course.category));
		}
		if (pathway === 'stress-growth') {
			return courses.filter((course) => course.pathway === pathway && [currentStressCategory(), currentGrowthCategory(), 'general'].includes(course.category));
		}
		if (pathway === 'fortification') {
			const categories = enneagramTypes.map((type) => type.number).filter((typeNumber) => !selectedMember.profile.includes(typeNumber)).map((typeNumber) => `type-${typeNumber}`);
			return courses.filter((course) => course.pathway === pathway && categories.includes(course.category));
		}
		return courses.filter((course) => course.pathway === pathway && teamCourseRelevant(course));
	}

	function currentStressCategory() {
		return `stress-${selectedMember.primaryType}`;
	}

	function currentGrowthCategory() {
		return `growth-${selectedMember.primaryType}`;
	}

	function categoryType(course: Course) {
		const match = course.category.match(/(?:type|stress|growth)-(\d+)/);
		return match ? Number(match[1]) : undefined;
	}

	function teamCourseRelevant(course: Course) {
		if (course.category === 'general') return true;
		if (course.category.startsWith('center-')) return true;
		const typeNumber = categoryType(course);
		return typeof typeNumber === 'number' && [...teamDistribution().keys()].includes(typeNumber);
	}

	function skillsForType(typeNumber: number) {
		return skills.filter((skill) => skill.typeNumber === typeNumber);
	}

	function teamDistribution() {
		const distribution = new Map<number, string[]>();
		currentTeam.memberIds.map(getMember).filter(isMember).forEach((member) => {
			member.profile.forEach((typeNumber) => {
				distribution.set(typeNumber, [...(distribution.get(typeNumber) ?? []), member.name.split(' ')[0]]);
			});
		});
		return distribution;
	}

	function getAreaGuide() {
		if (selectedArea === null) {
			return {
				eyebrow: 'Profile origin',
				title: `${selectedMember.profile.join('-')}: ${selectedMember.profileName}`,
				body: selectedMember.profileDescription,
				items: profileTypes.map((type) => `${type.number} / ${type.name}: ${type.capacity}`)
			};
		}
		if (selectedArea === 'All') {
			return {
				eyebrow: 'Development landscape',
				title: 'Four ways learning can become relevant',
				body: 'Your recommendations draw on four distinct learning pathways: strengths, stress and growth, fortification, and team development.',
				items: pathways.map((pathway) => `${pathwayCopy[pathway].label}: ${pathwayCopy[pathway].short}`)
			};
		}
		if (selectedArea === 'strengths') {
			return {
				eyebrow: 'Strengths',
				title: 'From natural capacity to deliberate strength',
				body: 'This map starts with the strongest profile signals and places courses around the type categories they most naturally extend.',
				items: profileTypes.map((type) => `${type.number} / ${type.name}: ${type.healthyExpression}`)
			};
		}
		if (selectedArea === 'stress-growth') {
			return {
				eyebrow: 'Stress & Growth',
				title: 'Pressure signals, regulation and flexible response',
				body: `${primaryType.number} / ${primaryType.name} uses ${currentStressCategory()} and ${currentGrowthCategory()} curriculum categories while visually highlighting Type ${stressType.number} and Type ${growthType.number}.`,
				items: ['Recognise pressure earlier', 'Regulate without disengaging', 'Access a wider response range']
			};
		}
		if (selectedArea === 'fortification') {
			return {
				eyebrow: 'Fortification',
				title: 'Broaden range where the pattern is less practised',
				body: 'This route connects non-top-three type categories to balancing capabilities without treating them as weaknesses.',
				items: selectedMember.growthEdges
			};
		}
		return {
			eyebrow: 'Team',
			title: currentTeam.pathwayName,
			body: 'This pathway shows where personal development intersects with colleagues, relationship dynamics and shared team capability.',
			items: currentTeam.priorities
		};
	}

	function mapModeClass() {
		if (selectedArea === null) return 'profile-mode';
		if (selectedArea === 'All') return 'atlas-mode';
		if (selectedArea === 'strengths') return 'shared-enneagram-mode strengths-mode';
		if (selectedArea === 'stress-growth') return 'shared-enneagram-mode stress-mode';
		if (selectedArea === 'fortification') return 'shared-enneagram-mode growth-mode';
		return 'shared-enneagram-mode team-mode';
	}

	function edgeClass(node: Node) {
		if (usesEnneagramCore) return node.kind === 'course' ? 'course-line enneagram-course-line' : 'influence-line enneagram-anchor-line';
		if (selectedArea === 'stress-growth') return 'flow-line';
		if (selectedArea === 'fortification') return 'route-line';
		if (selectedArea === 'team') return 'relationship-line';
		if (selectedArea === 'All') return 'atlas-line';
		return node.kind === 'course' ? 'course-line' : 'influence-line';
	}

	function edgeStart(node: Node) {
		if (usesEnneagramCore && node.kind === 'course' && node.typeNumber) return typeMarkerPoint(node.typeNumber);
		if (selectedArea === 'fortification' && node.kind === 'course') return { x: Math.max(12, node.x - 14), y: node.y };
		if (selectedArea === 'team' && (node.kind === 'person' || node.kind === 'team')) return { x: 25, y: 50 };
		return { x: 50, y: 50 };
	}

	function connectionClass(from: number, to: number) {
		const highlight = highlightedConnection(from, to);
		return ['enneagram-connection-line', highlight ? `connection-${highlight.kind}` : 'connection-inactive'].join(' ');
	}

	function highlightedConnection(from: number, to: number) {
		return sharedMapState.highlightedConnections.find((connection) =>
			(connection.from === from && connection.to === to) || (connection.from === to && connection.to === from)
		);
	}

	function buildInspectorView(): InspectorView {
		if (selectedCourse) return buildCourseInspector(selectedCourse, selectedNode ?? nodeForGeneralCourse(selectedCourse));
		if (!selectedNode) return buildPathwayOverviewInspector();
		if (selectedSkill) return buildSkillInspector(selectedSkill, selectedNode);
		if (selectedNode.kind === 'person') return buildTeamMemberInspector(selectedNode);
		if (selectedNode.kind === 'profile' && selectedArea === 'team') return buildTeamAnchorInspector();
		if (selectedNode.kind === 'profile') return buildProfileOriginInspector();
		if (selectedNode.kind === 'signal' && selectedArea === 'stress-growth') return buildStressGrowthSignalInspector(selectedNode);
		if (selectedNode.typeNumber) return buildTypeTerritoryInspector(selectedNode);
		return buildNodeInspector(selectedNode);
	}

	function nodeForGeneralCourse(course: Course): Node {
		return {
			id: `course-${course.id}`,
			kind: 'course',
			title: course.name,
			label: courseRoleForSharedMap(course),
			detail: course.recommendationContext || course.description,
			role: courseRoleForSharedMap(course),
			territory: pathwayToTerritory[course.pathway],
			skillIds: course.develops,
			courseIds: [course.id],
			meta: courseMeta(course),
			status: courseStateLabel(course),
			connectedObjectIds: [...(course.prerequisites ?? []), ...(course.unlocks ?? [])],
			x: 50,
			y: 50
		};
	}

	function buildPathwayOverviewInspector(): InspectorView {
		if (selectedArea === null) return buildProfileOriginInspector();
		return {
			eyebrow: areaGuide.eyebrow,
			title: areaGuide.title,
			description: areaGuide.body,
			badge: selectedArea === 'All' ? 'Pathway overview' : pathwayCopy[selectedArea].label,
			blocks: [
				{ id: 'in-view', label: 'In this view', kind: 'chips', items: areaGuide.items },
				{
					id: 'active-learning',
					label: 'Active learning',
					kind: 'meta',
					meta: [
						{ label: 'Active', value: `${activeCourses.length} courses` },
						{ label: 'Suggested', value: `${suggestedCourses.length} next` },
						{ label: 'Completed', value: `${completedCourses.length} courses` },
						{ label: 'Skills', value: `${activeSkills.length} in view` }
					]
				}
			]
		};
	}

	function buildProfileOriginInspector(): InspectorView {
		return {
			eyebrow: 'Profile origin',
			title: `${selectedMember.name.split(' ')[0]} / ${selectedMember.profile.join('-')}`,
			description: selectedMember.profileDescription,
			badge: selectedMember.profileName,
			blocks: [
				{
					id: 'patterns',
					label: 'Primary pattern',
					kind: 'text',
					text: `${primaryType.number} / ${primaryType.name}: ${primaryType.capacity}`
				},
				{
					id: 'supporting-patterns',
					label: 'Supporting patterns',
					kind: 'chips',
					items: profileTypes.slice(1).map((type) => `${type.number} / ${type.name}: ${type.capacity}`)
				},
				{
					id: 'development-context',
					label: 'Development context',
					kind: 'text',
					text: `${selectedMember.name.split(' ')[0]}'s courses connect the profile blend to strengths, pressure response, balancing capacity and team contribution.`
				},
				{
					id: 'capabilities',
					label: 'Capabilities in view',
					kind: 'chips',
					skills: activeSkills.slice(0, 7)
				}
			]
		};
	}

	function buildCourseInspector(course: Course, node: Node): InspectorView {
		const state = getCourseState(course.id);
		const recommendedBecause = whyCourseIsHere(course, node);
		const progressionMeta = courseProgressionMeta(course);
		return {
			eyebrow: courseRoleLabel(course, node),
			title: course.name,
			description: course.description,
			badge: courseStateLabel(course),
			blocks: [
				{ id: 'why', label: 'Why this is here', kind: 'text', text: recommendedBecause },
				{ id: 'develops', label: 'Develops', kind: 'chips', skills: courseSkills(course) },
				{
					id: 'details',
					label: 'Learning details',
					kind: 'meta',
					meta: [
						{ label: 'Level', value: titleCase(levelLabel(course)) },
						{ label: 'Length', value: `${course.lengthMinutes} min` },
						{ label: 'Format', value: formatToken(course.courseType) },
						{ label: 'Audience', value: titleCase(course.audience) }
					]
				},
				...(progressionMeta.length ? [{ id: 'progression', label: 'Progression', kind: 'progression' as const, meta: progressionMeta }] : []),
				{
					id: 'status',
					label: 'Status',
					kind: 'status',
					text: courseStatusText(course, state),
					meta: [{ label: 'Progress', value: `${progressPct(course.id)}%` }]
				}
			],
			action: courseAction(course)
		};
	}

	function buildSkillInspector(skill: Skill, node: Node): InspectorView {
		const relatedCourses = coursesForSkill(skill.id).filter((course) => selectedArea === 'All' || selectedArea === null || course.pathway === selectedArea).slice(0, 5);
		const relations = skillRelations.filter((relation) => relation.from.includes(skill.id) || relation.to === skill.id).map((relation) => relation.label);
		return {
			eyebrow: node.role ?? 'Connected capability',
			title: skill.name,
			description: skill.description,
			badge: skill.typeNumber ? `Type ${skill.typeNumber}` : 'General',
			blocks: [
				{
					id: 'why',
					label: 'Why this matters here',
					kind: 'text',
					text: `${selectedMember.name.split(' ')[0]}'s active recommendations connect this capability to ${node.territory ? pathwayCopy[territoryToPathway[node.territory]].label.toLowerCase() : 'the wider development map'}.`
				},
				{ id: 'courses', label: 'Courses developing it', kind: 'courses', courses: relatedCourses },
				{ id: 'builds', label: 'Builds toward / supports', kind: 'chips', items: relations.length ? relations : ['Reusable professional capability across several recommendations'] }
			]
		};
	}

	function buildTypeTerritoryInspector(node: Node): InspectorView {
		const type = getType(node.typeNumber ?? selectedMember.primaryType);
		const relatedSkills = node.skillIds?.map(getSkill).filter(isSkill) ?? skillsForType(type.number).slice(0, 5);
		const relatedCourses = relatedCoursesForNode(node).slice(0, 5);
		return {
			eyebrow: node.role ?? 'Type territory',
			title: `${type.number} / ${type.name}`,
			description: type.description,
			badge: node.territory ? pathwayCopy[territoryToPathway[node.territory]].label : type.center,
			blocks: [
				{ id: 'why', label: 'Why this territory is active', kind: 'text', text: whyTypeIsActive(type, node) },
				{ id: 'capabilities', label: 'Connected capabilities', kind: 'chips', skills: relatedSkills },
				...(relatedCourses.length ? [{ id: 'courses', label: 'Related courses', kind: 'courses' as const, courses: relatedCourses }] : [])
			]
		};
	}

	function buildStressGrowthSignalInspector(node: Node): InspectorView {
		const type = getType(node.typeNumber ?? selectedMember.primaryType);
		const isPressure = node.id === 'signal-stress';
		const relatedCourses = coursesForPathwayView('stress-growth').filter((course) => course.category === (isPressure ? currentStressCategory() : currentGrowthCategory())).slice(0, 4);
		return {
			eyebrow: isPressure ? 'Pressure direction' : 'Growth resource',
			title: `${type.number} / ${type.name}`,
			description: isPressure
				? `Under pressure, ${primaryType.number} / ${primaryType.name} can borrow some ${type.number} / ${type.name} signals. The aim is earlier recognition and steadier choice, not labelling the pressure type as bad.`
				: `${type.number} / ${type.name} marks a growth direction for ${selectedMember.name.split(' ')[0]}'s primary pattern: a wider response range when the familiar strategy is too narrow.`,
			badge: isPressure ? 'Pressure practice' : 'Growth resource',
			blocks: [
				{ id: 'relationship', label: 'Relationship to primary type', kind: 'text', text: `${selectedMember.name.split(' ')[0]}'s primary pattern is ${primaryType.number} / ${primaryType.name}; this signal shows how movement under stress or growth can become learnable behaviour.` },
				{ id: 'capabilities', label: 'Capabilities', kind: 'chips', skills: node.skillIds?.map(getSkill).filter(isSkill) ?? [] },
				{ id: 'courses', label: 'Related courses', kind: 'courses', courses: relatedCourses }
			]
		};
	}

	function buildTeamMemberInspector(node: Node): InspectorView {
		const memberId = node.id.replace('person-', '');
		const member = getMember(memberId);
		if (!member) return buildNodeInspector(node);
		const relationship = relationshipRoutes.find((route) => route.memberIds.includes(member.id));
		const relatedCourses = [...new Set([...(relationship?.courses ?? []), ...currentTeam.pathwayCourseIds])].map(getCourse).filter(isCourse).slice(0, 5);
		return {
			eyebrow: 'Team member',
			title: member.name,
			description: member.summary,
			badge: `${member.profileName} / ${member.profile.join('-')}`,
			blocks: [
				{ id: 'contribution', label: 'Contribution summary', kind: 'text', text: member.profileDescription },
				{ id: 'relationship', label: `How this relates to ${selectedMember.name.split(' ')[0]}`, kind: 'text', text: relationship ? `${relationship.complementarity} ${relationship.viewerNotes[selectedMember.id] ?? relationship.friction}` : 'This colleague contributes a different profile pattern to the team system.' },
				{ id: 'learning', label: 'Relevant team learning', kind: 'courses', courses: relatedCourses }
			]
		};
	}

	function buildTeamAnchorInspector(): InspectorView {
		return {
			eyebrow: 'Team',
			title: currentTeam.name,
			description: currentTeam.description,
			badge: currentTeam.pathwayName,
			blocks: [
				{ id: 'priorities', label: 'Current team priorities', kind: 'chips', items: currentTeam.priorities },
				{ id: 'pathway', label: 'Shared pathway', kind: 'courses', courses: teamCourses },
				{ id: 'relationships', label: 'Relationship routes', kind: 'chips', items: relationshipRoutes.map((route) => route.theme) }
			]
		};
	}

	function buildNodeInspector(node: Node): InspectorView {
		return {
			eyebrow: node.label,
			title: node.title,
			description: node.detail,
			badge: node.role,
			blocks: [
				{ id: 'connected-skills', label: 'Connected skills', kind: 'chips', skills: node.skillIds?.map(getSkill).filter(isSkill) ?? [] },
				{ id: 'profile-context', label: 'Profile context', kind: 'text', text: `${primaryType.number} / ${primaryType.name} with supporting ${profileTypes.slice(1).map((type) => `${type.number} / ${type.name}`).join(' and ')}.` }
			]
		};
	}

	function relatedCoursesForNode(node: Node) {
		if (node.courseIds?.length) return node.courseIds.map(getCourse).filter(isCourse);
		if (!node.typeNumber) return [];
		if (selectedArea === 'strengths') return coursesForPathwayView('strengths').filter((course) => categoryType(course) === node.typeNumber);
		if (selectedArea === 'fortification') return coursesForPathwayView('fortification').filter((course) => categoryType(course) === node.typeNumber);
		if (selectedArea === 'team') return coursesForPathwayView('team').filter((course) => categoryType(course) === node.typeNumber || course.category === 'general');
		return [];
	}

	function whyTypeIsActive(type: EnneagramType, node: Node) {
		if (selectedArea === 'strengths') return `${type.number} / ${type.name} is part of ${selectedMember.name.split(' ')[0]}'s profile blend, so this area extends an already visible capacity into more deliberate skill.`;
		if (selectedArea === 'fortification') return `${type.number} / ${type.name} is outside the top-three profile, so this territory broadens range without treating the pattern as a deficit.`;
		if (selectedArea === 'team') return `${type.number} / ${type.name} appears in the team distribution, so the map connects that perspective to shared collaboration habits.`;
		if (node.territory) return `This territory is active because it contributes to the ${pathwayCopy[territoryToPathway[node.territory]].label.toLowerCase()} pathway.`;
		return `${type.number} / ${type.name} is connected to the current map selection.`;
	}

	function whyCourseIsHere(course: Course, node: Node) {
		const recommendation = recommendationForCourse(course.id);
		if (recommendation?.reason) return recommendation.reason;
		if (course.recommendationContext) return course.recommendationContext;
		const typeNumber = categoryType(course);
		if (course.pathway === 'strengths' && typeNumber) return `This course extends a strong Type ${typeNumber} profile signal into a practised capability.`;
		if (course.pathway === 'stress-growth') return `This course supports steadier response when ${primaryType.number} / ${primaryType.name} is under pressure or ready for a wider growth move.`;
		if (course.pathway === 'fortification' && typeNumber) return `This course develops a useful Type ${typeNumber} capacity outside the strongest profile patterns.`;
		if (course.pathway === 'team') return currentTeam.pathwayCourseIds.includes(course.id) ? `Part of ${currentTeam.name}'s shared pathway.` : `Relevant to ${currentTeam.name}'s collaboration and relationship map.`;
		return node.detail;
	}

	function courseRoleLabel(course: Course, node: Node) {
		if (node.role) return node.role;
		if (course.pathway === 'strengths' && course.level === 'advanced') return 'Strength Mastery';
		if (course.pathway === 'strengths') return 'Strength';
		if (course.pathway === 'stress-growth' && course.category.startsWith('stress-')) return 'Pressure Practice';
		if (course.pathway === 'stress-growth' && course.category.startsWith('growth-')) return 'Growth Resource';
		if (course.pathway === 'stress-growth') return 'Core Resilience';
		if (course.pathway === 'fortification') return 'Fortification';
		if (course.pathway === 'team' && course.category.startsWith('type-')) return 'Type Perspective';
		if (course.pathway === 'team' && course.category.startsWith('center-')) return 'Center Collaboration';
		if (course.pathway === 'team') return 'Shared Team Capability';
		return node.label || 'Course';
	}

	function courseListRole(course: Course) {
		return courseRoleLabel(course, { id: '', kind: 'course', title: '', label: '', detail: '', x: 0, y: 0 });
	}

	function courseProgressionMeta(course: Course): InspectorMeta[] {
		const meta: InspectorMeta[] = [];
		if (course.prerequisites.length) meta.push({ label: 'Prerequisites', value: getCourseTitles(course.prerequisites) });
		if (course.unlocks.length) meta.push({ label: 'Unlocks', value: getCourseTitles(course.unlocks) });
		if (course.chain) meta.push({ label: 'Chain', value: chainPosition(course) });
		return meta;
	}

	function chainPosition(course: Course) {
		if (!course.chain) return 'Standalone';
		const total = courses.filter((item) => item.chain?.id === course.chain?.id).length;
		return `${course.chain.sequence} of ${total} in ${formatToken(course.chain.id)}`;
	}

	function courseAction(course: Course): InspectorAction {
		const unmetPrerequisite = course.prerequisites.find((courseId) => getCourseState(courseId)?.status !== 'completed');
		if (unmetPrerequisite) return { label: `View prerequisite: ${getCourse(unmetPrerequisite)?.name ?? unmetPrerequisite}`, courseId: unmetPrerequisite };
		const state = getCourseState(course.id);
		if (state?.status === 'completed') return { label: 'View course', courseId: course.id };
		if (state?.status === 'in-progress') return { label: 'Continue course', courseId: course.id };
		return { label: 'Start course', courseId: course.id };
	}

	function courseStatusText(course: Course, state: LearnerCourseState | undefined) {
		if (state?.status === 'completed') return 'Completed and available to revisit.';
		if (state?.status === 'in-progress') return 'In progress. Continue from the current saved point.';
		if (course.prerequisites.some((courseId) => getCourseState(courseId)?.status !== 'completed')) return 'Locked until the prerequisite course is complete.';
		return 'Ready to start when this pathway becomes the next focus.';
	}

	function inspectorAction(action: InspectorAction) {
		if (action.courseId) selectNode(`course-${action.courseId}`);
	}

	function formatToken(value: string) {
		return titleCase(value.replace(/[-_]/g, ' '));
	}

	function titleCase(value: string) {
		return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
	}

</script>

<svelte:head>
	<title>Pathways | Personality LMS Demo</title>
	<meta name="description" content="Assessment-informed pathways and skill development map." />
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
			<a class="active" href="/pathways">Pathways</a>
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
		<section class="pathways-dashboard panel">
			<div class="dashboard-copy">
				<p class="eyebrow">Pathways</p>
				<h1>Skill development map</h1>
				<p>{selectedMember.summary}</p>
			</div>
			<div class="development-metrics">
				<div><span>Active courses</span><strong>{activeCourses.length}</strong></div>
				<div><span>In progress</span><strong>{inProgressCourses.length}</strong></div>
				<div><span>Completed</span><strong>{completedCourses.length}</strong></div>
				<div><span>Skills in view</span><strong>{activeSkills.length}</strong></div>
			</div>
		</section>

		<section class="learning-focus-panel panel">
			<div class="panel-heading">
				<div>
					<p class="eyebrow">Current + suggested</p>
					<h2>{focusMode === 'current' ? 'Focus on what is active' : 'Explore what could come next'}</h2>
				</div>
				<p class="muted">View your active courses or explore your next suggested courses.</p>
			</div>

			<div class:current-focus={focusMode === 'current'} class:suggested-focus={focusMode === 'suggested'} class="learning-split-shell">
				<div class="focus-toggle split-toggle" aria-label="Learning focus">
					<button class:active={focusMode === 'current'} type="button" onclick={() => (focusMode = 'current')}>
						Doing
					</button>
					<button class:active={focusMode === 'suggested'} type="button" onclick={() => (focusMode = 'suggested')}>
						Explore
					</button>
				</div>

				<div class="learning-focus-row">
					<div class:expanded={focusMode === 'current'} class:minimized={focusMode !== 'current'} class="learning-region current-learning">
						<div class="area-heading">
							<div>
								<span>{focusMode === 'current' ? 'Current learning' : 'Current'}</span>
								<strong>{activeCourses.length} {focusMode === 'current' ? 'active courses' : 'active'}</strong>
							</div>
							<small>{focusMode === 'current' ? 'Progress, sequence and next action' : 'Compact progress list'}</small>
						</div>
						{#each activeCourses as course}
							{#if focusMode === 'current'}
								<article class:selected={selectedNodeId === `course-${course.id}`} class="learning-card active-course">
									<div class="course-row-top">
										<h3>{titleFor(course)}</h3>
										<span>{courseMeta(course)}</span>
									</div>
									<p>{course.description}</p>
									<div class="skill-tags compact-tags">
										{#each courseSkills(course).slice(0, 3) as skill}
											<span>{skill.name}</span>
										{/each}
									</div>
									<div class="split-progress">
										<span>{progressPct(course.id)}% complete</span>
										<div class="progress-track"><i style={`width: ${progressPct(course.id)}%;`}></i></div>
									</div>
									<div class="course-footer">
										<span>{currentTeam.pathwayName}</span>
										<button type="button" onclick={() => selectNode(`course-${course.id}`)}>Continue</button>
									</div>
								</article>
							{:else}
								<button
									class:selected={selectedNodeId === `course-${course.id}`}
									class="learning-card compact active-course"
									type="button"
									onclick={() => focusCourse('current', course.id)}
								>
									<div class="course-row-top">
										<h3>{titleFor(course)}</h3>
										<span>{courseMeta(course)}</span>
									</div>
									<div class="split-progress compact-progress">
										<span>{progressPct(course.id)}%</span>
										<div class="progress-track"><i style={`width: ${progressPct(course.id)}%;`}></i></div>
									</div>
									<div class="course-footer compact-footer">
										<span>{courseStateLabel(course)}</span>
									</div>
								</button>
							{/if}
						{/each}
					</div>

					<div class:expanded={focusMode === 'suggested'} class:minimized={focusMode !== 'suggested'} class="learning-region suggested-learning">
						<div class="area-heading">
							<div>
								<span>{focusMode === 'suggested' ? 'Top suggested' : 'Suggested'}</span>
								<strong>{suggestedCourses.length} {focusMode === 'suggested' ? 'next courses' : 'next'}</strong>
							</div>
							<small>{focusMode === 'suggested' ? 'Recommendation reason and capability fit' : 'Quick next options'}</small>
						</div>
						{#each suggestedCourses as item}
							{#if focusMode === 'suggested'}
								<article class:selected={selectedNodeId === `course-${item.course.id}`} class="learning-card suggested-course">
									<div class="course-row-top">
										<h3>{titleFor(item.course)}</h3>
										<span>{item.recommendation.priority}</span>
									</div>
									<div class="recommendation-reason split-reason">
										<span>Recommended because</span>
										<strong>{item.recommendation.reason}</strong>
									</div>
									<p>{item.course.description}</p>
									<div class="skill-tags compact-tags">
										{#each courseSkills(item.course).slice(0, 3) as skill}
											<span>{skill.name}</span>
										{/each}
									</div>
									<div class="course-footer">
										<span>{pathwayCopy[item.recommendation.source.pathway].label}</span>
										<button type="button" onclick={() => selectNode(`course-${item.course.id}`)}>Inspect</button>
									</div>
								</article>
							{:else}
								<button
									class:selected={selectedNodeId === `course-${item.course.id}`}
									class="learning-card compact suggested-course"
									type="button"
									onclick={() => focusCourse('suggested', item.course.id)}
								>
									<div class="course-row-top">
										<h3>{titleFor(item.course)}</h3>
										<span>{item.recommendation.priority}</span>
									</div>
									<div class="skill-tags compact-tags">
										{#each courseSkills(item.course).slice(0, 1) as skill}
											<span>{skill.name}</span>
										{/each}
									</div>
									<div class="course-footer compact-footer">
										<span>{pathwayCopy[item.recommendation.source.pathway].label}</span>
									</div>
								</button>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</section>

		<section class="development-map panel">
			<div class="map-layout">
				<div class="map-content-shell">
					<div class="map-local-heading">
						<div>
							<p class="eyebrow">Development map</p>
							<h2>{selectedTerritoryLabel}</h2>
						</div>
						<div class="map-heading-controls">
							<nav class="map-filter" aria-label="Development map area">
								{#each filters as filter}
									<button class:active={selectedArea === filter} type="button" onclick={() => selectArea(filter)}>
										{filter === 'All' ? 'All' : pathwayCopy[filter].label}
									</button>
								{/each}
							</nav>
							{#if selectedArea !== 'All' && selectedArea !== null}
								<div class="view-switch" aria-label="Development presentation">
									<button class:active={developmentView === 'map'} type="button" onclick={() => selectDevelopmentView('map')}>Map</button>
									<button class:active={developmentView === 'list'} type="button" onclick={() => selectDevelopmentView('list')}>List</button>
								</div>
							{/if}
						</div>
					</div>
					{#if developmentView === 'list' && selectedArea !== 'All' && selectedArea !== null}
						<div class="pathway-list-view" aria-label={`${selectedTerritoryLabel} course list`}>
							{#if selectedArea === 'fortification'}
								<p class="list-note">Your top-three profile territories ({selectedMember.profile.join('-')}) are excluded here; Fortification explores less-familiar capability areas.</p>
							{/if}
							{#each currentListGroups as group}
								<section class="list-category">
									<div class="list-category-header">
										<div>
											<p class="eyebrow">{group.eyebrow}</p>
											<h3>{group.title}</h3>
											<p>{group.description}</p>
										</div>
										<div class="list-category-meta">
											<strong>{group.courses.length}</strong>
											<span>{group.courses.length === 1 ? 'course' : 'courses'}</span>
										</div>
									</div>
									{#if group.context || group.relevantMembers?.length}
										<div class="list-category-context">
											{#if group.context}<span>{group.context}</span>{/if}
											{#if group.relevantMembers?.length}
												<div class="team-relevance">
													{#each group.relevantMembers as member}
														<strong>{member.name} / {member.profile.join('-')}</strong>
													{/each}
												</div>
											{/if}
										</div>
									{/if}
									<div class="list-course-stack">
										{#each group.courses as course}
											<button
												class:selected={selectedNodeId === `course-${course.id}`}
												class={listCourseClasses(course)}
												type="button"
												aria-label={`${course.name}, ${courseMeta(course)}, ${listCourseStatusLabel(course)}`}
												onclick={() => selectListCourse(course)}
											>
												<div class="list-course-main">
													<div class="list-course-title">
														{#if course.chain}
															<span>{course.chain.sequence}</span>
														{/if}
														<strong>{course.name}</strong>
													</div>
													<p>{course.learningFocus[0] ?? course.description}</p>
													<div class="skill-tags compact-tags">
														{#each courseSkills(course).slice(0, 3) as skill}
															<span>{skill.name}</span>
														{/each}
													</div>
												</div>
												<div class="list-course-side">
													{#if isRecommendedCourse(course)}
														<mark>Recommended</mark>
													{/if}
													<span>{titleCase(levelLabel(course))} / {course.lengthMinutes} min</span>
													<div class="list-status">
														<i class={`course-status-dot ${courseListStatusKind(course)}`} aria-hidden="true"></i>
														<strong>{listCourseStatusLabel(course)}</strong>
													</div>
													{#if courseListStatusKind(course) === 'in-progress'}
														<div class="list-progress"><span style={`width: ${progressPct(course.id)}%`}></span></div>
													{/if}
													<em>{listCourseActionLabel(course)}</em>
												</div>
											</button>
										{/each}
									</div>
								</section>
							{/each}
						</div>
					{:else}
						<div class={`capability-map ${mapModeClass()}`} aria-label="Interactive development capability map">
					<div class="map-coordinate-plane">
						{#if showWheel}
							<svg class="wheel-geometry" viewBox="0 0 100 100" aria-label={`${selectedTerritoryLabel} enneagram geometry`}>
								<circle class="wheel-ring outer" cx="50" cy="50" r="47" />
								<circle class="wheel-ring hub" cx="50" cy="50" r="16" />
								{#each wheelTypes as type}
									{@const zoneIsActive = activeZoneTypes.includes(type.number)}
									{#if zoneIsActive}
										<path
										class:active={zoneIsActive}
										class:muted={!zoneIsActive}
										class:selected-sector={selectedNode?.typeNumber === type.number}
										class:off-selected-sector={usesEnneagramCore && selectedNode?.kind === 'signal' && selectedNode.typeNumber !== type.number}
											class="wheel-sector"
											d={sectorPath(type.number)}
											style={`--sector-color: ${type.color};`}
											role="button"
											tabindex="0"
											aria-label={`Select Type ${type.number} ${type.name} sector`}
											onclick={() => selectNode(`signal-type-${type.number}`)}
											onkeydown={(event) => {
												if (event.key === 'Enter' || event.key === ' ') {
													event.preventDefault();
													selectNode(`signal-type-${type.number}`);
												}
											}}
										/>
									{:else}
										<path
											class:active={zoneIsActive}
											class:muted={!zoneIsActive}
											class="wheel-sector"
											d={sectorPath(type.number)}
											style={`--sector-color: ${type.color};`}
											aria-hidden="true"
										/>
									{/if}
								{/each}
								{#if usesEnneagramCore}
									{#each enneagramConnections as [from, to]}
										{@const fromPoint = typeMarkerPoint(from)}
										{@const toPoint = typeMarkerPoint(to)}
										<line class={connectionClass(from, to)} x1={fromPoint.x} y1={fromPoint.y} x2={toPoint.x} y2={toPoint.y} />
									{/each}
								{/if}
								{#if selectedArea === 'team'}
									{#each teamTypeArcs as arc}
										<path class={`team-type-arc rank-${arc.rank}`} d={arc.path} />
									{/each}
								{/if}
							</svg>
						{:else}
							<div class="atlas-grid" aria-hidden="true"></div>
						{/if}
						<svg class="map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
							{#if usesSharedEnneagramMap}
								{#each courseChainSegments as segment}
									<line class="enneagram-chain-line" class:selected={segment.selected} x1={segment.from.x} y1={segment.from.y} x2={segment.to.x} y2={segment.to.y} />
								{/each}
							{/if}
							{#each displayedMapNodes.filter((node) => node.kind !== 'profile') as node}
								{@const start = edgeStart(node)}
								<line class={edgeClass(node)} class:selected={selectedNode?.id === node.id || selectedNode?.id === 'profile'} x1={start.x} y1={start.y} x2={node.x} y2={node.y} />
							{/each}
							{#each skillRelations as relation}
								{@const targetNode = mapNodes.find((node) => node.id === `skill-${relation.to}`)}
								{#if targetNode && isNodeVisible(targetNode.id)}
									{#each relation.from as fromSkillId}
										{@const fromNode = mapNodes.find((node) => node.id === `skill-${fromSkillId}`)}
										{#if fromNode && isNodeVisible(fromNode.id)}
											<line class="skill-line" class:selected={selectedNode?.skillIds?.includes(relation.to) || selectedNode?.skillIds?.includes(fromSkillId)} x1={fromNode.x} y1={fromNode.y} x2={targetNode.x} y2={targetNode.y} />
										{/if}
									{/each}
								{/if}
							{/each}
						</svg>

						<button class="map-clear-target" type="button" tabindex="-1" aria-label="Clear selected map item" onclick={clearMapSelection}></button>

						{#each displayedMapNodes as node}
							{@const nodeCanSelect = canSelectNode(node)}
							{#if nodeCanSelect}
								<button
									class={nodeClass(node)}
									class:selected={selectedNode?.id === node.id}
									class:course-expanded={node.kind === 'course' && selectedNode?.id === node.id}
									type="button"
									style={nodeStyle(node)}
									aria-label={nodeAriaLabel(node)}
									title={node.kind === 'course' ? nodeAriaLabel(node) : node.title}
									onclick={(event) => {
										event.stopPropagation();
										selectNode(node.id);
									}}
								>
									{#if node.kind === 'course'}
										<span class="course-role-chip">{selectedNode?.id === node.id ? node.role : roleAbbreviation(node.role ?? node.label)}</span>
										<strong>{node.title}</strong>
										<small class="course-compact-meta">{selectedNode?.id === node.id ? node.meta : compactNodeMeta(node)}</small>
										<div class="course-node-state">
											<span class={`course-status-dot ${courseNodeStatusKind(node)}`} aria-hidden="true"></span>
											{#if selectedNode?.id === node.id}
												<small>{courseVisualStatusLabel(node)}</small>
											{/if}
										</div>
										{#if ['in-progress', 'completed'].includes(courseNodeStatusKind(node))}
											<span class="course-node-progress" aria-hidden="true"><span style={`width: ${courseNodeProgress(node)}%`}></span></span>
										{/if}
									{:else}
										<span>{node.label}</span>
										<strong>{node.title}</strong>
										{#if node.meta}<small>{node.meta}</small>{/if}
										{#if node.members?.length}<small class="node-members">{node.members.join(' + ')}</small>{/if}
									{/if}
								</button>
							{:else}
								<div
									class={nodeClass(node)}
									class:course-expanded={node.kind === 'course' && selectedNode?.id === node.id}
									style={nodeStyle(node)}
									title={node.title}
								>
									<span>{node.label}</span>
									<strong>{node.title}</strong>
									{#if node.meta}<small>{node.meta}</small>{/if}
									{#if node.members?.length}<small class="node-members">{node.members.join(' + ')}</small>{/if}
								</div>
							{/if}
						{/each}
					</div>
					{#if selectedArea === 'team'}
						<div class="team-member-rail" aria-label="Team members">
							{#each currentTeamMembers as member}
								<button
									class:selected={selectedNodeId === `person-${member.id}`}
									type="button"
									onclick={(event) => {
										event.stopPropagation();
										selectNode(`person-${member.id}`);
									}}
								>
									<strong>{member.name}</strong>
									<span>{member.profileName}</span>
									<small>{member.profile.join('-')}</small>
								</button>
							{/each}
						</div>
					{/if}
					{#if usesSharedEnneagramMap || selectedArea === 'team'}
						<div class="map-general-tray">
							<div class="general-tray-heading">
								<div>
									<div class="general-tray-title-line">
										<p class="eyebrow">{generalTrayEyebrow()}</p>
										<h3>({generalTrayTitle()})</h3>
									</div>
								</div>
								<span>{generalTrayCourses().length ? `${generalTrayCourses().length} in view` : 'Empty'}</span>
							</div>
							{#if generalTrayCourses().length}
								<div class="general-course-row">
									{#each generalTrayCourses() as course}
										<button
											class:selected={selectedNodeId === `course-${course.id}`}
											class="general-course-card"
											type="button"
											onclick={() => selectNode(`course-${course.id}`)}
										>
											<span>{generalCourseTrayRole(course)}</span>
											<strong>{titleFor(course)}</strong>
											<small>{titleCase(levelLabel(course))} · {course.lengthMinutes} min</small>
											<i class={`course-status-dot ${courseListStatusKind(course)}`} aria-hidden="true"></i>
										</button>
									{/each}
								</div>
							{:else}
								<div class="general-tray-empty">No general courses for this pathway.</div>
							{/if}
						</div>
					{/if}
						</div>
					{/if}
				</div>

				<aside class="map-inspector">
					<div class="inspector-scroll">
						<div class="inspector-header">
							<p class="eyebrow">{inspectorView.eyebrow}</p>
							{#if inspectorView.badge}
								<span>{inspectorView.badge}</span>
							{/if}
						</div>
						<h2>{inspectorView.title}</h2>
						<p>{inspectorView.description}</p>

						<div class="inspector-sections">
							{#each inspectorView.blocks as block}
								<section class={`inspector-block inspector-${block.kind}`}>
									<span>{block.label}</span>

									{#if block.kind === 'chips'}
										<div class="skill-tags">
											{#each block.skills ?? [] as skill}
												<button type="button" onclick={() => selectNode(`skill-${skill.id}`)}>{skill.name}</button>
											{/each}
											{#each block.items ?? [] as item}
												<strong>{item}</strong>
											{/each}
										</div>
									{:else if block.kind === 'courses'}
										<div class="mini-list">
											{#each block.courses ?? [] as course}
												<button type="button" onclick={() => selectNode(`course-${course.id}`)}>
													<small>{courseListRole(course)}</small>
													<strong>{titleFor(course)}</strong>
												</button>
											{/each}
										</div>
									{:else if block.kind === 'meta' || block.kind === 'progression'}
										<div class="inspector-grid">
											{#each block.meta ?? [] as item}
												<div><span>{item.label}</span><strong>{item.value}</strong></div>
											{/each}
										</div>
									{:else if block.kind === 'status'}
										<strong>{block.text}</strong>
										<div class="inspector-progress">
											<div><span style={`width: ${block.meta?.[0]?.value ?? '0%'}`}></span></div>
											<strong>{block.meta?.[0]?.value ?? '0%'}</strong>
										</div>
									{:else}
										<strong>{block.text}</strong>
									{/if}
								</section>
							{/each}
						</div>

						{#if inspectorView.action}
							<button class="inspector-primary-action" type="button" onclick={() => inspectorAction(inspectorView.action!)}>
								{inspectorView.action.label}
							</button>
						{/if}
					</div>
				</aside>
			</div>
		</section>
	</main>
</div>
