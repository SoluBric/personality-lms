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
	type NodeKind = 'profile' | 'territory' | 'signal' | 'skill' | 'course' | 'pathway' | 'team' | 'person';
	type RadialBand = 'inner' | 'middle' | 'outer';
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

	const themes = [
		{ id: 'violet', name: 'Violet', accent: '#a78bfa', soft: '#251d3b' },
		{ id: 'teal', name: 'Teal', accent: '#2dd4bf', soft: '#102f2c' },
		{ id: 'gold', name: 'Gold', accent: '#f6c85f', soft: '#332712' },
		{ id: 'slate', name: 'Slate', accent: '#93c5fd', soft: '#172033' }
	];

	const pathwayCopy: Record<CoursePathway, { label: string; short: string }> = {
		strengths: { label: 'Strengths', short: 'Extend natural capability into deliberate mastery.' },
		'stress-growth': { label: 'Stress & Growth', short: 'Build flexibility when pressure changes the pattern.' },
		fortification: { label: 'Fortification', short: 'Build capability in less familiar operating territories.' },
		team: { label: 'Team', short: 'Connect personal growth to shared collaboration needs.' }
	};

	const filters: FilterMode[] = ['All', 'strengths', 'stress-growth', 'fortification', 'team'];
	const pathways = Object.keys(pathwayCopy) as CoursePathway[];
	const enneagramOrder = [9, 1, 2, 3, 4, 5, 6, 7, 8];
	const wheelTypes = enneagramOrder.map(getType);
	const radialBands: Record<RadialBand, number> = { inner: 28, middle: 38, outer: 47 };
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
	const mapNodes = $derived(buildMapNodes());
	const visibleNodes = $derived(mapNodes);
	const selectedNode = $derived(selectedNodeId ? mapNodes.find((node) => node.id === selectedNodeId) : undefined);
	const selectedCourse = $derived(selectedNode?.kind === 'course' && selectedNode.courseIds?.[0] ? getCourse(selectedNode.courseIds[0]) : undefined);
	const selectedSkill = $derived(selectedNode?.kind === 'skill' && selectedNode.skillIds?.[0] ? getSkill(selectedNode.skillIds[0]) : undefined);
	const activeSectorTypes = $derived(getActiveSectorTypes());
	const showWheel = $derived(selectedArea !== null && selectedArea !== 'All');
	const completedCourses = $derived(activeCourseStates.filter((state) => state.status === 'completed'));
	const inProgressCourses = $derived(activeCourseStates.filter((state) => state.status === 'in-progress'));
	const selectedTerritoryLabel = $derived(selectedArea === null ? 'Profile origin' : selectedArea === 'All' ? 'Development atlas' : pathwayCopy[selectedArea].label);
	const areaGuide = $derived(getAreaGuide());

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

	function focusCourse(mode: FocusMode, courseId: string) {
		focusMode = mode;
		selectedArea = getCourse(courseId)?.pathway ?? selectedArea;
		selectedNodeId = `course-${courseId}`;
	}

	function isNodeVisible(nodeId: string) {
		return visibleNodes.some((node) => node.id === nodeId);
	}

	function nodeClass(node: Node) {
		return `map-node node-${node.kind}`;
	}

	function selectArea(area: FilterMode) {
		selectedArea = area;
		selectedNodeId = null;
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

	function courseStateLabel(course: Course) {
		const state = getCourseState(course.id);
		if (state?.status === 'completed') return 'Completed';
		if (state?.status === 'in-progress') return 'In progress';
		return 'Not started';
	}

	function progressPct(courseId: string) {
		return getCourseState(courseId)?.progressPct ?? 0;
	}

	function getCourseTitles(courseIds: string[] | undefined) {
		return courseIds?.map(getCourse).filter(isCourse).map((course) => course.name).join(', ') || 'None listed';
	}

	function buildMapNodes(): Node[] {
		if (selectedArea === null) return buildProfileOriginNodes();
		if (selectedArea === 'All') return buildAtlasNodes();
		if (selectedArea === 'strengths') return buildStrengthsNodes();
		if (selectedArea === 'stress-growth') return buildStressGrowthNodes();
		if (selectedArea === 'fortification') return buildGrowthAreaNodes();
		return buildTeamNodes();
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

	function buildStrengthsNodes(): Node[] {
		const activeTypes = selectedMember.profile;
		const strengthCourses = coursesForPathwayView('strengths');
		const strengthSkills = [...new Set(strengthCourses.flatMap((course) => course.develops))].map(getSkill).filter(isSkill).slice(0, 10);
		return [
			{ id: 'profile', kind: 'profile', title: selectedMember.profile.join('-'), label: 'Profile origin', detail: selectedMember.profileDescription, role: 'Profile Origin', x: 50, y: 50 },
			...profileTypes.map((type, index) => ({
				id: `signal-type-${type.number}`,
				kind: 'signal' as const,
				title: `${type.number} / ${type.name}`,
				label: index === 0 ? 'Primary strength field' : 'Supporting strength field',
				detail: `${type.capacity}. ${type.healthyExpression}`,
				role: 'Strength Mastery' as const,
				typeNumber: type.number,
				band: 'inner' as const,
				territory: pathwayToTerritory.strengths,
				skillIds: skillsForType(type.number).map((skill) => skill.id),
				...mapPoint(type.number, 'inner', index - 1)
			})),
			...strengthSkills.map((skill, index) => {
				const typeNumber = skill.typeNumber && activeTypes.includes(skill.typeNumber) ? skill.typeNumber : activeTypes[index % activeTypes.length];
				return {
					id: `skill-${skill.id}`,
					kind: 'skill' as const,
					title: skill.name,
					label: 'Capability',
					detail: skill.description,
					role: 'Strength Mastery' as const,
					typeNumber,
					band: 'middle' as const,
					territory: pathwayToTerritory.strengths,
					skillIds: [skill.id],
					courseIds: coursesForSkill(skill.id).map((course) => course.id),
					...mapPoint(typeNumber, 'middle', laneForIndex(index))
				};
			}),
			...strengthCourses.map((course, index) => courseNode(course, 'Strength Mastery', categoryType(course) ?? activeTypes[index % activeTypes.length], course.map.radialBand, laneForIndex(index)))
		];
	}

	function buildStressGrowthNodes(): Node[] {
		const stressCategory = currentStressCategory();
		const growthCategory = currentGrowthCategory();
		const primaryCourses = courses.filter((course) => course.pathway === 'stress-growth' && [stressCategory, growthCategory].includes(course.category));
		const generalCourses = courses.filter((course) => course.pathway === 'stress-growth' && course.category === 'general').slice(0, 6);
		const stressSkills = [...new Set([...primaryCourses, ...generalCourses].flatMap((course) => course.develops))].map(getSkill).filter(isSkill).slice(0, 10);
		return [
			{ id: 'profile', kind: 'profile', title: `${selectedMember.primaryType} / ${primaryType.name}`, label: 'Profile origin', detail: primaryType.description, role: 'Profile Origin', typeNumber: primaryType.number, x: 50, y: 50 },
			{ id: 'signal-stress', kind: 'signal', title: `${stressType.number} / ${stressType.name}`, label: 'Pressure destination', detail: `The map highlights Type ${stressType.number}, but the curriculum category is ${stressCategory}.`, role: 'Pressure Practice', territory: pathwayToTerritory['stress-growth'], typeNumber: stressType.number, band: 'inner', skillIds: stressSkills.slice(0, 3).map((skill) => skill.id), ...mapPoint(stressType.number, 'inner', 0) },
			{ id: 'signal-growth', kind: 'signal', title: `${growthType.number} / ${growthType.name}`, label: 'Growth destination', detail: `The map highlights Type ${growthType.number}, but the curriculum category is ${growthCategory}.`, role: 'Growth Resource', territory: pathwayToTerritory['stress-growth'], typeNumber: growthType.number, band: 'inner', skillIds: stressSkills.slice(3, 6).map((skill) => skill.id), ...mapPoint(growthType.number, 'inner', 0) },
			...stressSkills.map((skill, index) => {
				const typeNumber = skill.category === 'general' ? selectedMember.primaryType : skill.typeNumber ?? [selectedMember.primaryType, stressType.number, growthType.number][index % 3];
				return {
					id: `skill-${skill.id}`,
					kind: 'skill' as const,
					title: skill.name,
					label: skill.category === 'general' ? 'Core resilience' : 'Capability',
					detail: skill.description,
					role: skill.category === 'general' ? 'Core Resilience' as const : 'Growth Resource' as const,
					typeNumber,
					band: 'middle' as const,
					territory: pathwayToTerritory['stress-growth'],
					skillIds: [skill.id],
					courseIds: coursesForSkill(skill.id).map((course) => course.id),
					...mapPoint(typeNumber, 'middle', laneForIndex(index))
				};
			}),
			...primaryCourses.map((course, index) => {
				const typeNumber = course.category === stressCategory ? stressType.number : growthType.number;
				return courseNode(course, course.category === stressCategory ? 'Pressure Practice' : 'Growth Resource', typeNumber, course.map.radialBand, laneForIndex(index));
			})
		];
	}

	function buildGrowthAreaNodes(): Node[] {
		const fortificationTypes = enneagramTypes.map((type) => type.number).filter((typeNumber) => !selectedMember.profile.includes(typeNumber));
		const pathwayCourses = coursesForPathwayView('fortification').slice(0, 14);
		return [
			{ id: 'profile', kind: 'profile', title: `${selectedMember.name.split(' ')[0]} / ${selectedMember.profile.join('-')}`, label: 'Profile origin', detail: selectedMember.growthEdges.join(' / '), role: 'Profile Origin', territory: pathwayToTerritory.fortification, x: 50, y: 50 },
			...pathwayCourses.map((course, index) => courseNode(course, 'Fortification', categoryType(course) ?? fortificationTypes[index % fortificationTypes.length], course.map.radialBand, laneForIndex(index)))
		];
	}

	function buildTeamNodes(): Node[] {
		const teamMembers = currentTeam.memberIds.map(getMember).filter(isMember);
		const distribution = teamDistribution();
		const typeCourses = coursesForPathwayView('team').filter((course) => course.category.startsWith('type-'));
		const centerCourses = coursesForPathwayView('team').filter((course) => course.category.startsWith('center-'));
		const sharedCourses = teamCourses.length ? teamCourses : coursesForPathwayView('team').filter((course) => course.category === 'general').slice(0, 4);
		return [
			{ id: 'profile', kind: 'profile', title: currentTeam.name, label: 'Team atlas', detail: currentTeam.description, role: 'Profile Origin', territory: pathwayToTerritory.team, courseIds: currentTeam.pathwayCourseIds, x: 50, y: 50 },
			...teamMembers.map((member, index) => ({
				id: `person-${member.id}`,
				kind: 'person' as const,
				title: member.name.split(' ')[0],
				label: member.profile.join('-'),
				detail: member.summary,
				role: 'Team Member' as const,
				typeNumber: member.primaryType,
				band: 'inner' as const,
				territory: pathwayToTerritory.team,
				members: [member.name],
				...mapPoint(member.primaryType, 'inner', laneForIndex(index))
			})),
			...typeCourses.map((course, index) => courseNode(course, 'Type Perspective', categoryType(course) ?? 9, 'inner', laneForIndex(index), distribution.get(categoryType(course) ?? 9))),
			...centerCourses.map((course, index) => courseNode(course, 'Center Collaboration', selectedMember.primaryType, 'middle', laneForIndex(index))),
			...sharedCourses.map((course, index) => courseNode(course, 'Shared Team Learning', categoryType(course) ?? selectedMember.primaryType, 'outer', laneForIndex(index)))
		];
	}

	function courseNode(course: Course, role: MapRole, typeNumber: number, band: RadialBand, lane = 0, memberNames: string[] = []): Node {
		const point = mapPoint(typeNumber, band, lane);
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

	function mapPoint(typeNumber: number, band: RadialBand, lane = 0) {
		const angle = (typeAngle(typeNumber) + lane * 8) * (Math.PI / 180);
		const radius = radialBands[band] + Math.abs(lane) * 2.8;
		return { x: 50 + Math.cos(angle) * radius, y: 58 + Math.sin(angle) * radius * 0.72 };
	}

	function getActiveSectorTypes() {
		if (selectedArea === 'strengths') return selectedMember.profile;
		if (selectedArea === 'stress-growth') return [selectedMember.primaryType, stressType.number, growthType.number];
		if (selectedArea === 'fortification') return enneagramTypes.map((type) => type.number).filter((typeNumber) => !selectedMember.profile.includes(typeNumber));
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
		const angle = angleDeg * (Math.PI / 180);
		return { x: 50 + Math.cos(angle) * radius, y: 50 + Math.sin(angle) * radius };
	}

	function typeMarkerPoint(typeNumber: number) {
		return polar(typeAngle(typeNumber), 22);
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
				body: 'This map starts with the strongest profile signals and places courses around the type territories they most naturally extend.',
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
				body: 'This route connects non-top-three type territories to balancing capabilities without treating them as weaknesses.',
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
		if (selectedArea === 'strengths') return 'strengths-mode';
		if (selectedArea === 'stress-growth') return 'stress-mode';
		if (selectedArea === 'fortification') return 'growth-mode';
		return 'team-mode';
	}

	function edgeClass(node: Node) {
		if (selectedArea === 'stress-growth') return 'flow-line';
		if (selectedArea === 'fortification') return 'route-line';
		if (selectedArea === 'team') return 'relationship-line';
		if (selectedArea === 'All') return 'atlas-line';
		return node.kind === 'course' ? 'course-line' : 'influence-line';
	}

	function edgeStart(node: Node) {
		if (selectedArea === 'fortification' && node.kind === 'course') return { x: Math.max(12, node.x - 14), y: node.y };
		if (selectedArea === 'team' && (node.kind === 'person' || node.kind === 'team')) return { x: 25, y: 50 };
		return { x: 50, y: 50 };
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
				<div class={`capability-map ${mapModeClass()}`} aria-label="Interactive development capability map">
					<div class="map-local-heading">
						<div>
							<p class="eyebrow">Development map</p>
							<h2>{selectedTerritoryLabel}</h2>
						</div>
						<nav class="map-filter" aria-label="Development map area">
							{#each filters as filter}
								<button class:active={selectedArea === filter} type="button" onclick={() => selectArea(filter)}>
									{filter === 'All' ? 'All' : pathwayCopy[filter].label}
								</button>
							{/each}
						</nav>
					</div>
					{#if showWheel}
						<svg class="wheel-geometry" viewBox="0 0 100 100" aria-hidden="true">
							<circle class="wheel-ring outer" cx="50" cy="50" r="47" />
							<circle class="wheel-ring middle" cx="50" cy="50" r="34" />
							<circle class="wheel-ring inner" cx="50" cy="50" r="24" />
							<circle class="wheel-ring hub" cx="50" cy="50" r="16" />
							{#each wheelTypes as type}
								<path class:active={activeSectorTypes.includes(type.number)} class:muted={!activeSectorTypes.includes(type.number)} class="wheel-sector" d={sectorPath(type.number)} style={`--sector-color: ${type.color};`} />
							{/each}
							{#each wheelTypes as type}
								{@const point = typeMarkerPoint(type.number)}
								<g class:active={activeSectorTypes.includes(type.number)} class="type-marker" transform={`translate(${point.x} ${point.y})`}>
									<circle r="2.8" style={`--sector-color: ${type.color};`} />
									<text dominant-baseline="middle" text-anchor="middle">{type.number}</text>
								</g>
							{/each}
						</svg>
					{:else}
						<div class="atlas-grid" aria-hidden="true"></div>
					{/if}
					<svg class="map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
						{#each visibleNodes.filter((node) => node.kind !== 'profile') as node}
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

					{#each visibleNodes as node}
						<button
							class={nodeClass(node)}
							class:selected={selectedNode?.id === node.id}
							class:course-expanded={node.kind === 'course' && selectedNode?.id === node.id}
							type="button"
							style={`--x: ${node.x}%; --y: ${node.y}%;`}
							onclick={() => selectNode(node.id)}
						>
							<span>{node.label}</span>
							<strong>{node.title}</strong>
							{#if node.kind !== 'course' || selectedNode?.id === node.id}
								{#if node.meta}<small>{node.meta}</small>{/if}
								{#if node.status}<small class="node-status">{node.status}</small>{/if}
								{#if node.members?.length}<small class="node-members">{node.members.join(' + ')}</small>{/if}
							{:else if node.status}
								<small class="node-status">{node.status}</small>
							{/if}
						</button>
					{/each}
				</div>

				<aside class="map-inspector">
					{#if selectedNode}
						<p class="eyebrow">{selectedNode.label}</p>
						<h2>{selectedNode.title}</h2>
						<p>{selectedNode.detail}</p>
					{:else}
						<p class="eyebrow">{areaGuide.eyebrow}</p>
						<h2>{areaGuide.title}</h2>
						<p>{areaGuide.body}</p>
						<div class="inspector-block">
							<span>In this view</span>
							<div class="guide-list">
								{#each areaGuide.items as item}
									<strong>{item}</strong>
								{/each}
							</div>
						</div>
					{/if}

					{#if selectedNode && selectedSkill}
						<div class="inspector-block">
							<span>Why this matters here</span>
							<strong>{selectedMember.name.split(' ')[0]}'s profile and current recommendations connect this capability to {selectedNode.territory ? pathwayCopy[territoryToPathway[selectedNode.territory]].label.toLowerCase() : 'the wider pathway'}.</strong>
						</div>
						<div class="inspector-block">
							<span>Courses developing it</span>
							<div class="mini-list">
								{#each coursesForSkill(selectedSkill.id).slice(0, 5) as course}
									<button type="button" onclick={() => selectNode(`course-${course.id}`)}>{titleFor(course)}</button>
								{/each}
							</div>
						</div>
						<div class="inspector-block">
							<span>Builds toward / supports</span>
							<strong>{skillRelations.filter((relation) => relation.from.includes(selectedSkill.id) || relation.to === selectedSkill.id).map((relation) => relation.label).join(' / ') || 'A reusable professional capability across several pathways.'}</strong>
						</div>
					{:else if selectedNode && selectedCourse}
						<div class="inspector-block">
							<span>Develops</span>
							<div class="skill-tags">
								{#each courseSkills(selectedCourse) as skill}<button type="button" onclick={() => selectNode(`skill-${skill.id}`)}>{skill.name}</button>{/each}
							</div>
						</div>
						<div class="inspector-grid">
							<div><span>Map role</span><strong>{selectedNode.role ?? selectedNode.label}</strong></div>
							<div><span>Status</span><strong>{selectedNode.status ?? courseStateLabel(selectedCourse)}</strong></div>
						</div>
						<div class="inspector-grid">
							<div><span>Prerequisites</span><strong>{getCourseTitles(selectedCourse.prerequisites)}</strong></div>
							<div><span>Recommended next</span><strong>{getCourseTitles(selectedCourse.unlocks)}</strong></div>
						</div>
						<div class="inspector-block">
							<span>Recommendation context</span>
							<strong>{recommendationForCourse(selectedCourse.id)?.reason ?? (currentTeam.pathwayCourseIds.includes(selectedCourse.id) ? `Part of ${currentTeam.name}'s shared pathway.` : 'Useful where this capability appears in the development map.')}</strong>
						</div>
					{:else if selectedNode?.kind === 'team'}
						<div class="inspector-block">
							<span>Team pathway courses</span>
							<div class="mini-list">
								{#each teamCourses as course}
									<button type="button" onclick={() => selectNode(`course-${course.id}`)}>{titleFor(course)}</button>
								{/each}
							</div>
						</div>
						<div class="inspector-block">
							<span>Relationship routes</span>
							<strong>{relationshipRoutes.map((route) => route.theme).join(' / ')}</strong>
						</div>
					{:else if selectedNode}
						<div class="inspector-block">
							<span>Connected skills</span>
							<div class="skill-tags">
								{#each selectedNode.skillIds?.map(getSkill).filter(isSkill) ?? [] as skill}
									<button type="button" onclick={() => selectNode(`skill-${skill.id}`)}>{skill.name}</button>
								{/each}
							</div>
						</div>
						<div class="inspector-block">
							<span>Profile context</span>
							<strong>{primaryType.number} / {primaryType.name} with supporting {profileTypes.slice(1).map((type) => `${type.number} / ${type.name}`).join(' and ')}.</strong>
						</div>
					{/if}
				</aside>
			</div>
			{#if selectedArea === 'stress-growth'}
				<div class="map-lower-tray">
					<div>
						<p class="eyebrow">Core resilience skills</p>
						<h3>General learning that supports every pattern</h3>
						<p>These capabilities do not need a fixed type sector. They support awareness, regulation and response flexibility across the whole map.</p>
					</div>
					<div class="tray-items">
						{#each courses.filter((course) => course.pathway === 'stress-growth' && course.category === 'general').slice(0, 4) as course}
							<button type="button" onclick={() => selectNode(`course-${course.id}`)}>
								<span>{courseMeta(course)}</span>
								<strong>{titleFor(course)}</strong>
							</button>
						{/each}
					</div>
				</div>
			{:else if selectedArea === 'team'}
				<div class="team-learning-lower">
					<div>
						<p class="eyebrow">My team skills</p>
						<h3>Individual learning for better collaboration</h3>
						<p>Build capabilities that improve work across several relationships, regardless of one colleague's profile.</p>
						<div class="tray-items">
							{#each courses.filter((course) => course.pathway === 'team' && course.category === 'general').slice(0, 4) as course}
								<button type="button" onclick={() => selectNode(`course-${course.id}`)}>
									<span>{courseMeta(course)}</span>
									<strong>{titleFor(course)}</strong>
								</button>
							{/each}
						</div>
					</div>
					<div>
						<p class="eyebrow">Shared team learning</p>
						<h3>{currentTeam.pathwayName}</h3>
						<p>Shared learning helps the team build practices that no single profile can supply on its own.</p>
						<div class="team-sequence">
							{#each teamCourses as course, index}
								<button type="button" onclick={() => selectNode(`course-${course.id}`)}>
									<span>{index + 1}</span>
									<strong>{titleFor(course)}</strong>
								</button>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</section>
	</main>
</div>
